import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import PlaylistCard from '../components/PlaylistCard';
import useFetchPlaylists from '../hooks/useFetchPlaylists';

const RecommendedPlaylistsScreen = ({navigation}) => {
  const playlists = useFetchPlaylists();

  const keyExtractorId = item => `${item?.id}`;

  const renderItem = ({item}) => (
    <PlaylistCard
      onPress={() =>
        navigation.navigate('PlaylistTracks', {
          playlistId: item.id,
          playlistsName: item.name,
        })
      }
      image={item.images[0]?.url}
      title={item.name}
      trackCount={item.tracks?.total}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader titleText="Recommended Tracks Playlist" />
      <View className="my-5">
        <FlatList
          data={playlists}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={keyExtractorId}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default RecommendedPlaylistsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
