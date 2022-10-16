#!/bin/bash
npm run build

cp package*.json ./dist/
cp src/openapi.yml ./dist/

cd ./dist
npm i --omit=dev
rm package*.json

cd ..
terraform apply --auto-approve