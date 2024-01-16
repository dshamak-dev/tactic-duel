import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { getAppHighlight } from "src/api/app.api";
import { useApi } from "src/support/useApi";
import { appRouter } from "src/app/app.router";

export const App = () => {
  const { loading, data, error, ready, dispatch } = useApi({
    request: getAppHighlight
  });

  useEffect(() => {
    if (!data) return;

    const date = new Date(data.createdAt).toLocaleDateString('us');

    console.clear();
    console.log(`%c${data.title}`, "color: black; font-weight: bold;");
    console.log(`%c${data.description}`, "color: rgba(0,0,0,0.5);");
    console.log(`%c${date}`, "color: orange;");
  }, [data]);

  useEffect(() => {
    dispatch();
  }, []);

  return (!ready || loading) ? (
    <strong>loading..</strong>
  ) : (
    <RouterProvider router={appRouter} />
  );
};
