FROM node:alpine
LABEL description="Job queue for PostgreSQL running on Node.js https://github.com/graphile/worker"

# Install graphile-worker
RUN npm install -g graphile-worker

WORKDIR /worker
ENTRYPOINT ["graphile-worker"]
