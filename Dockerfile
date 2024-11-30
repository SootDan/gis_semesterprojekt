FROM node:16-alpine
WORKDIR /home/gis-semesterprojekt

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]