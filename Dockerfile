FROM python:3.13.0-alpine3.20

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt

ENV PATH="/py/bin:$PATH"
RUN python -m venv /py && \
    pip install --upgrade pip && \
    apk add --update --upgrade --no-cache postgresql-client jpeg-dev && \
    apk add --update --upgrade --no-cache --virtual .tmp \
        build-base postgresql-dev musl-dev zlib zlib-dev

RUN pip install -r /requirements.txt && apk del .tmp

COPY ./backend /backend
WORKDIR /backend

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
