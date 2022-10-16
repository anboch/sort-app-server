FROM node:16.16-alpine
WORKDIR /opt/app
ADD *.json ./
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
# todo prune src
CMD ["node", "./dist/main.js"]
# EXPOSE 5000