FROM nexus.action-media.ru/dev/ci-receipts/copy/node:14.11.0
ENV APP_ROOT /srv

WORKDIR ${APP_ROOT}

COPY package.json package-lock.json ./
RUN npm config set registry http://nexus.action-media.ru/repository/npm-group/
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "start"]
