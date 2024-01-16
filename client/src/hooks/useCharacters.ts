import { useEffect, useState } from "react";
import { getUserCharacters } from "src/api/user.api";
import { useApi } from "src/support/useApi";

export const useCharacters = () => {
  const {
    loading,
    data: characters,
    dispatch,
  } = useApi({
    request: async () => {
      const res = await getUserCharacters();
      return res;
    },
  });

  useEffect(() => {
    dispatch();
  }, []);

  return { loading, characters, dispatch };
};
