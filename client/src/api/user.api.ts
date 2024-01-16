import { GET, POST_JSON } from "src/support/api.controls";

export const postUser = (data) => {
  return POST_JSON("/users", data, { credentials: "include" }).then((res) =>
    res.json()
  );
};

export const postAuth = (data) => {
  return POST_JSON("/auth", data, { credentials: "include" }).then((res) => {
    (window as any)._headers = res.headers;

    for (var pair of res.headers.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    // setAuth(fields);

    return res.json();
  });
};
// User Info
export const findUser = ({ id }) => {
  return GET(`/users/${id}`).then((res) => res.json());
};

// Account
export const getAccount = () => {
  return GET(`/account`).then((res) => res.json());
};

// Characters
const mockedUsers = JSON.parse(localStorage.getItem('characters')) || {};

export const getUserCharacters = () => {
  return Promise.resolve(Object.values(mockedUsers));

  return GET(`/account/characters`).then((res) => res.json());
};
export const postUserCharacter = () => {
  const characterId = Math.floor(Math.random() * 999);
  const character = {
    id: characterId,
    avatarURL: `https://picsum.photos/id/${characterId}/200/200?grayscale`,
  };

  mockedUsers[characterId] = character;

  localStorage.setItem('characters', JSON.stringify(mockedUsers));

  return Promise.resolve(character);

  return POST_JSON(`/user-characters`, character).then((res) =>
    res.json()
  );
};
// Items
export const getUserItems = (id) => {
  return GET(`/users/${id}/items`).then((res) => res.json());
};
