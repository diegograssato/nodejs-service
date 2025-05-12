FROM node:22-alpine

WORKDIR /app
ENV NODE_NAME=nodejs

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
