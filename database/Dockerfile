FROM postgres:alpine
COPY ./database /docker-entrypoint-initdb.d

# Define a healthcheck
HEALTHCHECK  --interval=2s --timeout=2s \
	CMD pg_isready -U postgres
