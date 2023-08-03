FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
EXPOSE 9006
CMD ["npm", "run", "start"]