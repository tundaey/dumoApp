import { SwitchNavigator, StackNavigator} from 'react-navigation'
import Login from './Login'
import Register from './Register'
import AuthComponent from './AuthComponent'
import AuthContainer from './AuthContainer'
import UpdateProfile from './UpdateProfile'
import Loading from './Loading'
import SearchResults from './screens/SearchResults'
import DismissableStackNavigator from './DismissableStackNavigator';

//const AppStack = StackNavigator({Home: AuthComponent});
const AppStack = AuthComponent;
const AuthStack = Login;
const Update = StackNavigator({ Update: UpdateProfile });
const AuthLoading = StackNavigator({ AuthLoading: Loading})

export default SwitchNavigator(
  {
    AuthLoading: AuthContainer,
    App: AppStack,
    Auth: AuthStack,
    Register: Register,
    Update,
    //AuthLoading,
    //SearchResults: SearchResults,
    // SearchResults: DismissableStackNavigator({screen: SearchResults}, {
    //   mode: 'modal', // Remember to set the root navigator to display modally.
    //   //headerMode: 'none', // This ensures we don't get two top bars.
    // })
  },
  {
    initialRouteName: 'AuthLoading',
  }
);