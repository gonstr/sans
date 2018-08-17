#!/bin/bash
update() {
  [ -s $HOME/.sans/sessions/$$/cmd ] && > $HOME/.sans/sessions/$$/cmd
  pwd > $HOME/.sans/sessions/$$/pwd
  git status -b --porcelain 2> /dev/null | awk '$1 ~ /##/ { print $2 }' > $HOME/.sans/sessions/$$/branch
}

init() {
  mkdir -p $HOME/.sans/sessions/$$ 2> /dev/null
  touch $HOME/.sans/sessions/$$/pwd
  touch $HOME/.sans/sessions/$$/cmd
  touch $HOME/.sans/sessions/$$/branch
}

containsElement() {
  local e match="$1"
  shift
  for e; do [[ "$e" == "$match" ]] && return 0; done
  return 1
}

cleanup() {
  local pids=$(ps -o pid=)
  for dir in $(ls -1 $HOME/.sans/sessions)
  do
    if ! containsElement $dir $pids; then
      rm -rf $HOME/.sans/sessions/$dir
    fi
  done
}

trap 'cleanup' EXIT

init
update

preexec() {
  echo $1 > $HOME/.sans/sessions/$$/cmd
}

precmd() {
  update
}
