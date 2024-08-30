import axios from 'axios';
const BASE_URL = 'https://api.spotify.com/v1';
import {useSpotifyAuth} from '../hooks/SpotifyAuth';

const config = {
  headers: {
    Authorization: '',
  },
};

const useApi = () => {
  const token = useSpotifyAuth();
  config.headers.Authorization = `Bearer ${token}`;

  const getRecommendedPlaylist = async location => {
    try {
      const response = await axios
        .get(
          `${BASE_URL}/browse/featured-playlists?${
            location ? 'locale=' + location + '&' : ''
          }limit=20&offset=0`,
          config,
        )
        .catch(err => {
          console.log('Getting Error ::::;', err);
        });

      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getTracksById = async playlistId => {
    try {
      const response = await axios.get(
        `${BASE_URL}/playlists/${playlistId}/tracks`,
        config,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getTrackDetailsById = async trackId => {
    try {
      const response = await axios.get(`${BASE_URL}/tracks/${trackId}`, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getRecommendedPlaylist,
    getTracksById,
    getTrackDetailsById,
  };
};

export default useApi;
