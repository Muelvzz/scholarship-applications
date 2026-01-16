import os, jwt
from fastapi import FastAPI, Depends, HTTPException, status
from pwdlib import PasswordHash
from fastapi.security import OAuth2PasswordBearer
from datetime import timedelta, datetime, timezone
from dotenv import load_dotenv
from typing import Annotated
from sqlalchemy.orm import Session

from ..schemas.auth_schema import TokenData, UserCreate
from ..core.database import get_db
from ..models.models import User
from ..core.config import settings

load_dotenv()
password_hash = PasswordHash.recommended()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')

def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password):
    return password_hash.hash(password)


def get_user(db: Session, email: str):
    return db.query(User).filter(User.email == email.lower()).first()


def authenticate_user(db, email: str, password: str):
    user = get_user(db, email.lower())

    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta

    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

    return encoded_jwt


async def get_current_user(
        token: Annotated[str, Depends(oauth2_scheme)],
        db: Session = Depends(get_db)
):
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={'WWW-Authenticate': 'Bearer',}
    )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)

        email = payload.get('sub')
        role = payload.get('role')

        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email, role=role)

    except jwt.InvalidTokenError:
        raise credentials_exception
    
    user = get_user(db, email=token_data.email)

    if user is None:
        raise credentials_exception
    
    return user


# async def get_current_active_user(current_user: Annotated[User, Depends(get_current_user)]):
#     if current_user.disabled:
#         raise HTTPException(status_code=400, detail='Inactive user')
    
#     return current_user


async def super_admin_required(
        current_user: Annotated[User, Depends(get_current_user)]
):
    if current_user.role != 'superadmin':
        raise HTTPException(status_code=403, detail='Superadmin only')
    
    return current_user