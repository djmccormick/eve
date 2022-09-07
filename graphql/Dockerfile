ARG with_dev_dependencies

#
# Dependencies
#
FROM node:lts-alpine AS dependencies
WORKDIR /eve/common
COPY ./common/package.json .
WORKDIR /eve/graphql
COPY ./graphql/package.json .
WORKDIR /eve
COPY package.json package-lock.json .
RUN npm set-script prepare ""
RUN if [[ -z "$with_dev_dependencies" ]] ; then npm ci ; else npm ci --omit=dev ; fi


#
# Runner
#
FROM node:lts-alpine AS runner
WORKDIR /graphql
COPY . .
COPY --from=dependencies /graphql/node_modules ./node_modules

FROM node:lts-alpine AS runner
WORKDIR /eve
COPY --from=dependencies /eve .
WORKDIR /eve/common
COPY ./common .
WORKDIR /eve/graphql
COPY ./graphql .
WORKDIR /eve

# Start PostGraphile
EXPOSE 5433
CMD ["npm", "run", "start", "--workspace=graphql"]

# Define a healthcheck
HEALTHCHECK  --interval=10s --timeout=2s --retries=10 \
  CMD npm run healthcheck --workspace=graphql
