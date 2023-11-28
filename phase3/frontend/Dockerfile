FROM node:17-alpine

WORKDIR /app

COPY package*.json .

RUN rm -rf node_modules \
    && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
