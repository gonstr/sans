#!/bin/zsh
sans_chpwd() {
  pwd > $HOME/.sans/sessions/$$/pwd
}

sans_preexec() {
  echo $1 > $HOME/.sans/sessions/$$/cmd
}

sans_precmd() {
  : > $HOME/.sans/sessions/$$/cmd
}

autoload -Uz add-zsh-hook

add-zsh-hook chpwd sans_chpwd
add-zsh-hook preexec sans_preexec
add-zsh-hook precmd sans_precmd

pwd > $HOME/.sans/sessions/$$/pwd
