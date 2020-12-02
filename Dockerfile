
FROM node:10 AS ui-build
WORKDIR /client
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /server
COPY --from=ui-build /usr/src/app/client/build ./client/build
COPY server/ ./server/
RUN cd server && npm install
COPY server/ ./server/

EXPOSE 3080
CMD ["node", "./server/server.js"]