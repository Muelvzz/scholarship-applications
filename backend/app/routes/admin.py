from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os

from ..core.database import get_db, SessionLocal
from ..core.auth import get_password_hash, super_admin_required
from ..models.models import User

load_dotenv()

router = APIRouter(
    tags=['Admin'],
    prefix='/admin'
)

def create_initial_superadmin():

    db = SessionLocal()

    try:
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

@router.get('/me')
def get_me(current_user: User = Depends(super_admin_required)):
    return {
        'id': current_user.id,
        'email': current_user.email,
        'role': current_user.role
    }