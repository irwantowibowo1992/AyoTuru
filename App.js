import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './component/_redux/store';

import Splash from './component/screens/SplashScreen';
import Navigation from './component/navigation/NavigationScreen';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    };
  }

  render() {
    const {isLoading} = this.state;

    if (isLoading) {
      return <Splash />;
    }

    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }

  onLoading = () => {
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 3000);
  };

  componentDidMount() {
    this.onLoading();
  }
}

export default App;

console.disableYellowBox = true;
