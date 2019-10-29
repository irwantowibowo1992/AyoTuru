import React, { Component } from 'react'

import Splash from './component/screens/SplashScreen'
import Navigation from './component/navigation/NavigationScreen'

class App extends Component {
    constructor() {
      super()

      this.state = {
        isLoading: true
      }
    }

    render(){
      const { isLoading } = this.state

      if(isLoading) {
        return(
          <Splash />
        )
      }

      return(
        <Navigation />
      )
    }

    onLoading = () => {
      setTimeout( () => {
        this.setState({ isLoading: false })
      }, 3000 )
    }

    componentDidMount(){
      this.onLoading()
    }
}

export default App