import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <footer className='app-footer'>
        <a href='http://frostinformer.eu'>FrostInformer Dashboard</a> &copy;
        2017 agiaLab.
        <span className='float-right'>
          Powered by <a href='http://coreui.io'>CoreUI</a>
        </span>
      </footer>
    )
  }
}

export default Footer
