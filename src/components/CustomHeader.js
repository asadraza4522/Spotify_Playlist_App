import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from './Icon';

const CustomHeader = ({showBack = false, titleText = ''}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        {/* Add your left-side elements like back button, menu icon, etc. */}
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon icon={'arrow-back'} iconType="Ionicons" iconSize={30} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headerCenter}>
        <Text style={styles.titleStyle}>{titleText}</Text>
      </View>
      <View style={styles.headerRight}>
        {/* Add your right-side elements like cart icon, notifications, etc. */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerLeft: {
    alignItems: 'flex-start',
    position: 'absolute',
    marginLeft: 8,
    zIndex: 10,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  titleStyle: {
    fontWeight: '600',
    color: 'black',
    fontSize: 17,
    maxWidth: '80%',
  },
});

export default CustomHeader;
