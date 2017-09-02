module.exports = new AsyncController({
  publishTemperatureEntry: async function (req, res) {
    let temperature = req.body.temperature
    let humidity = req.body.humidity
    let deviceId = req.body.device_id

    try {

      let entry = await SensorResult.create({
        temperature: temperature,
        humidity: humidity,
        deviceId: deviceId,
        createdAt: new Date()
      });

      let data = {
        temp: entry.temperature,
        humid: entry.humidity,
        deviceId: entry.deviceId,
        createdAt: entry.createdAt
      }
      sails.log.info(data)

      res.status(200).send({
        request: data
      })
    } catch (error) {
      sails.log.error(error)
      res.status(400).send(error)
    }
  },

  getTemperatures: async function (req, res) {
    try {
      let temperatures = await SensorResult.findAll();
      res.status(200).send(temperatures)

    } catch (error) {
      sails.log.error(error)
      res.status(400).send(error)
    }
  }


})
