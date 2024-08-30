import {useEffect, useState} from 'react';
import useApi from '../api/request';

export default function useFetchTracks(playlistId) {
  const [tracks, setTracks] = useState([]);
  const {getTracksById} = useApi();
  useEffect(() => {
    if (playlistId) {
      getTracksById(playlistId)
        .then(data => {
          setTracks(data.items);
        })
        .catch(error => {
          console.error('Error fetching playlists:', error);
        });
    }
  }, []);
  return tracks;
}
