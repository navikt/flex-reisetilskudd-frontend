echo "Bygger spvedtak latest for docker compose utvikling"

npm i

npm run build
docker build . -f Dockerfile.root -t spvedtak:latest