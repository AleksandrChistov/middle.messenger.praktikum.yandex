FROM ubuntu:20.04
RUN apt update && apt install -y nodejs && apt install -y npm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "server"]
