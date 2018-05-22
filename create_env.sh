#!/bin/sh

SERVER_DIR="$HOME/ugc_serv"
WWW_DIR="/var/www/ugcdata.tk"
DATAUP_DIR="$HOME/data_uploader"

print_help() {
	echo "Usage:"
	echo "	sh create_env.sh <option>"
	echo "Options:"
	#echo "	-a, --all               Create all workspaces"
	echo "	-c, --client            Create {client} workspace in $WWW_DIR"
	echo "	-s, --server            Create {server} workspace in $SERVER_DIR"
	echo "	-u, --uploader			Create {data_uploader} workspace in $DATAUP_DIR"
	echo "	-d, --delete	        Delete {client, server}"
	echo "	-h, --usage, --help     Usage guide"
}

print_invalid_usage() {
	echo "Invalid usage: create_env.sh"
	print_help
}

create_client() {
	if [ -d "$WWW_DIR" ] && [ -e "$WWW_DIR" ]; then
		echo "* Deleting {client} from $WWW_DIR *"
		rm -rfv $WWW_DIR/
	fi
	echo "* Creating {client} in $WWW_DIR *"
	mkdir $WWW_DIR
	cp -rv www/ugcdata.tk/* $WWW_DIR/
}

create_server() {
	if [ -d "$SERVER_DIR" ] && [ -e "$SERVER_DIR" ]; then
		echo "* Deleting {server} from $SERVER_DIR *"
		rm -rfv $SERVER_DIR/
	fi
	echo "* Creating {server} in $SERVER_DIR *"
	mkdir $SERVER_DIR
	cp -rv ugc_serv/* $SERVER_DIR/
	mkdir $SERVER_DIR/logs
	touch $SERVER_DIR/logs/log.log
	touch $SERVER_DIR/logs/error.log
	touch $SERVER_DIR/logs/info.log
	touch $SERVER_DIR/logs/time.log
}

create_dataup() {
	if [ -d "$DATAUP_DIR" ] && [ -e "$DATAUP_DIR" ]; then
		echo "* Deleting {data_uploader} from $DATAUP_DIR *"
		rm -rfv $DATAUP_DIR/
	fi
	echo "* Creating {data_uploader} in $DATAUP_DIR *"
	mkdir $DATAUP_DIR
	cp -rv data_uploader/* $DATAUP_DIR/
	mkdir $SERVER_DIR/logs
	touch $SERVER_DIR/logs/log.log
	touch $SERVER_DIR/logs/error.log
	touch $SERVER_DIR/logs/info.log
	touch $SERVER_DIR/logs/time.log
}

echo " "
echo " "

if [ $# -eq 1 ]; then
	# if [ "$1" = "-a" ] || [ "$1" = "--all" ]; then
	# 	echo "* Creating Workspace {client, server} *"
	# 	create_client
	# 	create_server
	if [ "$1" = "-c" ] || [ "$1" = "--client" ]; then
		echo "* Creating Workspace {client} in $WWW_DIR *"
		create_client
	elif [ "$1" = "-s" ] || [ "$1" = "--server" ]; then
		echo "* Creating Workspace {server} in $SERVER_DIR *"
		create_server
	elif [ "$1" = "-u" ] || [ "$1" = "--uploader" ]; then
		echo "* Creating Workspace {data_uploader} in $DATAUP_DIR *"
		create_dataup
	elif [ "$1" = "-d" ] || [ "$1" = "--delete" ]; then
		if [ -d "$WWW_DIR" ] && [ -e "$WWW_DIR" ]; then
            echo "* Deleting {client} from $WWW_DIR *"
            rm -rfv $WWW_DIR/
		else
			echo "* $WWW_DIR is not a directory or does not exist *"
		fi
		if [ -d "$SERVER_DIR" ] && [ -e "$SERVER_DIR" ]; then
		echo "* Deleting {server} from $SERVER_DIR *"
		rm -rfv $SERVER_DIR/
		else
			echo "* $SERVER_DIR is not a directory or does not exist *"
		fi
		if [ -d "$DATAUP_DIR" ] && [ -e "$DATAUP_DIR" ]; then
		echo "* Deleting {data_uploader} from $DATAUP_DIR *"
		rm -rfv $DATAUP_DIR/
		else
			echo "* $DATAUP_DIR is not a directory or does not exist *"
		fi
	elif [ "$1" = "--usage" ] || [ "$1" = "--help" ]; then
		print_help
	else
		print_invalid_usage
	fi
else
	print_invalid_usage
fi
echo " "
echo " "