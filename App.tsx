import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecommendedPlaylistsScreen from './src/screens/RecommendedPlaylistsScreen';
import PlaylistTracksScreen from './src/screens/PlaylistTracksScreen';
import TrackDetailsScreen from './src/screens/TrackDetailsScreen';
import {RecoilRoot} from 'recoil';
import Geolocation, {
  GeolocationConfiguration,
} from '@react-native-community/geolocation';

const config: GeolocationConfiguration = {
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
  locationProvider: 'auto',
};
Geolocation.setRNConfiguration(config);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="RecommendedPlaylists"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="RecommendedPlaylists"
            component={RecommendedPlaylistsScreen}
            options={{title: 'Recommended Playlists'}}
          />
          <Stack.Screen
            name="PlaylistTracks"
            component={PlaylistTracksScreen}
            options={{title: 'Playlist Tracks'}}
          />
          <Stack.Screen
            name="TrackDetails"
            component={TrackDetailsScreen}
            options={{title: 'Track Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
