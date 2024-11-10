import { getAuth, onAuthStateChanged } from "firebase/auth";

const getToken = async () => {
  const authUser = Object.keys(window.localStorage)
    .filter(item => item.startsWith('firebase:authUser'))[0];

    if (!authUser) return null;
    else return JSON.parse(localStorage.getItem(authUser)).stsTokenManager?.accessToken;
}

const isTokenValid = async () => {
  const token = await getToken();
  if (!token) return false;

  const auth = getAuth();

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}


export default {isTokenValid, getToken};
