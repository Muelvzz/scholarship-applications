from pydantic import BaseModel, Field, validator
from datetime import datetime, date

class ScholarshipCreate(BaseModel):

    title: str = Field(..., min_length=10 , max_length=255)
    description: str = Field(..., min_length=10, max_length=5000)
    link: str = Field(..., pattern=r'^https?://')
    deadline: date
    documentary_requirements: list[str]
    eligibility_requirements: list[str]
    benefits: list[str]
    priority_programs: list[str] | None = None
    priority_schools: list[str] | None = None

    @validator('title', 'description', pre=True)
    def strip_whitespace(cls, v):
        if isinstance(v, str):
            return v.strip()
        
        return v
    
    @validator('deadline')
    def deadline_in_future(cls, v):
        if v <= date.today():
            raise ValueError('Deadline must be in the future')
        
        return v
    
    class Config:
        str_strip_whitespace = True


class ScholarshipOut(BaseModel):

    id: int

    user_id: int
    title: str
    description: str
    link: str
    created_at: datetime
    deadline: date | None = None
    documentary_requirements: list[str]
    eligibility_requirements: list[str]
    benefits: list[str]
    priority_programs: list[str] | None = None
    priority_schools: list[str] | None = None

    class Config:
        from_attributes = True


class ScholarshipPaginationResponse(BaseModel):
    data: list[ScholarshipOut]
    total: int
    skip: int
    limit: int