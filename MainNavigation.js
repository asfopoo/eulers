import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from "./src/screens/homeScreen";
import eulersScreen from "./src/screens/eluersScreen";
import ThreeByThreeScreen from './src/screens/threeByThreeScreen';
import LaplaceScreen from './src/screens/laplaceScreen';
import TwoByTwoScreen from './src/screens/twoByTwoScreen';
import RungeKuttaScreen from './src/screens/rungeKuttaScreen';
import ImprovedEulerScreen from './src/screens/improvedEulerScreen';




const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Eulers: eulersScreen,
    Laplace: LaplaceScreen,
    TwoByTwo: TwoByTwoScreen,
    ThreeByThree: ThreeByThreeScreen,
    Runge: RungeKuttaScreen,
    ImprovedEuler: ImprovedEulerScreen,
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
    },
    {
      initialRouteName: "App"
    }
  )
);

