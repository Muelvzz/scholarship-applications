from pydantic import BaseModel, EmailStr
from datetime import datetime
from .sch_schema import ScholarshipOut

class Token(BaseModel):
    access_token: str
    role: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None
    role: str | None = None


class UserCreate(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    password: str
    role: str = 'user'


class UserOut(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    role: str
    created_at: datetime
    scholarship: list[ScholarshipOut] | None = None

    class Config:
        from_attributes = True