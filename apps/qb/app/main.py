import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import Response
from app.config import APP_NAME, API_V1_PREFIX, APP_ENV
from app.routers import routers
from app.init.database import Session
from app.init.queue import queue_connection
from app.utils.logger import logger

app = FastAPI(title=APP_NAME)
channel = queue_connection.channel()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = Session()
        request.state.channel = channel
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
    channel.exchange_declare(exchange="game_events", exchange_type="topic")
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
    queue_connection.close()
