# Frontend build stage
FROM node:20-slim AS frontend-build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install && \
    npm install -D @vitejs/plugin-react @types/react @types/react-dom && \
    npm install @radix-ui/react-toast

COPY frontend .
RUN npm run build

# Backend stage
FROM python:3.11-slim AS backend

WORKDIR /app

COPY backend /app/backend
COPY --from=frontend-build /app/dist /app/backend/static

RUN pip install -r /app/backend/requirements.txt

EXPOSE 8080

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
