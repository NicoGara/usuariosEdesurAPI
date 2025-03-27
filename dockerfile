FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos al contenedor
COPY . .

# Instalar las dependencias
RUN npm install

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
# CMD ["node", "index.js"]