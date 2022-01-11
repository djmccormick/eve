ARG with_dev_dependencies

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
RUN npm set-script prepare ""
RUN if [[ -z "$with_dev_dependencies" ]] ; then npm ci ; else npm ci --omit=dev ; fi


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
