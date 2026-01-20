from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from dotenv import load_dotenv
from slowapi import Limiter
from slowapi.util import get_remote_address
import os

from ..core.database import get_db
from ..schemas import auth_schema
from ..core.auth import authenticate_user, create_access_token, get_password_hash, get_current_user
from ..models.models import User
from ..core.logging_config import logger

load_dotenv()

router = APIRouter(
    tags=['Login and Register'],
    prefix='/auth'
)

limiter = Limiter(key_func=get_remote_address)

@router.post('/login', response_model=auth_schema.Token)
@limiter.limit('5/minute')
async def login(
    request: Request,
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

    logger.info(f'User {user.email} logged')

    return {
        'access_token': access_token,
        'role': user.role,
        'token_type': 'bearer'
    }


@router.post('/register', response_model=auth_schema.UserOut)
def register(user: auth_schema.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail='Email already exists')

    hashed_password = get_password_hash(user.password)
    
    db_user = User(
        email=user.email.lower(),
        first_name=user.first_name.strip(),
        last_name=user.last_name.strip(),
        password=hashed_password,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    logger.info(f'User {user.email} created')

    return db_user

@router.get('/me', response_model=auth_schema.UserOut)
def about_me(current_user: User = Depends(get_current_user) , db: Session = Depends(get_db)):
    return current_user