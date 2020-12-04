# pull official base image
FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true

COPY package.json ./
COPY package-lock.json ./
RUN npm install 

COPY . ./

# start app
CMD ["npm", "start"]