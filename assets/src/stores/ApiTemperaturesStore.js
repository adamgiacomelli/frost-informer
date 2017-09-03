import { types, getParent, process } from 'mobx-state-tree'
import { getTemperatures } from '../api/Temperatures'

export const Value = types.model('Value', {
  id: types.number,
  temperature: types.number,
  humidity: types.number,
  deviceId: types.string,
  createdAt: types.string,
  updatedAt: types.string
})

export const Temperature = types.model('Temperature', {
  createdAt: types.string,
  temperature: types.number
})

export const ApiTemperaturesStore = types
  .model('ApiTemperaturesStore', {
    values: types.array(Value),
    temperatures: types.array(Temperature)
  })
  .views(self => ({
    get store () {
      return getParent(self)
    },
    get allTemperatures () {
      return self.temperatures
    }
  }))
  .actions(self => ({
    loadTemperatures: process(function * loadTemperatures () {
      self.state = 'pending'
      self.response = {}
      try {
        self.response = yield getTemperatures()
        self.updateTemperatures(self.response)
        self.state = 'done'
      } catch (err) {
        console.error('Failed to fetch temperatures', err)
        self.state = 'error'
      }
    }),
    markLoading (loading) {
      self.isLoading = loading
    },
    updateTemperatures (values) {
      values.forEach(value => {
        if(value.deviceId == 'Bedroom_test') {
          self.temperatures.push({createdAt: value.createdAt, temperature: value.temperature})
          self.values.push(value)
        }
      })
    }
  }))
