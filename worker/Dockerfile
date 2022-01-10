#
# Dependencies
#
FROM node:alpine AS dependencies
WORKDIR /eve/common
COPY ./common/package.json .
WORKDIR /eve/worker
COPY ./worker/package.json .
WORKDIR /eve
COPY package.json package-lock.json .
RUN npm install


#
# Runner
#
FROM node:alpine AS runner
WORKDIR /eve
COPY --from=dependencies /eve .
WORKDIR /eve/common
COPY ./common .
WORKDIR /eve/worker
COPY ./worker .
WORKDIR /eve

# Start Graphile Worker
CMD ["npm", "run", "start", "--workspace=worker"]
