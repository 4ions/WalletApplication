# Usamos la imagen base de Node.js
FROM node:14-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install
RUN npm install -g sequelize-cli

# Copiamos todos los archivos del backend al directorio de trabajo del contenedor
COPY . .

# Ejecutar comandos de sequelize-cli
RUN chmod 777 ./startup.sh
# RUN npx sequelize-cli db:migrate
# Exponemos el puerto 5000 para que el contenedor sea accesible desde el exterior
EXPOSE 3200

RUN NODE_ENV=production

# Comando para ejecutar el servidor del backend
CMD ["npm", "start"]
