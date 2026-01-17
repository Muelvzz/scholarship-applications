import logging
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from ..core.database import get_db
from ..schemas.sch_schema import ScholarshipCreate, ScholarshipOut, ScholarshipPaginationResponse, SuccessMessage
from ..models.models import User, Scholarships
from ..core.auth import super_admin_required
from ..core.logging_config import logger

router = APIRouter(
    tags=['Scholarships'],
    prefix='/scholarship'
)

logger = logging.getLogger(__name__)


def get_scholarship_or_404(db: Session, scholarship_id: int) -> Scholarships:
    """Helper function to fetch a scholarship or raise 404 exception."""
    scholarship = db.query(Scholarships).filter(Scholarships.id == scholarship_id).first()
    if not scholarship:
        raise HTTPException(status_code=404, detail='Scholarship not found')
    return scholarship

@router.post('/', response_model=ScholarshipOut)
async def create_scholarship(
    scholarship_data: ScholarshipCreate, 
    current_user: User = Depends(super_admin_required), 
    db: Session = Depends(get_db)
):
    from sqlalchemy.exc import IntegrityError

    try: 
        scholarship = scholarship_data.dict()
        scholarship['user_id'] = current_user.id

        new_scholarship = Scholarships(**scholarship)

        db.add(new_scholarship)
        db.commit()
        db.refresh(new_scholarship)

        logger.info(f'Scholarship created: {new_scholarship.id}')

        return new_scholarship
    
    except IntegrityError as e:
        db.rollback()
        if 'title' in str(e.orig):
            raise HTTPException(status_code=400, detail='Scholarship Title already exists')
        elif 'link' in str(e.orig):
            raise HTTPException(status_code=400, detail='Scholarship Title already exists')
        else:
            raise HTTPException(status_code=400, detail='Scholarship Title already exists')
        
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f'Database error: {str(e)}')

        raise HTTPException(status_code=500, detail='Scholarship already exists')


@router.get('/', response_model=ScholarshipPaginationResponse)
async def read_scholarships(
    current_user: User = Depends(super_admin_required),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10
):
    if skip < 0 or limit < 1 or limit > 100:
        raise HTTPException(status_code=400, detail='Invalid pagination parameters')

    try:
        total = db.query(Scholarships).count()
        scholarships = db.query(Scholarships).offset(skip).limit(limit).all()

        if not scholarships and skip > 0:
            raise HTTPException(status_code=404, detail='Page not found')
        
        return {
            'data': scholarships,
            'total': total,
            'skip': skip,
            'limit': limit,
        }
    
    except SQLAlchemyError as e:
        logger.error(f'Database error: {str(e)}')

        raise HTTPException(status_code=500, detail='Database error occured')
    

@router.put('/{scholarship_id}', response_model=ScholarshipOut)
async def update_scholarship(
    scholarship_id: int,
    update_scholarship_data: ScholarshipCreate,
    current_user: User = Depends(super_admin_required),
    db: Session = Depends(get_db)
):
    try:
        scholarship_data = get_scholarship_or_404(db, scholarship_id)
        
        update_data = update_scholarship_data.dict()
        update_data['updated_at'] = datetime.now()
        
        for field, value in update_data.items():
            setattr(scholarship_data, field, value)
        
        db.commit()
        db.refresh(scholarship_data)
        
        logger.info(f'Scholarship updated: {scholarship_id}')
        return scholarship_data
        
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f'Database error: {str(e)}')
        raise HTTPException(status_code=500, detail='Database error occured')
    

@router.delete('/{scholarship_id}', response_model=SuccessMessage)
async def delete_scholarship(
    scholarship_id: int,
    current_user: User = Depends(super_admin_required),
    db: Session = Depends(get_db)
):
    try:
        scholarship_data = get_scholarship_or_404(db, scholarship_id)
        
        db.delete(scholarship_data)
        db.commit()
        
        logger.info(f'Scholarship deleted: {scholarship_id}')
        return {'detail': 'Scholarship Deleted'}
    
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f'Database error: {str(e)}')
        raise HTTPException(status_code=500, detail='Database error occured')