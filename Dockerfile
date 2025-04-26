# Dockerfile
FROM nginx:alpine

# Copiar el dist de Astro a Nginx
COPY CreartStamp/dist/ /usr/share/nginx/html/

# Configuración de Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
