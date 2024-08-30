import {useEffect, useState} from 'react';
import useApi from '../api/request';

export default function useFetchTracksDetails(trackId) {
  const [tracksDetails, setTracksDetails] = useState([]);
  const {getTrackDetailsById} = useApi();
  useEffect(() => {
    if (trackId) {
      getTrackDetailsById(trackId)
        .then(data => {
          setTracksDetails(data);
        })
        .catch(error => {
          console.error('Error fetching playlists:', error);
        });
    }
  }, []);
  return tracksDetails;
}
