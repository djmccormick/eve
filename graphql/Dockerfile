# Install dependencies only when needed
FROM node:alpine AS dependencies
WORKDIR /graphql
COPY package.json package-lock.json ./
RUN npm install


# Prepare to run PostGraphile
FROM node:alpine AS runner
WORKDIR /graphql
COPY . .
COPY --from=dependencies /graphql/node_modules ./node_modules

# Start PostGraphile
EXPOSE 5433
CMD ["npm", "start"]

# Define a healthcheck
HEALTHCHECK  --interval=10s --timeout=2s --retries=10 \
  CMD npm run healthcheck
