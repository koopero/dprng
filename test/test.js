const dprng = require('../index')
    , assert = require('chai').assert
    , util = require('./util')

describe( 'dprng', function () {
  it('will work', function () {
    var rand = dprng( 1 )

    assert.isNumber( rand.int32() )

  })

  it('will produce the same result when reseeded', function () {
    var seed = 12345
    var rand = dprng( seed )
    var a = util.makeList( rand.int32, 10 )

    rand.seed( seed )
    var b = util.makeList( rand.int32, 10 )

    assert.deepEqual( a, b )
  })

  it('will produce the same result in two instances', function () {
    var seed = 1234
    var rand = dprng( seed )
    var a = util.makeList( rand.int32, 10 )

    rand = dprng( seed )
    var b = util.makeList( rand.int32, 10 )

    assert.deepEqual( a, b )
  })

})
