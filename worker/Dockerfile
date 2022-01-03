# Install dependencies only when needed
FROM node:alpine AS dependencies
WORKDIR /worker
COPY package.json package-lock.json ./
RUN npm install


# Prepare to run Graphile Worker
FROM node:alpine AS runner
WORKDIR /worker
COPY . .
COPY --from=dependencies /worker/node_modules ./node_modules

# Start Graphile Worker
CMD ["npm", "start"]
