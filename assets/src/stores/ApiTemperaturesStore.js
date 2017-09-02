import { types, getParent, process } from 'mobx-state-tree'
import { getTemperatures } from '../api/Temperatures'

export const Temperature = types.model('Temperature', {
  id: types.number,
  temperature: types.number,
  humidity: types.number,
  deviceId: types.string,
  createdAt: types.string,
  updatedAt: types.string
})

export const ApiTemperaturesStore = types
  .model('ApiTemperaturesStore', {
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
    updateTemperatures ({ temperatures }) {
      temperatures.forEach(temperature => {
        self.temperatures.push(temperatures)
      })
    }
  }))
