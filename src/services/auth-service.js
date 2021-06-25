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

  if (!authString) {
    return false;
  }

  const auth = JSON.parse(authString);

  //    2. check whether the auth is alive
  return isAlive(auth);
}

export function isInRole(role) {
  const authString = sessionStorage.getItem('auth');

  if (!authString) {
    return false;
  }

  const auth = JSON.parse(authString);

  if (Array.isArray(auth.Roles)) {
    //  for more than one role, Roles is an array
    return auth.Roles.indexOf(role) !== -1;
  } else {
    //  for only one role, Roles is a string
    return auth.Roles === role;
  }
}

export function matchesAtLeastOneRole(inputRoles) {
  const authString = sessionStorage.getItem('auth');

  if (!authString) {
    return false;
  }

  const auth = JSON.parse(authString);

  for (let index = 0; index < auth.Roles.length; index++) {
    const roleIndex = inputRoles.indexOf(auth.Roles[index]);

    if (roleIndex !== -1) {
      //  found
      return true;
    }
  }

  //  not found
  return false;
}
