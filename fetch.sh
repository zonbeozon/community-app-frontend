#!/bin/bash

docker pull aaasssk/zonbeozon:latest
docker compose -f docker-compose.yml up --build