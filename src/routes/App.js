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
          <span className='icon1' />
          <span className='icon2' />
        </div>
        <footer id='footer'>
          Footer
        </footer>
      </Fragment>
    )
  }
}

export default App
