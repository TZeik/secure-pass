FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .env ./
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]