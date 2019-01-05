#!/usr/bin/env bash

cp -R ./food ../img/
cp -R ./lightpainting ../img/
cp -R ./portrait ../img/

mogrify -format jpg -resize 25% ../img/food/*.jpg

mogrify -format jpg -resize 25% ../img/lightpainting/*.jpg

mogrify -format jpg -resize 25% ../img/portrait/*.jpg