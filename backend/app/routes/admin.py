from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from contextlib import contextmanager
from dotenv import load_dotenv
import os, logging

from ..core.database import get_db, SessionLocal
from ..core.auth import get_password_hash, super_admin_required
from ..models.models import User
from ..core.logging_config import logger
from ..schemas.sadm_schema import UserOut, UserPaginationResponse, UserEdit, SuccessMessage

load_dotenv()

router = APIRouter(
    tags=['Admin'],
    prefix='/admin'
)

# This is to ensure that there is no resource leaks that is going to happen when accessing the database.
@contextmanager
def get_session():
    db = SessionLocal()

    try:
        yield db
        db.commit()

    except Exception as e:
        db.rollback()
        logger.error(f'Session error: {str(e)}')
        raise

    finally:
        db.close()


# This is crucial for production/deployment
def create_initial_superadmin():

    try:
        with get_session() as db:

            superadmin_exists = db.query(User).filter(User.role == 'superadmin').first()

            if not superadmin_exists:
            
                first_name = os.getenv('SUPERADMIN_FIRSTNAME')
                last_name = os.getenv('SUPERADMIN_LASTNAME')
                email = os.getenv('SUPERADMIN_EMAIL')
                hashed_password = get_password_hash(os.getenv('SUPERADMIN_PASSWORD'))
                role = 'superadmin'

                db_user = User(
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    password=hashed_password,
                    role=role,
                )

                db.add(db_user)
                db.commit()

    finally:
        db.close()

@router.on_event('startup')
def startup():
    create_initial_superadmin()

@router.get('/', response_model=UserPaginationResponse)
def view_users(
    current_user: User = Depends(super_admin_required),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10
):
    if skip < 0 or limit < 1 or limit > 100:
        raise HTTPException(status_code=400, detail='Invalid pagination parameters')

    try:
        total = db.query(User).count()
        users_data = db.query(User).offset(skip).limit(limit).all()

        if not users_data and skip > 0:
            raise HTTPException(status_code=404, detail='page not found')
        
        return {
            'data': users_data,
            'total': total,
            'skip': skip,
            'limit': limit,
        }
    
    except SQLAlchemyError as e:
        logger.error(f'Database error {str(e)}')
        raise HTTPException(status_code=500, detail='Database error occured')
    

@router.get('/{role}', response_model=UserPaginationResponse)
def select_users(
    role: str,
    current_user: User = Depends(super_admin_required),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10
):
    if skip < 0 or limit < 1 or limit > 100:
        raise HTTPException(status_code=400, detail='Invalid pagination parameters')
    
    try:
        total = db.query(User).count()
        users_data = db.query(User).filter(User.role == role).all()

        if not users_data and skip > 0:
            raise HTTPException(status_code=404, detail='page not found')
        
        return {
            'data': users_data,
            'total': total,
            'skip': skip,
            'limit': limit
        }
    
    except SQLAlchemyError as e:
        logger.error(f'Database error {str(e)}')
        raise HTTPException(status_code=500, detail='Database error occured')
    

@router.put('/{user_id}', response_model=UserOut)
async def update_user(
    user_id: int,
    update_user_data: UserEdit,
    current_user: User = Depends(super_admin_required),
    db: Session = Depends(get_db)
):
    try:
        user_data = db.query(User).filter(User.id == user_id).first()
        if not user_data:
            raise HTTPException(status_code=404, detail='User not found')
        
        update_data = update_user_data.dict()

        for field, value in update_data.items():
            setattr(user_data, field, value)

        db.commit()
        db.refresh(user_data)

        logger.info(f'User updated: {update_data['email']}')

        return user_data

    except HTTPException as e:
        logger.warning(f'Updated user {user_id} failed: {e.detail}')

    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f'Database error: {str(e)}')
        raise HTTPException(status_code=500, detail='Database error occured')
    

@router.delete('/{user_id}', response_model=SuccessMessage)
async def delete_user(
    user_id: int,
    current_user: User = Depends(super_admin_required),
    db: Session = Depends(get_db)
):
    try:
        user_data = db.query(User).filter(User.id == user_id).first()
        if not user_data:
            raise HTTPException(status_code=404, detail='User not found')
        
        db.delete(user_data)
        db.commit()

        logger.info(f'User deleted: {user_id}')
        return {'detail': 'Scholarship Deleted'}
    
    except HTTPException as e:
        logger.error(f'Deleted user {user_id} failed: {e.detail}')
        raise

    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f'Database error: {str(e)}')
        raise HTTPException(status_code=500, detail='Database error occured')