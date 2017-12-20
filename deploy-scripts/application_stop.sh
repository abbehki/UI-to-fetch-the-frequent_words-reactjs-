#!/bin/bash
. $(dirname $0)/constants.sh
cd $source_path/$DEPLOYMENT_GROUP_NAME
#Stop the application server.
sudo service $application_name-$DEPLOYMENT_GROUP_NAME stop
sudo forever-service delete $application_name-$DEPLOYMENT_GROUP_NAME
exit 0
