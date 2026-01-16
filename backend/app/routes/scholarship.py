import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from ..core.database import get_db
from ..schemas.sch_schema import ScholarshipCreate, ScholarshipOut, ScholarshipPaginationResponse
from ..models.models import User, Scholarships
from ..core.auth import super_admin_required
from ..core.logging_config import logger

router = APIRouter(
    tags=['Scholarships'],
    prefix='/scholarship'
)

logger = logging.getLogger(__name__)

@router.post('/', response_model=ScholarshipOut)
def create_scholarship(
    scholarship_data: ScholarshipCreate, 
    current_user: User = Depends(super_admin_required), 
    db: Session = Depends(get_db)
):
    from sqlalchemy.exc import IntegrityError

    try: 
        scholarship = Scholarships(
            user_id=current_user.id,
            title=scholarship_data.title,
            description=scholarship_data.description,
            link=scholarship_data.link,
            deadline=scholarship_data.deadline,
            documentary_requirements=scholarship_data.documentary_requirements,
            eligibility_requirements=scholarship_data.eligibility_requirements,
            benefits=scholarship_data.benefits,
            priority_programs=scholarship_data.priority_programs,
            priority_schools=scholarship_data.priority_schools,
        )

        db.add(scholarship)
        db.commit()
        db.refresh(scholarship)

        logger.info(f'Scholarship created: {scholarship.id}')

        return scholarship
    
    except IntegrityError as e:
        db.rollback()
        if 'title' in str(e.orig):
            raise HTTPException(status_code=400, detail='Scholarship Title already exists')
        elif 'link' in str(e.orig):
            raise HTTPException(status_code=400, detail='Scholarship Title already exists')
        else:
            raise HTTPException(status_code=400, detail='Scholarship Title already exists')
        
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f'Database error: {str(e)}')

        raise HTTPException(status_code=500, detail='Scholarship already exists')
    
    except Exception as e:
        db.rollback()
        logger.exception(f'Failed to create scholarship: {str(e)}')
        raise HTTPException(status_code=500, detail='Failed to create scholarship')


@router.get('/', response_model=ScholarshipPaginationResponse)
def read_scholarships(
    current_user: User = Depends(super_admin_required),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10
):
    if skip < 0 or limit < 1 or limit > 100:
        raise HTTPException(status_code=400, detail='Invalid pagination parameters')

    try:
        total = db.query(Scholarships).count()
        scholarships = db.query(Scholarships).offset(skip).limit(limit).all()

        if not scholarships and skip > 0:
            raise HTTPException(status_code=404, detail='Page not found')
        
        return {
            'data': scholarships,
            'total': total,
            'skip': skip,
            'limit': limit,
        }
    
    except SQLAlchemyError as e:
        logger.error(f'Database error: {str(e)}')

        raise HTTPException(status_code=500, detail='Database error occured')