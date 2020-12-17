setup:
	docker-compose up -d
	poetry install

start:
	poetry run uvicorn src.main:app --reload

migrate:
	poetry run alembic upgrade head