const _ = require('lodash')

exports.makeList = function ( func, length ) {
  var result = []
  for ( var i = 0; i < length; i++ )
    result[i] = func.apply( null, Array.prototype.slice.call(arguments, 2) )

  return result
}
