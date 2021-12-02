'use strict'

module.export = error => {
  console.error(error)
  throw new Error('Falló en la operación del servidor')
}
