import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainNavigation from './MainNavigation'
import UserNavigation from './UserNavigation'

const Route = createSwitchNavigator({
    MainNavigation,
    UserNavigation
})

export default createAppContainer(Route)