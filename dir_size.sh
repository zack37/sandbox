#!/bin/sh
find $1 -type f -print0 | xargs -0 stat -f'%z' | awk '{b+=$1} END {print b}' | awk '{ sum=$1 ; hum[1024**3]="Gb";hum[1024**2]="Mb";hum[1024]="Kb"; for (x=1024**3; x>=1024; x/=1024){ if (sum>=x) { printf "%.2f %s\n",sum/x,hum[x];break } }}'
