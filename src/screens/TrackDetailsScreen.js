import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import useFetchTracksDetails from '../hooks/useFetchTracksDetails';

const TrackDetailsScreen = ({route}) => {
  const {trackId, trackName} = route.params;
  const track = useFetchTracksDetails(trackId);
  console.log('🚀 ~ TrackDetailsScreen ~ track:', JSON.stringify(track));
  const convertDurationToTime = useMemo(() => {
    const totalSeconds = Math.floor(track.duration_ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = [
      hours > 0 ? hours : null, // Include hours only if greater than 0
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ]
      .filter(Boolean)
      .join(':');

    return formattedTime;
  }, [track]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader titleText={`${trackName} Track Details`} showBack />
      {track ? (
        <View className="my-5">
          <ScrollView>
            <View className="flex-1 justify-center items-center">
              <Image
                source={{
                  uri: track?.album?.images[0]?.url,
                }}
                className="w-80 h-80 rounded-lg mb-6"
              />
              <Text className="text-green-700 text-3xl font-extrabold mb-4">
                {track.name}
              </Text>
              <Text className="text-green-600 text-xl mb-2">
                Artists: {track.artists?.map(val => val.name + ', ')}
              </Text>
              <Text className="text-green-600 text-xl mb-2">
                Album: {track?.album?.album_type}
              </Text>
              <Text className="text-green-600 text-xl mb-2">
                Duration: {convertDurationToTime}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(track.external_urls.spotify)}
                className="bg-green-600 py-2 px-4 rounded-xl">
                <Text className="text-white text-2xl">Open Spotify</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      ) : (
        <ActivityIndicator size={'large'} color={'green'} />
      )}
    </SafeAreaView>
  );
};

export default TrackDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
