export function decode(token) {
  if (typeof token !== 'string') {
    throw new Error('Token type is not valid');
  }

  const parts = token.split('.');
  return JSON.parse(atob(parts[1]));
}

export function isAlive(payload) {
  if (!payload.exp) {
    return true;
  }

  //  exp is a UNIX time stamp
  //  convert that to number of milliseconds
  const expiry = new Date(payload.exp * 1000);
  const now = new Date();

  return expiry >= now;
}
