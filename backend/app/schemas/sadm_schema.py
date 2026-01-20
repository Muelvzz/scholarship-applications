from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserOut(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


class UserEdit(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role: str


class UserPaginationResponse(BaseModel):
    data: list[UserOut]
    total: int
    skip: int
    limit: int

    class Config:
        from_attributes = True


class SuccessMessage(BaseModel):
    detail: str

    class Config:
        from_attributes = True