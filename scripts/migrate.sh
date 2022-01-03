#!/bin/bash

# A wrapper for running graphile-migrate within a container

# Use
# * -ti --init to allow for CTRL-C to work with `graphile-migrate watch`
# * --user     to allow the current user to own any committed migrations
# * Mount $PWD as /migrate for access to graphile-migrate working files

# The following may be added if you run a Postgres container on an internal
# Docker network which isn't accessible from the host where this script runs.
if [[ ${DATABASE_DOCKER_NETWORK} != "" ]]; then
	DOCKER_EXTRA_OPTS="${DOCKER_EXTRA_OPTS} --network ${DATABASE_DOCKER_NETWORK}"
fi

docker run \
	-ti --init \
	--user "$(id -u):$(id -g)" \
	--rm \
	--volume "$PWD/migrate:/migrate" \
	--env-file "$PWD/.env" \
	${DOCKER_EXTRA_OPTS} \
	eve_migrate "$@"
