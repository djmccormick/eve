ARG with_dev_dependencies

#
# Dependencies
#
FROM node:alpine AS dependencies
WORKDIR /eve/common
COPY ./common/package.json .
WORKDIR /eve/migrate
COPY ./migrate/package.json .
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
WORKDIR /eve/migrate
COPY ./migrate .
WORKDIR /eve

# Install Postgres client
RUN apk --update add postgresql-client

# Start Graphile Migrate
CMD ["npm", "run", "start", "--workspace=migrate"]
