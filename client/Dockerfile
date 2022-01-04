ARG GRAPHQL_URL

# Install dependencies only when needed
FROM node:alpine AS dependencies
WORKDIR /client
COPY package.json package-lock.json ./
RUN npm install


# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /client
COPY . .
COPY --from=dependencies /client/node_modules ./node_modules
ENV NEXT_TELEMETRY_DISABLED 1
ENV GRAPHQL_URL $GRAPHQL_URL
RUN npm run build


# Prepare to run Next.js
FROM node:alpine AS runner
WORKDIR /client

# Create the nextjs user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy the Next.js files into the container
COPY --from=builder /client/next.config.js ./
COPY --from=builder /client/public ./public
COPY --from=builder --chown=nextjs:nodejs /client/.next ./.next
COPY --from=builder /client/node_modules ./node_modules
COPY --from=builder /client/package.json ./package.json

# Switch to the nextjs user
USER nextjs

# Set environment variables
ENV PORT 3000
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Start Next.js
EXPOSE 3000
CMD ["npm", "start"]

# Define a healthcheck
HEALTHCHECK  --interval=10s --timeout=2s --retries=10 \
  CMD npm run healthcheck
