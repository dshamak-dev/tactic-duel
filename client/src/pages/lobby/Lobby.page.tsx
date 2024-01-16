import React, { useCallback, useMemo, useState } from "react";
import { findBattle } from "src/api/battle.api";
import { AppLink } from "src/components/atoms/AppLink";
import { Button } from "src/components/atoms/Button";
import { Grid } from "src/components/atoms/Grid";
import { Loader } from "src/components/atoms/Loader";
import { CharacterList } from "src/components/molecules/CharacterCard";
import { UserNavigation } from "src/components/molecules/UserNavigation";
import { useCharacters } from "src/hooks/useCharacters";
import { useApi } from "src/support/useApi";

export const LobbyPage = () => {
  const [abortController, setAbortController] = useState(null);
  const {
    loading: loadingCharacters,
    characters,
    dispatch: getCharacters,
  } = useCharacters();
  const {
    loading: isSearching,
    data: session,
    dispatch,
  } = useApi({
    request: (body) => {
      const abortController = new AbortController();

      setAbortController(abortController);

      return findBattle(body, { signal: abortController.signal });
    },
  });
  const [selectedId, setSelectedId] = useState(null);

  const handleCharacterClick = useCallback(
    (it) => {
      if (selectedId === it.id) {
        setSelectedId(null);
      } else {
        setSelectedId(it.id);
      }
    },
    [selectedId]
  );

  const handleCreatePlayer = () => {
    if (!selectedId) {
      return;
    }

    dispatch({ characterId: selectedId });
  };

  const handleCancelSearch = () => {
    if (abortController && abortController.abort) {
      abortController.abort();
    }
  };

  const content = useMemo(() => {
    if (loadingCharacters) {
      return <Loader />;
    }

    if (!characters?.length) {
      return (
        <div className="flex flex-col gap-4 justify-center px-12">
          <h1>YOU have No characters to continue!</h1>
          <h3>
            Create one in{" "}
            <AppLink href="/characters" className="underline">
              CHARACTERS MANAGER
            </AppLink>
            .
          </h3>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4 px-4">
        <Grid className="grid-cols-5 gap-4">
          <CharacterList
            characters={characters}
            selected={[selectedId]}
            onCharacterClick={isSearching ? null : handleCharacterClick}
          />
        </Grid>
        <div>
          {isSearching ? (
            <Button onClick={handleCancelSearch} className="bg-red-200">cancel search</Button>
          ) : (
            <Button disabled={selectedId == null} onClick={handleCreatePlayer}>
              start battle
            </Button>
          )}
        </div>
      </div>
    );
  }, [loadingCharacters, characters, selectedId, isSearching]);

  return (
    <main>
      <UserNavigation />
      {content}
    </main>
  );
};
