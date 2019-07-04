#!/bin/sh
source /etc/profile
#SOURCE="http://www.ipdeny.com/ipblocks/data/aggregated/cn-aggregated.zone"
SOURCE="https://raw.githubusercontent.com/17mon/china_ip_list/master/china_ip_list.txt"

wget -O ip_ranges.txt "$SOURCE"
cat >> ip_ranges1.txt <<EOF
10.0.0.0/8
127.0.0.0/24
172.16.0.0/12
192.168.0.0/16
EOF
cat >> ip_ranges2.txt <<EOF
192.168.1.204/32
EOF
python3 ranges_to_js.py > tmp.js
cat code.js tmp.js > out.pac
rm tmp.js
