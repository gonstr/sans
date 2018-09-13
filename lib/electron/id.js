import generate from 'nanoid/generate'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

module.exports = (length = 10) => generate(alphabet, length)
