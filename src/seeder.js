module.exports = seeder

seeder.number = crunchNumber
seeder.string = crunchString
seeder.rot32  = rot32

const _ = require('lodash')
    , MAX_31 = 0x7fffffff
    , MAX_32 = 0xffffffff
    , FLOAT_MULT = 7
    , ROT_STRING = 7

function seeder() {
  if ( !arguments.length )
    throw new Error('Insufficient seed data')


  return _( arguments )
    .flatten()
    .map( crunchValue )
    .value()
}

function crunchValue( val ) {
  if ( _.isNumber( val ) )
    return crunchNumber( val )

  if ( _.isString( val ) )
    return crunchString( val )
}

function crunchString( str ) {
  var result = 0
  for ( var i = 0; i < str.length; i ++ ) {
    result = result ^ rot32( str.charCodeAt(i), i * ROT_STRING )
  }

  return result
}



function crunchNumber( num ) {
  while ( Math.floor( num ) != num && Math.abs( num ) < MAX_31 )
    num *= FLOAT_MULT

  num = Math.floor( num )
  num = num & MAX_31
  if ( num < 0 )
    num += MAX_31

  return num
}

function rot32( val, rot ) {
  rot = rot & 31
  val = val & MAX_32
  val = ( val << rot ) | ( val >>> ( 32 - rot ) )
  return val
}
