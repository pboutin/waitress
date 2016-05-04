#!/bin/bash

echo ""
echo "#####################################"
echo "##                                 ##"
echo "##   Creating a production build   ##"
echo "##                                 ##"
echo "#####################################"
echo ""
ember b --environment production

echo ""
echo "#####################################"
echo "##                                 ##"
echo "##       Pushing to firebase       ##"
echo "##                                 ##"
echo "#####################################"
echo ""
firebase deploy
