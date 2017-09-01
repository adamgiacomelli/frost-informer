import _ from 'lodash'

module.exports = class AsyncController {
  constructor (handlers) {
    var self = this

    function async_handler (func) {
      async function wrapper (req, res) {
        try {
          await func(req, res)
        } catch (e) {
          res.serverError(e)
        }
      }

      return wrapper
    }

    _.each(handlers, function (handler, key) {
      self[key] = async_handler(handler)
    })
  }
}
