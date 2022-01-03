# Install dependencies only when needed
FROM node:alpine AS dependencies
WORKDIR /migrate
COPY package.json package-lock.json ./
RUN npm install


# Prepare to run Graphile Migrate
FROM node:alpine AS runner
WORKDIR /migrate
COPY . .
COPY --from=dependencies /migrate/node_modules ./node_modules

# Install Postgres client
RUN apk --update add postgresql-client

# Start Graphile Migrate
CMD ["npm", "start"]
