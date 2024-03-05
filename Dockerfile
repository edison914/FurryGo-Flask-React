# FROM --platform=amd64 node:18 as frontend

# WORKDIR /react-vite

# COPY ./react-vite/package*.json .

# RUN npm install

# COPY ./react-vite .

# RUN npm run build

# FROM python:3.9.18-alpine3.18

# RUN apk add build-base

# RUN apk add postgresql-dev gcc python3-dev musl-dev

# ARG FLASK_APP
# ARG FLASK_ENV
# ARG DATABASE_URL
# ARG SCHEMA
# ARG SECRET_KEY

# WORKDIR /var/www

# COPY requirements.txt .

# RUN pip install -r requirements.txt
# RUN pip install psycopg2

# COPY . .


# COPY --from=frontend ./dist ./react-vite

# EXPOSE 8000

# CMD ["bash", "./bin/start.sh"]
# CMD gunicorn app:app

FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

# RUN flask db upgrade
# RUN flask seed undo
# RUN flask seed all
CMD gunicorn app:app
