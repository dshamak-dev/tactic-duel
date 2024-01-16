import { POST_JSON } from "src/support/api.controls";

export const findBattle = ({ characterId }, props) => {
  return POST_JSON(`/battle/search`, { characterId }, props).then((res) =>
    res.json()
  );
};
