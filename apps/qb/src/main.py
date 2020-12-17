import os
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import Response
from app.config import APP_NAME, API_V1_PREFIX, APP_ENV
from app.routers import routers
from app.init.database import Session
from app.utils.logger import logger

app = FastAPI(title=APP_NAME)


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = Session()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


def setup_routers():
    for r in routers:
        app.include_router(r, prefix=API_V1_PREFIX)


@app.on_event("startup")
async def startup_event():
    setup_routers()

    logger.info("Starting application")
    try:
        db = Session()
        db.execute("SELECT 1")
    except:
        logger.fatal("Failed to connect to the DB")
        os._exit(1)


@app.on_event("shutdown")
def shutdown():
    Session().close()
