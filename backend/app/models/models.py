from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Date, ARRAY
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String(255), nullable=False, unique=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False, default='user')
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    scholarship = relationship('Scholarships', back_populates='user', cascade='all, delete')


class Scholarships(Base):
    __tablename__ = 'scholarships'

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, index=True)
    title = Column(String(255), nullable=False, unique=True)
    description = Column(String, )
    link = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now()) # remember this
    deadline = Column(Date, nullable=False)
    documentary_requirements = Column(ARRAY(String(255)), nullable=False)
    eligibility_requirements = Column(ARRAY(String(255)), nullable=False)
    benefits = Column(ARRAY(String(255)), nullable=False)
    priority_programs = Column(ARRAY(String(255)), nullable=True, default=[])
    priority_schools = Column(ARRAY(String(255)), nullable=True, default=[])

    @classmethod
    def create(cls, email: str, **kwargs):
        return cls(email=email.lower(), **kwargs)

    user = relationship('User', back_populates='scholarship')