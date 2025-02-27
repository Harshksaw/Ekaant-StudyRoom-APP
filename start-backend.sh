#!/bin/bash
cd Backend || { echo "Backend folder not found"; exit 1; }
docker-compose up -d
npm run dev