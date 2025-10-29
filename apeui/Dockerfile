# Backend

FROM python:3.11-slim AS backend

WORKDIR /app

COPY backend /app/backend

RUN pip install -r /app/backend/requirements.txt

# Aligner le port du serveur UVicorn avec le mapping dans docker-compose
# (le service `apeui` mappe le port hôte 80 vers le port conteneur 8080).
EXPOSE 8080

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
