#!/bin/bash
. $(dirname $0)/constants.sh
case $DEPLOYMENT_GROUP_NAME in
  dev)
    server_port=7770
      ;;
  integration)
    server_port=8880
      ;;
  staging)
    server_port=9990
      ;;
  production)
    server_port=7770
      ;;
esac

sleep 30 #wait for some time for server process to start up.

pid=`lsof -t -i:$server_port`

if [ "$pid" != "" ]
then # Process is running
    echo "Process is running"
    rm -rf $backup_path/$DEPLOYMENT_GROUP_NAME
    rm -rf $code_deploy_path
   exit 0
else
	echo "Process does not exist(lsof -t -i:$server_port)"
  exit 1
fi
