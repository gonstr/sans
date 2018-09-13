#!/usr/bin/env zsh

sans_message() {
  echo $$ $1 $2 | nc -U $SANS_IPC_FD -
}

sans_chpwd() {
  sans_message pwd $(pwd)
}

sans_preexec() {
  sans_message cmd $1
}

sans_precmd() {
  sans_message cmd ""
}

sans_chpwd

autoload -Uz add-zsh-hook

add-zsh-hook chpwd sans_chpwd
add-zsh-hook preexec sans_preexec
add-zsh-hook precmd sans_precmd
