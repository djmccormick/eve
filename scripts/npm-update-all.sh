#!/bin/bash

ncu -u
(
	cd client
	ncu -u
)
(
	cd common
	ncu -u
)
(
	cd graphql
	ncu -u
)
(
	cd migrate
	ncu -u
)
(
	cd worker
	ncu -u
)
npm install
