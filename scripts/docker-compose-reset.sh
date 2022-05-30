#!/bin/bash

# Get options
volumes='' # Use the -v option to remove volumes

while getopts 'v' flag; do
	case "${flag}" in
		v) volumes='true' ;;
	esac
done

# Use docker compose down to stop and remove containers
docker compose down ${volumes:+-v} --rmi all --remove-orphans
