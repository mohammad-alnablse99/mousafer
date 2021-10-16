#!/usr/bin/env bash
sleep 3 # wait database connection

cd /home/ec2-user/store

export PORT=$(cat .env | grep PORT | cut -b 6-)
echo 'vaidate PORT'
echo $PORT
nc -zv 127.0.0.1 $PORT
