export const hashed = o => Object.getOwnPropertyNames(o)
  .map(prop => `${ prop }=${ encodeURIComponent(o[prop]) }`)
  .join('&')

export const authorize = (provider, clientId) => {
  const query = {
    client_id: clientId,
    response_type: 'token',
    redirect_uri: window.location
  }
  const url = `${ provider }/authorize?${ hashed(query) }`
  window.location.replace(url)
}

export const getHashValues = () => {
  const hash = window.location.hash
  if (hash.match(/^#/)) {
    return hash
      .substring(1)
      .split('&')
      .reduce((o, kv) => {
        const a = kv.split('=');
        o[a[0]] = a[1];
        return o;
      }, {});
  } else {
    return {}
  }
}
