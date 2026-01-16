from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os, logging

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

logger = logging.getLogger(__name__)

def get_db():
    db = SessionLocal()

    try:
        yield db
    
    except Exception as e:
        db.rollback()
        logger.error(f'Database session error: {str(e)}')
        raise

    finally:
        db.close()