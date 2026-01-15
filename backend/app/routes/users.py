from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from dotenv import load_dotenv
import os

from ..core.database import get_db
from ..schemas import auth_schema
from ..core.auth import authenticate_user, create_access_token, get_password_hash
from ..models.models import User

load_dotenv()

router = APIRouter(
    tags=['Authentication'],
    prefix='/auth'
)

@router.post('/login', response_model=auth_schema.Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    
    access_token_expires = timedelta(minutes=int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 30)))
    access_token = create_access_token(
        data = {
            'sub': user.email,
            'role': user.role
        },
        expires_delta = access_token_expires
    )

    existing_user = db.query(User).filter(User.email == user.email).first()

    return {
        'access_token': access_token,
        'role': existing_user.role,
        'token_type': 'bearer'
    }


@router.post('/register', response_model=auth_schema.UserOut)
def register(user: auth_schema.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail='Email already exists')

    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        password=hashed_password,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user