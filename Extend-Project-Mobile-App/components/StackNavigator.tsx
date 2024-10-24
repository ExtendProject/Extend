import React, {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Register from '../screens/Register';
import Explore from '../screens/Explore';
import GetStarted from '../screens/GetStarted';
import {Animated} from 'react-native';
import DashboardProvider from '../screens/DashboardProvider';
import SignIn from '../screens/auth/SignIn';
import {colors} from '../utils/colors';
import SignUp from '../screens/auth/SignUp';
import EnterPrompt from '../screens/EnterPrompt';
import BuildingClassification from '../screens/BuildingClassification';
import BuildingInfo from '../screens/BuildingInfo';
import Chat from '../screens/Chat';
import BluePrint from '../screens/BluePrint';
import SitePhase from '../screens/SitePhase';
import Shop from '../screens/Shop';
import Cart from '../screens/Cart';
import {CartProvider} from './CartContext';
import Stores from '../screens/Stores';
import Test from '../screens/Test';
import Info from '../screens/Info';
import FoundationPhase from '../screens/FoundationPhase';
import StructuralPhase from '../screens/StructuralPhase';
import EnclosurePhase from '../screens/Enclosure';
import InteriorPhase from '../screens/InteriorPhase';
import {DataRepoProvider} from './DataRepoContext';

const Stack = createStackNavigator();

function StackNavigator() {
  // Default options for all screens under this navigator.
  const globalScreenOptions: any = {
    stackAnimation: 'fade',
    headerStyle: {backgroundColor: '#ffffff'},
    headerTitleStyle: {
      color: colors.black,
      textAlign: 'center',
    },
    headerTitle: '',
    headerBackTitle: '',
    headerTintColor: 'black',
    // gestureEnabled: true,
    headerShown: false,
    cardStyle: {backgroundColor: colors.white},
  };

  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });

  return (
    <DataRepoProvider>
      <CartProvider>
        <Stack.Navigator
          screenOptions={globalScreenOptions}
          // initialRouteName="Chat"
          >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Explore" component={Explore} />
          <Stack.Screen name="Get Started" component={GetStarted} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen
            name="Dashboard Provider"
            component={DashboardProvider}
          />
          <Stack.Screen name="Enter Prompt" component={EnterPrompt} />
          <Stack.Screen
            name="Building Classification"
            component={BuildingClassification}
          />
          <Stack.Screen name="Building Info" component={BuildingInfo} />
          <Stack.Screen name="Blue Print" component={BluePrint} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Site Phase" component={SitePhase} />
          <Stack.Screen name="Foundation Phase" component={FoundationPhase} />
          <Stack.Screen name="Structural Phase" component={StructuralPhase} />
          <Stack.Screen name="Enclosure Phase" component={EnclosurePhase} />
          <Stack.Screen name="Interior Phase" component={InteriorPhase} />
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Shop" component={Shop} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Stores" component={Stores} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="Info" component={Info} />
        </Stack.Navigator>
      </CartProvider>
    </DataRepoProvider>
  );
}

export default StackNavigator;
