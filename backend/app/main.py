from fastapi import FastAPI
from app.core.database import engine, Base
from app.routes import users

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = 'Scholars PH',
    description = 'A place for students to easily apply for scholarships',
    version = '1.0'
)

app.include_router(users.router)