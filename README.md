# 🍽️ Restaurant API

API REST développée avec **NestJS** permettant la gestion des catégories et des plats d'un restaurant.

## 📋 Fonctionnalités

- Gestion des catégories (CRUD)
- Gestion des plats (CRUD)
- Validation des données avec DTO
- Gestion des exceptions
- Architecture modulaire
- Base de données MySQL avec TypeORM

---

# 🚀 Installation

## 1. Cloner le projet

```bash
git clone <repository-url>
```

## 2. Accéder au projet

```bash
cd restaurant-api
```

## 3. Installer les dépendances

```bash
npm install
```

## 4. Configurer les variables d'environnement

Créer un fichier `.env`

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=restaurant_api
```

## 5. Lancer le serveur

```bash
npm run start:dev
```

Le serveur sera accessible sur :

```
http://localhost:3000
```

---

# 📁 Architecture

```
src/
│
├── categories/
│   ├── dto/
│   ├── entities/
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   └── categories.module.ts
│
├── dishes/
│
├── app.module.ts
└── main.ts
```

---

# 📌 Endpoints

## Categories

| Méthode | Endpoint | Description |
|----------|----------|-------------|
| GET | /categories | Récupérer toutes les catégories |
| GET | /categories/:id | Récupérer une catégorie |
| POST | /categories | Créer une catégorie |
| PATCH | /categories/:id | Modifier une catégorie |
| DELETE | /categories/:id | Supprimer une catégorie |

---

## Dishes

| Méthode | Endpoint | Description |
|----------|----------|-------------|
| GET | /dishes | Récupérer tous les plats |
| GET | /dishes/:id | Récupérer un plat |
| POST | /dishes | Créer un plat |
| PATCH | /dishes/:id | Modifier un plat |
| DELETE | /dishes/:id | Supprimer un plat |

---

# 📦 Commandes utiles

## Installer les dépendances

```bash
npm install
```

## Lancer le projet

```bash
npm run start
```

## Lancer en mode développement

```bash
npm run start:dev
```

## Construire le projet

```bash
npm run build
```

## Lancer les tests

```bash
npm run test
```

## Lancer les tests avec couverture

```bash
npm run test:cov
```

---

# 🛠️ Commandes Nest CLI

## Créer un projet

```bash
nest new restaurant-api
```

## Générer un module

```bash
nest g module categories
```

ou

```bash
nest g mo categories
```

---

## Générer un controller

```bash
nest g controller categories
```

ou

```bash
nest g co categories
```

---

## Générer un service

```bash
nest g service categories
```

ou

```bash
nest g s categories
```

---

## Générer une classe (DTO ou Entity)

```bash
nest g class categories/dto/create-category.dto --no-spec
```

```bash
nest g class categories/entities/category.entity --no-spec
```

---

# 🧰 Technologies utilisées

- NestJS
- TypeScript
- Node.js
- TypeORM
- MySQL
- class-validator
- class-transformer

---

# 👨‍💻 Auteur

Développé par **Imane Chadli**.