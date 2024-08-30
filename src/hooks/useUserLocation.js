import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {userLocationState} from '../recoil/atoms';
import {Platform, PermissionsAndroid} from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

const useUserLocation = () => {
  const [location, setLocation] = useRecoilState(userLocationState);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            return;
          }
        }

        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            reverseGeocode(latitude, longitude);
          },
          error => {
            console.log('Error getting location:', error);
          },
          {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
        );
      } catch (error) {
        console.log('getLocation error :', error);
      }
    };

    const reverseGeocode = (latitude, longitude) => {
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        )
        .then(result => {
          const countryCode = result?.data?.address?.country_code.toUpperCase();
          setLocation(countryCode); // Store the location in Recoil
        })
        .catch(error => {
          console.error('Error reverse geocoding:', error);
        });
    };

    if (!location) {
      getLocation();
    }
  }, [location]);

  return location;
};

export default useUserLocation;
