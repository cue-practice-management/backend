<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

API que centraliza la gestión de prácticas empresariales: registra usuarios, controla procesos, expone indicadores y se integra con servicios AWS (S3 + SES).

---

## 🛠️ Stack

| Capa            | Tecnología | Descripción breve                                         |
|-----------------|------------|-----------------------------------------------------------|
| Runtime         | **Node 18**| Ejecuta la API NestJS                                     |
| Framework       | **NestJS** | Arquitectura modular (feature-first, hexagonal-inspired)  |
| Persistencia    | **MongoDB**| Base principal (Docker)                                   |
| Storage/Correo  | **AWS S3** / **SES** | Archivos de evidencia y envío de e-mails            |
| Autenticación   | JWT + Refresh tokens | Guard + Interceptors (httpOnly)                   |
| CI/CD           | GitHub Actions | Build, test, deploy a Docker Registry                  |

---

## ⚡ Requisitos previos

* **Node** ≥ 18  
* **npm** ≥ 9  
* **Docker** & **Docker Compose** (para Mongo y mailhog en local)  
* Cuenta de **AWS** con buckets y dominio verificado en SES  

---

## 🚀 Puesta en marcha local

```bash
# 1. Clonar y entrar
git clone https://github.com/tu-org/practicas-backend.git
cd practicas-backend

# 2. Instalar dependencias
npm i

# 3. Levantar servicios necesarios
docker compose up -d mongo mailhog

# 4. Copiar el ejemplo de variables
cp .env.example .env  # <--- y completar tus valores

# 5. Ejecutar en modo watch
npm run start:dev
