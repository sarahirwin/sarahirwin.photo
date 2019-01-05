#!/usr/bin/env bash

mogrify -format jpg -resize 50% ../img/food/*.jpg

mogrify -format jpg -resize 50% ../img/lightpainting/*.jpg

mogrify -format jpg -resize 50% ../img/portrait/*.jpg