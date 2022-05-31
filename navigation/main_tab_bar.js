/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unstable-nested-components */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons';
// eslint-disable-next-line import/no-unresolved
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
// import About from '../components/about';
import { createStackNavigator } from '@react-navigation/stack';
import SearchTab from './search_tab';
import HomeTab from './home_tab';
import GroupTab from './groups_tab';
import ProfileTab from './profile_tab';
import QuestTab from './quest_tab';
import userGet from '../services/sidequestUser-api';
import questGet from '../services/pullQuest-api';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class MainTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      id: '62955568344a64f0f6811392',
      questID: '6291214c48ffc29b3b082a4e',
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchQuestData();
  }

  // componentDidUpdate() {
  //   this.fetchData();
  //   this.fetchQuestData();
  // }

  // ------------ put fetchData here! -------------//
  fetchData() {
    userGet(this.state.id)
      .then((responseData) => {
        console.log('main-tab response data----------------');
        console.log(responseData);
        this.setState({
          user: responseData,
          // quest: responseData,
        });
        // console.log('main_tab_bar');
      }).catch((error) => {
        console.log(error);
      });
  }

  // ------------ put fetchData here! -------------//
  fetchQuestData() {
    questGet(this.state.questID)
      .then((responseData) => {
        // console.log('main-tab response data----------------');
        console.log(`${responseData}quest`);
        this.setState({
          quest: responseData,
        });
        // console.log('main_tab_bar');
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log('main tab bar state print----------------');
    // console.log(`${this.state.user}user`);
    // console.log(this.state.user.name);
    return (
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Search') {
                iconName = 'account-search';
              } else if (route.name === 'Quest') {
                iconName = 'sword-cross';
              } else if (route.name === 'Groups') {
                iconName = 'account-group';
              } else if (route.name === 'Profile') {
                iconName = 'account-circle';
              }

              return (
                <Ionicons
                  name={iconName}
                  size={26}
                  color={focused ? '#FFFFFF' : '#000000'}
                />
              );
            },
          })}
        >
          <Stack.Screen name="Home" options={headerStyle}>
            {(props) => <HomeTab user={this.state.user.name} />}
          </Stack.Screen>
          <Stack.Screen name="Search" options={headerStyle} component={SearchTab} />
          <Stack.Screen name="Quest" options={headerStyle}>
            {(props) => <QuestTab quest={this.state.quest.task} />}
          </Stack.Screen>
          <Stack.Screen name="Groups" options={headerStyle} component={GroupTab} />
          <Stack.Screen name="Profile" options={headerStyle} component={ProfileTab} screenProps={{ user: 'abc' }} initialParams={this.state.user} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const MyTheme = {
  dark: true,
  colors: {
    primary: '#FFFFFF',
    background: 'rgb(242, 242, 242)',
    card: '#FFCC15',
    text: '#000000',
    border: 'rgb(242, 242, 242)',
    notification: 'rgb(242, 242, 242)',
  },
};

const headerStyle = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#FFCC15',
    height: 50,
    elevation: 10,
    borderColor: '#000000',
    opacity: 1,
  },
  headerTitleStyle: {
    color: '#000000',
  },
};
export default MainTabBar;
