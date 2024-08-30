import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const PlaylistCard = ({title, image, trackCount, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={
        'flex-1 grow w-1/4 justify-center items-center p-2 m-2 bg-white rounded-lg shadow-lg '
      }>
      <Image source={{uri: image}} className={'w-32 h-32 rounded-lg'} />
      <View className={'flex-1 justify-center p-2'}>
        <Text className={'text-lg font-semibold'}>{title}</Text>
        <Text className={'text-sm text-gray-600'}>{trackCount} Tracks</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PlaylistCard);
