FROM node:23-slim


WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install

COPY . .

COPY server/data ./server/data

ENV NODE_ENV=production

EXPOSE 5080

CMD ["node", "server/server.js"]
