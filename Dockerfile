# Imagen base del sistema operativo
FROM node:19-slim

# Directorio de trabajo de la aplicación
WORKDIR /app

COPY package*.json ./

RUN npm install 

# equivale a -> COPY /src/ /app/
COPY . .

# se ejecuta al hacer docker run
CMD ["npm", "start"]







