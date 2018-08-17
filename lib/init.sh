#!/bin/bash
source $HOME/.sans/bash-preexec.sh

update() {
  > $HOME/.sans/sessions/$$/cmd
  pwd > $HOME/.sans/sessions/$$/pwd
  git status -b --porcelain 2> /dev/null > $HOME/.sans/sessions/$$/git
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
cleanup
update

preexec() {
  echo $1 > $HOME/.sans/sessions/$$/cmd
}

precmd() {
  update
}
