import {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {playlistsState, userLocationState} from '../recoil/atoms';
import {useSpotifyAuth} from '../hooks/SpotifyAuth';
import useApi from '../api/request';

const useFetchPlaylists = () => {
  const location = useRecoilValue(userLocationState);
  console.log('🚀 ~ useFetchPlaylists ~ location:', location);
  const [playlists, setPlaylists] = useRecoilState(playlistsState);
  const token = useSpotifyAuth();
  const {getRecommendedPlaylist} = useApi();

  useEffect(() => {
    if (token) {
      getRecommendedPlaylist(location)
        .then(data => {
          if (data) {
            setPlaylists(data.playlists.items); // Store playlists in Recoil
            // console.log('getRecommendedPlaylist ', JSON.stringify(data));
          }
        })
        .catch(error => {
          console.error('Error fetching playlists:', error);
        });
    }
  }, [location, token, setPlaylists]);

  return playlists;
};

export default useFetchPlaylists;
