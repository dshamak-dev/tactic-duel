import { useEffect, useState } from "react";
import { getAccountCharacters } from "src/api/user.api";
import { useApi } from "src/support/useApi";

export const useCharacters = () => {
  const {
    loading,
    data: characters,
    dispatch,
  } = useApi({
    request: async () => {
      const res = await getAccountCharacters();
      return res;
    },
  });

  const update = (value) => {
    dispatch({ type: "data", value });
  };

  useEffect(() => {
    dispatch();
  }, []);

  return { loading, characters, dispatch, update };
};
