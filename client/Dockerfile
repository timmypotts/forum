# pull official base image
FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV HOST=54.205.120.4/

COPY package.json ./
COPY package-lock.json ./
RUN npm install 

COPY . ./

# start app
CMD ["npm", "start"]