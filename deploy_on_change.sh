#!/bin/bash

# requirements:
# - package inotify-tools
# - place at project root dir

## UTILS

deploy_canisters() {
	dfx deploy
	echo "<=== Canisters deployed on $1 $2 in $3 ===>"
}

watch_change() {
	inotifywait --monitor --exclude declarations --recursive --quiet --event modify,move,delete $1 |
		while read DIRECTORY EVENT FILE; do
			deploy_canisters "$EVENT" "$FILE" "$DIRECTORY"
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
	watch_change "$1"
fi
