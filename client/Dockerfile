ARG GRAPHQL_URL
ARG with_dev_dependencies

#
# Dependencies
#
FROM node:lts-alpine AS dependencies
WORKDIR /eve/common
COPY ./common/package.json .
WORKDIR /eve/client
COPY ./client/package.json .
WORKDIR /eve
COPY package.json package-lock.json .
RUN npm set-script prepare ""
RUN if [[ -z "$with_dev_dependencies" ]] ; then npm ci ; else npm ci --omit=dev ; fi


#
# Builder
#
FROM node:lts-alpine AS builder
WORKDIR /eve
COPY --from=dependencies /eve .
WORKDIR /eve/common
COPY ./common .
WORKDIR /eve/client
COPY ./client .
WORKDIR /eve
ENV NEXT_TELEMETRY_DISABLED 1
ENV GRAPHQL_URL $GRAPHQL_URL
RUN npm run build --workspace=client


#
# Runner
#
FROM node:lts-alpine AS runner

# Create the nextjs user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy the Next.js files into the container
WORKDIR /eve
COPY --from=dependencies /eve .
WORKDIR /eve/client
COPY --from=builder /eve/client/next.config.js .
COPY --from=builder /eve/client/public ./public
RUN mkdir /eve/client/.next
RUN chown nextjs:nodejs /eve/client/.next
COPY --from=builder --chown=nextjs:nodejs /eve/client/.next .
WORKDIR /eve
COPY --from=builder /eve/common ./common

# Switch to the nextjs user
USER nextjs

# Set environment variables
ENV PORT 3000
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Start Next.js
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace=client"]

# Define a healthcheck
HEALTHCHECK  --interval=10s --timeout=2s --retries=10 \
  CMD npm run healthcheck --workspace=client
