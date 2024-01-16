import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo } from "react";
import { postAccountCharacter } from "src/api/user.api";
import { AppLink } from "src/components/atoms/AppLink";
import { Grid } from "src/components/atoms/Grid";
import { Loader } from "src/components/atoms/Loader";
import { CharacterList } from "src/components/molecules/CharacterCard";
import { CharacterPreview } from "src/components/molecules/CharacterPreview";
import { UserNavigation } from "src/components/molecules/UserNavigation";
import { useCharacters } from "src/hooks/useCharacters";
import { Character } from "../../../../core/character/character.model";
import { useApi } from "src/support/useApi";

export const CharactersPage = () => {
  const { loading, characters, dispatch } = useCharacters();
  const { loading: pending, dispatch: createCharacter } = useApi({
    request: (data) => postAccountCharacter(data),
  });

  const isBusy = useMemo(() => {
    return pending || loading;
  }, [loading, pending]);

  const handleGetCharacters = () => {
    return dispatch();
  };

  const handleAddCharacter = async () => {
    const randomNum = Math.floor(Math.random() * 999);

    const rawCharacter = new Character({
      avatarURL: `https://picsum.photos/id/${randomNum}/200/200?grayscale`,
    });

    createCharacter(rawCharacter).then((res) => {
      return handleGetCharacters();
    });
  };

  return (
    <main>
      <UserNavigation />
      <div className="flex flex-col gap-4 justify-center px-12">
        <Grid className="grid-cols-5 gap-4">
          <CharacterPreview onClick={handleAddCharacter}>
            <FontAwesomeIcon icon={faPlus} />
          </CharacterPreview>
          {isBusy ? <Loader /> : <CharacterList characters={characters} />}
        </Grid>
        <h3>
          Get some in{" "}
          <AppLink href="/campaign" className="underline">
            CAMPAIGN
          </AppLink>
          .
        </h3>
      </div>
    </main>
  );
};
