# Image officielle Node.js
FROM node:24-alpine

# Dossier de travail
WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Compiler NestJS
RUN npm run build

# Port exposé
EXPOSE 3000

# Lancer l'application
CMD ["npm", "run", "start:prod"]