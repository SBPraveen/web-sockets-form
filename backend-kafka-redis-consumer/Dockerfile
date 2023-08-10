FROM public.ecr.aws/docker/library/node:lts-buster-slim

RUN mkdir /home/node/app/

WORKDIR /home/node/app/

COPY package.json .

RUN yarn install --quiet --omit=dev

COPY . .

RUN yarn build

EXPOSE 8080

ENTRYPOINT ["yarn", "start"]