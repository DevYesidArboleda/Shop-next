This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started - Local

Instalar dependencias

npm install

Instalar ORM

npm install prisma

configurar archivo .env 

DATABASE_URL="postgresql://postgres:yesid@localhost:5432/auth?schema=public"

npx prisma generate 

npx prisma bd push

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Instalación y Despliegue de la Aplicación Next.js con Prisma en EC2

Este documento detalla el proceso de instalación y despliegue de una aplicación Next.js que utiliza Prisma como ORM, sobre una instancia de Amazon EC2. La aplicación será gestionada con PM2 y servida a través de Nginx. Además, se incluye la configuración de PostgreSQL como base de datos y el uso de GitHub Actions para CI/CD.

## Prerrequisitos

Antes de comenzar, asegúrate de tener lo siguiente:

- Una cuenta en AWS.
- Conocimientos básicos sobre AWS y sus servicios.
- `Node.js` y `npm` instalados en tu máquina local.
- `Git` instalado en tu máquina local.
- Acceso a una terminal de comandos.

## Pasos de Instalación

### 1. Configurar la Instancia EC2

1. **Iniciar una Instancia EC2:**
   - Inicia sesión en tu consola de AWS.
   - Ve a EC2 y lanza una nueva instancia.
   - Selecciona una Amazon Machine Image (AMI) (por ejemplo, Ubuntu Server 20.04).
   - Elige un tipo de instancia (por ejemplo, t2.micro para el nivel gratuito).
   - Configura las opciones de red y seguridad, permitiendo el acceso a los puertos `22` (SSH), `80` (HTTP), `5432` (DB) y `443` (HTTPS).
   - Crea o selecciona un par de claves para acceder a tu instancia.

2. **Conectar a la Instancia:**
   - Usa SSH para conectarte a tu instancia:
     ```bash
     ssh -i "your-key.pem" ubuntu@your-ec2-public-dns
     ```

### 2. Instalar Dependencias en la Instancia EC2

Una vez conectado a tu instancia, ejecuta los siguientes comandos para instalar Node.js, npm, PostgreSQL, Nginx y PM2.

#### 2.1. Actualizar el Sistema

```bash
sudo apt update && sudo apt upgrade -y

2.2. Instalar Node.js y npm

curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs


Instalar PostgreSQL

sudo apt install -y postgresql postgresql-contrib

sudo apt install -y postgresql postgresql-contrib

2.4. Configurar la Base de Datos
Accede al shell de PostgreSQL:

bash
sudo -u postgres psql
Crea un nuevo rol y una nueva base de datos:

sql

CREATE ROLE your_user WITH LOGIN PASSWORD 'your_password';
CREATE DATABASE your_database WITH OWNER your_user;

2.5. Instalar Nginx

sudo apt install -y nginx

sudo systemctl start nginx
sudo systemctl enable nginx

2.6. Instalar PM2

sudo npm install -g pm2

Configurar Prisma

Configura tu archivo .env con las credenciales de PostgreSQL:

DATABASE_URL="postgresql://your_user:your_password@localhost:5432/your_database"

Ejecuta las migraciones de Prisma:

npx prisma generate

npx prisma db push 

5. Ejecutar la Aplicación con PM2

pm2 start npm --name "your_app_name" -- run start
pm2 save

Agrega el siguiente contenido al archivo:
![mermaid-ai-diagram-2024-10-11-083816](https://github.com/user-attachments/assets/463b86f2-b716-45f1-a8c0-07d7eb7db01b)
![Descripción de la imagen](https://github.com/DevYesidArboleda/Shop-next/blob/b02f7f0ea864264b117cffae405b011c7fdc3087/public/imgs/readme.png)
