const { readFileSync, writeFileSync } = require('fs')
const { parseFruits } = require('./util/parser')

const str = readFileSync('./fruits.txt', {
  encoding: 'utf-8'
})

const fruits = parseFruits(str)

writeFileSync('./fruits.json', JSON.stringify(fruits, null, 2))
