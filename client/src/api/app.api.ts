import { GET, waitForMs } from "src/support/api.controls";

export const getAppHighlight = async () => {
  await waitForMs(1000);

  return GET("/highlight")
    .then((res) => res.json())
    .then(({ title, description, createdAt }) => {
      return { title, description, createdAt };
    });
};
