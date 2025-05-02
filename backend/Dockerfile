FROM node:18

WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

COPY . .


EXPOSE 5000


CMD ["node", "app.js"]
