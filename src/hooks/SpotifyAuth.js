import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {spotifyTokenExpiryState, spotifyTokenState} from '../recoil/atoms';
import useUserLocation from './useUserLocation';

const CLIENT_ID = '7e090fefda534fb3acc72d3a90313e51';
const CLIENT_SECRET = 'e25616c3c8e94d8ea42780befb7d80ad';

export const useSpotifyAuth = () => {
  const [token, setToken] = useRecoilState(spotifyTokenState);
  console.log('🚀 ~ useSpotifyAuth ~ token:', token);
  const [tokenExpiry, setTokenExpiry] = useRecoilState(spotifyTokenExpiryState);
  useUserLocation();
  useEffect(() => {
    // Prepare some data to check if the token is about to expire or has expired
    const now = Math.floor(Date.now() / 1000);
    const difference = tokenExpiry ? Math.floor((tokenExpiry - now) / 60) : 0;
    console.log('🚀 ~ useEffect ~ difference:', difference);
    const getAccessToken = async () => {
      try {
        console.log('Calling Access Token');
        const response = await fetch(
          `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
            },
          },
        );
        const data = await response.json();
        console.log('response , ' + JSON.stringify(data));
        if (data?.access_token) {
          setToken(data.access_token);
          const timestamp = Math.floor(
            (Date.now() + data?.expires_in * 1000) / 1000,
          );
          console.log('🚀 ~ getAccessToken ~ timestamp:', timestamp);
          setTokenExpiry(timestamp);
        }
      } catch (error) {
        console.log('getAccessToken error :', error);
      }
    };
    if (!token || difference <= 10) {
      getAccessToken();
    }
  }, [token, tokenExpiry]);

  return token;
};
