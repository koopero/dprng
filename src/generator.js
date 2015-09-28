module.exports = Generator

const seeder = require('./seeder')
    , SimplexNoise = require('simplex-noise')
    , MersenneTwister = require('mersenne-twister')

function Generator() {
  var self = Object.create( Generator.prototype )
  var _seed
  var _simplex  // Instance of SimplexNoise, created lazily by getSimplex
  var _mt // Instance of MersenneTwister

  self.seed = seed
  self.int32 = int32

  if ( arguments.length )
    seed.apply( self, arguments )

  return self

  function seed() {

    _seed = seeder.apply( self, arguments )

    if ( !_mt )
      _mt = new MersenneTwister( 0 )

    _mt.init_by_array( _seed )
  }


  function int32() {
    self.index ++
    return _mt.random_int()
  }

  function int53() {

  }

  function rand( min, max, quant ) {
    if ( arguments.length == 0 ) {
      //
      // rand()
      //
      min = 0
      max = 1
      quant = 0
    } else if ( 'object' == typeof arguments[0] ) {
      //
      // rand( opt )
      //
      var opt = arguments[0]
      max = parseFloat( opt.max )
      min = parseFloat( opt.min )
      quant = parseFloat( opt.quant )
    } else if ( arguments.length == 1 ) {
      //
      // rand( max )
      //
    }
  }

  function vector( axes ) {
    var result = []
      , length = 0

    for ( var i = 0; i < axes; i ++ ) {
      var v = rand( -1, 1 )
      result[i] = v
      length += v * v
    }

    length = Math.sqrt( length )

    for ( var i = 0; i < axes; i ++ ) {
      result[i] /= length
    }

    return result
  }

  function getMT() {
    return _mt
  }

  /**
    Initialize the SimplexNoise generator, as implemented
    by the simplex-noise module.

    Since this is a relatively expensive process, we do this
    only when a simplex function is actually called.
  */
  function getSimplex() {
    // Check if the simplex generator already exists
    if ( _simplex )
      return _simplex

    // Create a new Generator based on our original seed,
    // so that our index is not affected by the creation
    // of the Simplex generator, or vice-versa.
    var gen = Generator( seed )
    _simplex = new SimplexNoise( gen.random.bind( gen ) )

    return _simplex
  }

  /*
    Wrappers around simplex-noise functions
  */
  function noise2D( x, y ) {
    return getSimplex().noise2D( x, y )
  }

  function noise3D( x, y, z ) {
    return getSimplex().noise3D( x, y, z )
  }

  function noise4D( x, y, z, w ) {
    return getSimplex().noise4D( x, y, z, w )
  }



}
