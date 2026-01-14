from fastapi import FastAPI
from app.core.database import engine, Base
from app.routes import users
from app.routes import admin
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title = 'Scholars PH',
    description = 'A place for students to easily apply for scholarships',
    version = '1.0'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(admin.router)