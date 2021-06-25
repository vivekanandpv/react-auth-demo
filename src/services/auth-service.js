import { decode, isAlive } from '../utils/jwt-utils';
import { httpClient } from '../utils/http-client';

export function login(credentials) {
  //...
  //  make a post request to the auth server
  return httpClient.post('auth/login', credentials).then((res) => {
    //  decode the token
    const tokenPayload = decode(res.data.token);

    //  store the decoded token in the sessionStorage
    sessionStorage.setItem('auth', JSON.stringify(tokenPayload));

    return Promise.resolve(true);
  });
}

export function logout() {
  sessionStorage.removeItem('auth');
}

export function isLoggedIn() {
  //    1. check whether the sessionStorage has the auth
  const authString = sessionStorage.getItem('auth');
  const auth = JSON.parse(authString);

  //    2. check whether the auth is alive
  return isAlive(auth);
}
