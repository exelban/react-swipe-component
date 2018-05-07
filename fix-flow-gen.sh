#!/bin/bash

sed -i.gen 's/\(.\)set \([a-zA-Z0-9_]*[(]\)/\1; set \2/' ./lib/index.js.flow
sed -i.gen '/import.*$/ d' ./lib/index.js.flow
sed -i.gen '2s/.*/\/* eslint-disable *\//' ./lib/index.js.flow
sed -i.gen 's/declare export default class extends/declare export default class Swipe extends/' ./lib/index.js.flow
rm ./lib/index.js.flow.gen
