import {atom} from 'recoil';
import {recoilPersist} from './recoil-persist';

const {persistAtom} = recoilPersist();

// Atom for storing user's spotify token
export const spotifyTokenState = atom({
  key: 'spotifyTokenState',
  default: null, // Initially, the token is unknown
  effects_UNSTABLE: [persistAtom],
});
// Atom for storing user's spotify token
export const spotifyTokenExpiryState = atom({
  key: 'spotifyTokenExpiryState',
  default: null, // Initially, the token expiry is unknown
  effects_UNSTABLE: [persistAtom],
});

// Atom for storing user's location (country code)
export const userLocationState = atom({
  key: 'userLocationState',
  default: null, // Initially, the location is unknown
  effects_UNSTABLE: [persistAtom],
});

// Atom for storing the playlists
export const playlistsState = atom({
  key: 'playlistsState',
  default: [], // Initially, the playlist data is an empty array
  effects_UNSTABLE: [persistAtom],
});

export const spotifyClientIdState = atom({
  key: 'spotifyClientIdState',
  default: '7e090fefda534fb3acc72d3a90313e51',
});

export const spotifyClientSecretState = atom({
  key: 'spotifyClientSecretState',
  default: 'e25616c3c8e94d8ea42780befb7d80ad',
});
