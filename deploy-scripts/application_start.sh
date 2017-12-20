#!/bin/bash
. $(dirname $0)/constants.sh
cd $source_path/$DEPLOYMENT_GROUP_NAME
#Start the application server.
sudo service $application_name-$DEPLOYMENT_GROUP_NAME start
exit 0
