FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copy config files
COPY tsconfig*.json ./
COPY nest-cli.json ./

EXPOSE 3000 9229

CMD ["npm", "run", "start:dev"]