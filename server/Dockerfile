# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /server

# add `/app/node_modules/.bin` to $PATH
ENV PATH /server/node_modules/.bin:$PATH
ENV PRODUCTION_URL=postgres://postgres:42bUgfish42!@107.21.25.170:5432/postgres
ENV NODE_ENV=production

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]