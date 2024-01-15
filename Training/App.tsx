import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ButtonBasics from './ButtonBasics';
import TouchablesComponent from './TouchablesComponent'; // Import the ButtonBasics component
import ScrollViewComponent from './ScrollViewComponent';
import {View, Text, Button} from 'react-native';

const Stack = createNativeStackNavigator();
const HomeScreen = ({navigation}) => {
      return (
        <View>
          <Button
            title="Go to Walid's profile"
            onPress={() => navigation.navigate('Profile', { name: 'Walid' })}
          />
          <Button
            title="Go to Button Basics"
            onPress={() => navigation.navigate('ButtonBasics')}
          />
          <Button
            title="Go to Touchables"
            onPress={() => navigation.navigate('Touchables')}
          />
          <Button
            title="Go to ScrollView"
            onPress={() => navigation.navigate('scrollView')}
          />
        </View>
      )
};

const ProfileScreen = ({ navigation, route }) => {
  const { name } = route.params;
console.log(name);
  return (
    <Button
    title="Go back to Home"
    onPress={() => navigation.navigate('Home')}
  />
  );
};



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="ButtonBasics"
          component={ButtonBasics}
          options={{title: 'ButtonBasics'}}
        />
        <Stack.Screen name="Touchables" component={TouchablesComponent} />
        <Stack.Screen name="scrollView" component={ScrollViewComponent} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
