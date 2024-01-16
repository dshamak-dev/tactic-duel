const storage = sessionStorage;
const storageKey = '_auth';
const storageTokenKey = 'auth-token';

export const getAuthToken = async () => {
  return storage.getItem(storageTokenKey);
}

export const validateAuth = async () => {
  try {
    const token = await getAuthToken();

    if (!token) {
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
  }

  return false;
};

export const setAuthToken = async (token) => {
  storage.setItem(storageTokenKey, token);
};

export const clearAuthToken = () => {
  storage.removeItem(storageTokenKey);
};

export const setAuth = async ({ email, password }) => {
  const hourMS = 1000 * 60 * 60;
  const timeoutMS = hourMS * 5;
  const expirationTime = Date.now() + timeoutMS;

  storage.setItem(storageKey, JSON.stringify({ email, expiredAt: expirationTime }));
};
