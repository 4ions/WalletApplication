# Usamos la imagen base de Node.js
FROM node:14-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos todos los archivos del frontend al directorio de trabajo del contenedor
COPY . .

# Compilamos los archivos del frontend
RUN npm run build

# Exponemos el puerto 3000 para que el contenedor sea accesible desde el exterior
EXPOSE 3000

# Comando para ejecutar el servidor web del frontend
CMD ["npm", "start"]
