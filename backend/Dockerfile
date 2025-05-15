FROM node:16-alpine
ARG PORT=8000
ARG MONGODB_PORT=27017
ENV PORT=$PORT
ENV MONGODB_PORT=$MONGODB_PORT
WORKDIR /backend
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
EXPOSE $PORT $MONGODB_PORT
RUN npm run build
CMD ["npm","start"]