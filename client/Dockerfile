ARG GRAPHQL_URL

#
# Install dependencies only when needed
#
FROM node:alpine AS dependencies
WORKDIR /eve/common
COPY ./common/package.json .
WORKDIR /eve/client
COPY ./client/package.json .
WORKDIR /eve
COPY package.json package-lock.json .
RUN npm install

#
# Rebuild the source code only when needed
#
FROM node:alpine AS builder
WORKDIR /eve
COPY --from=dependencies /eve .
WORKDIR /eve/common
COPY ./common .
WORKDIR /eve/client
COPY ./client .
WORKDIR /eve
ENV NEXT_TELEMETRY_DISABLED 1
ENV GRAPHQL_URL $GRAPHQL_URL
#RUN npm install --no-save @swc/cli @swc/core @swc/core-linux-musl
#RUN npm run build --workspace=client


##
## Prepare to run Next.js
##
#FROM node:alpine AS runner

## Create the nextjs user
#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nextjs -u 1001

## Copy the Next.js files into the container
#WORKDIR /eve/client
#COPY --from=builder /eve/client/next.config.js .
#COPY --from=builder /eve/client/public ./public
#COPY --from=builder --chown=nextjs:nodejs /eve/client/.next .
#WORKDIR /eve
#COPY --from=builder /eve/client/node_modules .
#COPY --from=builder /eve/client/package.json .

## Switch to the nextjs user
#USER nextjs

## Set environment variables
#ENV PORT 3000
#ENV NODE_ENV production
#ENV NEXT_TELEMETRY_DISABLED 1

## Start Next.js
#EXPOSE 3000
#CMD ["npm", "run", "start", "--workspace=client"]

## Define a healthcheck
#HEALTHCHECK  --interval=10s --timeout=2s --retries=10 \
#  CMD npm run healthcheck
