#!/bin/bash
fileList=""
date=$(date "+%Y%m%d")

for folder in *
do
  if [ -e ${folder}/* ]
  then
    fileList+="${folder}/* "
    echo "$folder has cs file"
  else
    echo "$folder is empty"
  fi
done

zip -r "backup_${date}".zip $fileList

scp "backup_${date}".zip jamie@192.168.35.89:~/backup