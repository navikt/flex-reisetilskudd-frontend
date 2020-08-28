echo "Bygger sykepengesok latest for docker compose utvikling"

npm i

npm run build
docker build . -t flex-reisetilskudd-frontend:latest
