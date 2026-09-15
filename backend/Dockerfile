FROM python:3.14-slim

WORKDIR /app/api

# Cài Poetry
RUN pip install poetry

# Không tạo .venv bên trong /app/api
# vì docker-compose sẽ mount ./backend vào /app/api
RUN poetry config virtualenvs.in-project false

# Copy file dependency trước để Docker cache được layer này
COPY pyproject.toml poetry.lock ./

# Cài toàn bộ dependency
RUN poetry install --no-interaction --no-ansi --no-root

# Source code sẽ được docker-compose mount vào /app/api