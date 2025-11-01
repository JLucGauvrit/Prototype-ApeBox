# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Build l'application
RUN npm run build

# Supprimer les dev dependencies
RUN npm prune --production

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Copier les artefacts du build
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/package.json .

# Exposer le port
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=production
ENV ORIGIN=http://localhost

# Lancer l'application
CMD ["node", "build"]
