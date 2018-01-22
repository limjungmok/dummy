import React, { Component, Fragment } from 'react'

class App extends Component {
  render() {
    return (
      <Fragment>
        <header id='header'>
          Header
        </header>
        <div id='content'>
          Content
          <div className='icon_area'>
            <span className='icon1' />
            <span className='icon2' />
            <span className='icon3' />
            <span className='icon4' />
            <span className='icon5' />
            <span className='icon6' />
          </div>
        </div>
        <footer id='footer'>
          Footer
        </footer>
      </Fragment>
    )
  }
}

export default App
