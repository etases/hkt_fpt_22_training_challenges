#!/usr/bin/env bash

# requirements:
# - package inotify-tools
# - place at project root dir

# usage: `./deploy_on_change.sh DIR_TO_WATCH CANISTER_NAME`
# example: `./deploy_on_change.sh ./src/day_1 day_1`

## UTILS

deploy_canister() {
	dfx deploy "$4"
	echo -e "<=== $(date +[%T\|%F]) Canister $4 deployed on $1 $2 in $3 ===>\n"
}

watch_change() {
	inotifywait --monitor --exclude declarations --recursive --quiet --event modify,move,delete $1 |
		while read DIRECTORY EVENT FILE; do
			deploy_canister "$EVENT" "$FILE" "$DIRECTORY" "$2"
		done
}

## MAIN

if ! command -v inotifywait &>/dev/null; then
	#command does not exist
	echo "inotify-tools is required"
	exit
else
	#command exists
	echo "Watching $1"
	watch_change "$1" "$2"
fi
