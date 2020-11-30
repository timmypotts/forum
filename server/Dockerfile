# pull official base image
FROM node:13.12.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --no-optional
ENV NODE_ENV=production

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]