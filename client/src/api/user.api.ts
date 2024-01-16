import { Character } from "../../../core/character/character.model";
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
export const getAccountCharacters = () => {
  return GET(`/account/characters`)
    .then((res) => res.json())
    .then((res) =>
      res?.map((it) => {
        return new Character(it).normalize();
      })
    );
};
export const postAccountCharacter = (data: any) => {
  return POST_JSON(`/account/characters`, data)
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        return new Character(res).normalize();
      }

      return res;
    });
};
// Items
export const getUserItems = (id) => {
  return GET(`/users/${id}/items`).then((res) => res.json());
};
