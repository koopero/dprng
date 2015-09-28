const seeder = require('../src/seeder')
    , _ = require('lodash')
    , assert = require('chai').assert

describe('rot32', function () {
  var rot32 = seeder.rot32
  it('will rotate', function () {
    assert.equal( rot32( 1, 1 ), 2 )
    assert.equal( rot32( 1, -1 ), -2147483648)

  })
})

describe('seeder', function () {
  it('will fail without any arguments', function () {
    assert.throws( function () {
      seeder()
    })
  })

  it('will crunch strings', function () {
    var result = seeder('my','name','is','samm')
    assertSeed( result )
    console.log('',result)
  })

})

// Assert that a result is an array of 32 bit integers
function assertSeed( result ) {
  assert.isArray( result, "Result is not an array" )
  _.map( result, function ( element, i ) {
    assert.isNumber( element, 'Element '+i+' is not Number.')
    assert( element == Math.floor( element ), 'Element '+i+' is not integer.')
  })
}
