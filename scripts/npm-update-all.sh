#!/bin/bash

ncu -u
(
	cd client
	ncu -u
	npm install
)
(
	cd common
	ncu -u
	npm install
)
(
	cd graphql
	ncu -u
	npm install
)
(
	cd migrate
	ncu -u
	npm install
)
(
	cd worker
	ncu -u
	npm install
)
npm install
