import logging
from logging.config import dictConfig
from app.config import APP_ENV

logger = logging.getLogger()

if APP_ENV == "local":
    logger.setLevel(logging.DEBUG)
else:
    logger.setLevel(logging.WARN)