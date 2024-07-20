#!/bin/bash

if ! which gum > /dev/null 2>&1
then
    echo "Error: pnpm could not be found. Please install pnpm and try again."
    exit 1
fi

if ! which pnpm > /dev/null 2>&1
then
    echo "Error: pnpm could not be found. Please install pnpm and try again."
    exit 1
fi

pnpm install

ip_info_token=$(gum input --placeholder "Ip info token")
echo "IP_INFO_TOKEN=$ip_info_token" >> .env

pnpm run build
pnpm run preview
