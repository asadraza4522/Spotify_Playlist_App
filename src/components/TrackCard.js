import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const TrackCard = ({name, image, artistName, popularity, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      key={name}
      className={'flex-row items-center p-2 m-2 bg-white rounded-lg shadow-lg'}>
      <Image source={{uri: image}} className={'w-20 h-20 rounded-l-lg'} />
      <View className={'flex-1 justify-center p-2'}>
        <Text className={'text-lg font-semibold'}>{name}</Text>
        <Text className={'text-sm text-gray-600'}>{artistName}</Text>
        <Text className={'text-sm text-gray-600'}>
          Popularity: {popularity}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(TrackCard);
