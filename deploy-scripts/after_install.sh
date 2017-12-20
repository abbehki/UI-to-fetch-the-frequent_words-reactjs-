#!/bin/bash
. $(dirname $0)/constants.sh
#Copy source to our depoyment group folder.
cp -rp $code_deploy_path $source_path/$DEPLOYMENT_GROUP_NAME
#Copy all the gitignored files(This is basically conf and related files)
cp -rp $backup_path/$DEPLOYMENT_GROUP_NAME/config $source_path/$DEPLOYMENT_GROUP_NAME/config
cp -rp $backup_path/$DEPLOYMENT_GROUP_NAME/node_modules $source_path/$DEPLOYMENT_GROUP_NAME/node_modules
cd $source_path/$DEPLOYMENT_GROUP_NAME
#get required modules for the app.
npm install
npm run build
sudo forever-service install $application_name-$DEPLOYMENT_GROUP_NAME --script server.js
