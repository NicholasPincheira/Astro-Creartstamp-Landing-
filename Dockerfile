# Etapa 1: Construcción con Node.js
FROM node:20-alpine AS builder

# Setear el directorio de trabajo
WORKDIR /app

# Copiar package.json y lock para instalar dependencias
COPY CreartStamp/package*.json ./

# Instalar solo dependencias necesarias
RUN npm install

# Copiar todo el proyecto
COPY CreartStamp/ .

# Hacer el build de Astro
RUN npm run build

# --------------------------------------------------

# Etapa 2: Imagen final con Nginx
FROM nginx:alpine

# Copiar el sitio compilado desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html/

# Copiar configuración custom de Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto (ya lo tiene nginx:alpine)
CMD ["nginx", "-g", "daemon off;"]
