echo "Bygger flex-reisetilskudd-frontend:latest for docker compose utvikling"

npm ci

npm run build
docker build . -t flex-reisetilskudd-frontend:latest
