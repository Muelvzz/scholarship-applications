import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL=os.getenv('DATABASE_URL')
    ACCESS_TOKEN_EXPIRE_MINUTES=os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')
    SECRET_KEY=os.getenv('SECRET_KEY')
    ALGORITHM=os.getenv('ALGORITHM')

    SUPERADMIN_FIRSTNAME=os.getenv('SUPERADMIN_FIRSTNAME')
    SUPERADMIN_LASTNAME=os.getenv('SUPERADMIN_LASTNAME')
    SUPERADMIN_EMAIL=os.getenv('SUPERADMIN_EMAIL')
    SUPERADMIN_PASSWORD=os.getenv('SUPERADMIN_PASSWORD')

    def __init__(self):
        if not self.SECRET_KEY:
            raise ValueError('SECRET_KEY environment variable was not found.')
        if not self.DATABASE_URL:
            raise ValueError('DATABASE_URL environment variable was not found.')


settings = Settings()