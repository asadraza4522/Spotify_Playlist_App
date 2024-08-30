import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import TrackCard from '../components/TrackCard';
import useFetchTracks from '../hooks/useFetchTracks';

const PlaylistTracksScreen = ({route, navigation}) => {
  const {playlistId, playlistsName} = route.params;
  const tracks = useFetchTracks(playlistId);

  const renderItem = ({item}) => (
    <TrackCard
      name={item.track.name}
      image={item.track.album.images[0].url}
      artistName={item.track.artists[0].name}
      popularity={item.track.popularity}
      onPress={() =>
        navigation.navigate('TrackDetails', {
          trackId: item.track.id,
          trackName: item.track.name,
        })
      }
      key={item.track.name}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader titleText={`${playlistsName}'s Track Playlist`} showBack />
      <View className="mt-5">
        <FlatList
          data={tracks}
          renderItem={renderItem}
          keyExtractor={item => item.track.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
export default PlaylistTracksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
