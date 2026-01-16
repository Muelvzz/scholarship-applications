from fastapi import FastAPI
from app.core.database import engine, Base
from .routes import login_register, scholarship, admin
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from slowapi import Limiter

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

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

app.include_router(login_register.router)
app.include_router(admin.router)
app.include_router(scholarship.router)