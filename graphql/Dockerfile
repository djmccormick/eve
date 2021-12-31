FROM node:alpine
LABEL description="Instant high-performance GraphQL API for your PostgreSQL database https://github.com/graphile/postgraphile"

# Install PostGraphile
RUN npm install -g postgraphile

# Install PostGraphile plugins
RUN npm install -g @graphile-contrib/pg-order-by-related
RUN npm install -g @graphile-contrib/pg-simplify-inflector
RUN npm install -g postgraphile-plugin-connection-filter
RUN npm install -g postgraphile-plugin-nested-mutations

EXPOSE 5433
ENTRYPOINT ["postgraphile", "-n", "0.0.0.0"]
