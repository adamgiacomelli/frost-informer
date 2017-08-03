#!/bin/sh

mysql_host=$1
mysql_port=$2
shift 2
cmd="$@"

# wait for the mysql docker to be running
while ! nc $mysql_host $mysql_port; do
  >&2 echo "MySql is unavailable - sleeping"
  sleep 2
done

>&2 echo "\n###############################\nMySql is up - Starting sails\n###############################"

# run the command
exec $cmd