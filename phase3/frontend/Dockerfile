FROM node:14

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

RUN npm install -g serve


COPY . /app/

RUN npm run build

CMD ["serve", "-s", "build"]

