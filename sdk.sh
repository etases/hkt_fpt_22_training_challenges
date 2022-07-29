#!/usr/bin/bash

# required command
GUM="gum"
INOTIFY_TOOLS="inotifywait"
DFX="dfx"
FD="fd"

# required scripts
DEPLOY_ON_CHANGE_SCRIPT="deploy_on_change.sh"

# required list
REQUIRED_COMMANDS=("${DFX}" "${GUM}" "${INOTIFY_TOOLS}" "${FD}")
REQUIRED_SCRIPTS=("${DEPLOY_ON_CHANGE_SCRIPT}")

# check required commands
for cmd in "${REQUIRED_COMMANDS[@]}"; do
	COMMAND_EXISTED=$(command -v "${cmd}")
	if [[ -z ${COMMAND_EXISTED} ]]; then
		printf "%s is required" "${cmd}"
		exit
	fi
done

# check required scripts
for scr in "${REQUIRED_SCRIPTS[@]}"; do
	SCRIPT="${scr}"
	if [[ ! -e ${SCRIPT} || ! -x ${SCRIPT} ]]; then
		printf "%s is required" "${SCRIPT}"
		exit
	fi
done

# available actions
SDK_ACTION_START="start"
SDK_ACTION_START_CLEAN="clean start"
SDK_ACTION_DEPLOY="deploy"
SDK_ACTION_DEPLOY_ALL="deploy all"
SDK_ACTION_STOP="stop"

# available actions list
SDK_ACTION=("${SDK_ACTION_START}" "${SDK_ACTION_START_CLEAN}" "${SDK_ACTION_DEPLOY}" "${SDK_ACTION_DEPLOY_ALL}" "${SDK_ACTION_STOP}")

SELECTED_ACTION=$(
	IFS=$'\n'
	printf "%s" "${SDK_ACTION[*]}" | gum filter --placeholder "Select dfx action"
)

case ${SELECTED_ACTION} in
"${SDK_ACTION_START}")
    # start local server
	# printf "dfx start"
	dfx start
    exit
	;;
"${SDK_ACTION_START_CLEAN}")
    # clean start local server
	# printf "dfx start --clean"
	dfx start --clean
    exit
	;;
"${SDK_ACTION_DEPLOY}")
    # canister to deploy
	CANISTER=$(gum input --placeholder "Canister name?")
    # watch for code change
    printf "Watch for code change?\n"
	WATCH_CHANGE=$(gum choose "yes" "no")
	if [[ ${WATCH_CHANGE} == "yes" ]]; then
        # select watch folder
        printf "Select folder to watch:\n"
		WATCH_FOLDER=$(fd --exact-depth 1 . src | gum choose)
		# deploy and re-deploy on canister code change
        source "${DEPLOY_ON_CHANGE_SCRIPT}" "${WATCH_FOLDER}" "${CANISTER}"
		# printf "%s %s %s" "${DEPLOY_ON_CHANGE_SCRIPT}" "${WATCH_FOLDER}" "${CANISTER}"
        exit
	fi
    # deploy canister
    dfx deploy "${CANISTER}"
	# printf "dfx deploy %s" "${CANISTER}"
    exit
	;;
"${SDK_ACTION_DEPLOY_ALL}")
    # deploy all canister
	# printf "dfx deploy"
	dfx deploy
    exit
	;;
"${SDK_ACTION_STOP}")
    # stop local server
	# printf "dfx stop"
	dfx stop
    exit
	;;
*)
    # show available action
	IFS=$'\n'
	printf "available options:\n%s" "${SDK_ACTION[*]}"
	exit
	;;
esac
