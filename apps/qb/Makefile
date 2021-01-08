setup:
	docker-compose up -d
	poetry install

start:
	poetry run python run.py

migrate:
	poetry run alembic upgrade head