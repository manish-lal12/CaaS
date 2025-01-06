FROM python:3.10.16-alpine3.21
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
ENTRYPOINT [ "fastapi", "run", "--host", "0.0.0.0", "--port", "8000" ,"server.py"]