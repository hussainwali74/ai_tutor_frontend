FROM node:18-alpine AS builder

WORKDIR /app

COPY . .
RUN npm ci --only=production --legacy-peer-deps

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]