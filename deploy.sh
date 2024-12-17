#!/bin/bash 

yarn build && scp -r ./build/* ftp.sandboxie.eu@sandboxie.eu:/sandboxie.eu/sub/timer
