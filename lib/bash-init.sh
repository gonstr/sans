#!/bin/bash
source $HOME/.sans/bash-preexec.sh

sans_update() {
  > $HOME/.sans/sessions/$$/cmd
  pwd > $HOME/.sans/sessions/$$/pwd
  git status -b --porcelain=v2 2> /dev/null > $HOME/.sans/sessions/$$/git
}

preexec() {
  echo $1 > $HOME/.sans/sessions/$$/cmd
}

precmd() {
  sans_update
}

sans_update
