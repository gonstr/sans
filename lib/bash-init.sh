#!/bin/bash

source $HOME/.sans/bash-preexec.sh

sans_message() {
  echo -n "$$ $*" | nc -U $SANS_IPC_FD -
}

sans_preexec() {
  sans_message cmd $1
}

sans_precmd() {
  sans_message git "$(git status -b --porcelain=v2 2> /dev/null)"
  sans_message pwd $(pwd)
  sans_message cmd ""
}

sans_precmd

preexec_functions+=(sans_preexec)
precmd_functions+=(sans_precmd)
