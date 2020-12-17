from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError
from app.utils.logger import logger


def handle_sql_error(func):
    def func_wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except SQLAlchemyError as sqlE:
            logger.error(sqlE)
            return sqlE
        except Exception as e:
            logger.error(e)
            return e

    return func_wrapper


def handle_validation_error(func):
    def func_wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ValidationError as e:
            logger.error(e)
            return e

    return func_wrapper