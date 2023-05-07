#!/bin/bash

docker-compose up -d

sleep 5

docker exec db-app1 /scripts/rs-init.sh

sleep 5

docker-compose restart