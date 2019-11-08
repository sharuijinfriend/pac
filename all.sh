#!/bin/bash
source /root/work/pac/build.sh
source /root/work/pac/buildipv6direct.sh
source /root/work/pac/pacicbase/build.sh
git add .
git status
git commit -m "new version"
git push origin master
