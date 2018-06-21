import { SwitchNavigator, StackNavigator} from 'react-navigation'
import Login from './Login'
import Register from './Register'
import AuthComponent from './AuthComponent'
import AuthContainer from './AuthContainer'
import UpdateProfile from './UpdateProfile'
import SearchResults from './screens/SearchResults'

//const AppStack = StackNavigator({Home: AuthComponent});
const AppStack = AuthComponent;
const AuthStack = Login;
const Update = StackNavigator({ Update: UpdateProfile });

export default SwitchNavigator(
  {
    AuthLoading: AuthContainer,
    App: AppStack,
    Auth: AuthStack,
    Register: Register,
    Update,
    SearchResults: StackNavigator({SearchResults: SearchResults})
  },
  {
    initialRouteName: 'AuthLoading',
  }
);