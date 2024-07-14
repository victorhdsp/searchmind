# Dockerfile

FROM node:20
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json .
RUN npm install
COPY / .
EXPOSE 3333
CMD ["npm", "run", "dev"]
