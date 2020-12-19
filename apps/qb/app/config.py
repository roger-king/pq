import os

APP_NAME = "QB-API"
API_V1_PREFIX = "/api/qb/v1"

# APP
APP_ENV = os.getenv("APP_ENV", "local")

DB_NAME = os.getenv("DB_NAME", "trivia")
DB_USER = os.getenv("DB_USER", "appuser")
DB_PASSWORD = os.getenv("DB_PASSWORD", "appuser")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_HOST = os.getenv("DB_HOST", "localhost")

# QUEUE
QUEUE_HOST = os.getenv("QUEUE_HOST", "localhost")