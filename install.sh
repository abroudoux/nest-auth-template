#!/bin/bash

npm install

cp .env.example .env

rm -rf .git

npx prisma generate

npm run build

