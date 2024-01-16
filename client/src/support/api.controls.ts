import { setAuthToken, getAuthToken, clearAuthToken } from "src/auth/auth.controller";
import { appConfig } from "src/config";
import { navigateTo } from "src/support/navigation.utils";

const normalizeURL = (path) => {
  return `${appConfig.API_URL}/api/${path.replace(/^\//, "")}`;
};

export const waitForMs = (ms: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

const normalizeHeaders = async (headers) => {
  const token = await getAuthToken();

  return Object.assign(
    {
      Authorization: `Bearer ${token}`,
    },
    headers
  );
};

const normalizeRequestProps = async (props) => {
  const { headers, ...other } = props || {};

  return Object.assign(
    {
      headers: await normalizeHeaders(headers),
    },
    other
  );
};

const validateResponseStatus = async (response) => {
  if (!response) {
    throw new Error("invalid response");
  }

  const authToken = response.headers.get("Authorization");

  if (authToken) {
    setAuthToken(authToken);
  }

  switch (response.status) {
    case 401: {
      clearAuthToken();
      navigateTo('/signin', { redirect: true })
      throw new Error("Unauthorized");
    }
  }

  if (response.status >= 400) {
    throw new Error("invalid request");
  }

  return response;
};

export const GET = async (path: string, options?) => {
  const requestProps = await normalizeRequestProps(options);

  return fetch(normalizeURL(path), requestProps).then((res) =>
    validateResponseStatus(res)
  );
};

export const POST = async (path: string, body, options?) => {
  const requestProps = await normalizeRequestProps(options);

  return fetch(normalizeURL(path), {
    method: "POST",
    credentials: "same-origin",
    ...Object.assign(requestProps, {
      headers: Object.assign(
        {
          Accept: "text/plain",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        requestProps?.headers || {}
      ),
    }),
    body,
  }).then((res) => validateResponseStatus(res));
};

export const POST_JSON = (path: string, json, options?) => {
  return POST(
    path,
    JSON.stringify(json),
    Object.assign({
      headers: Object.assign(
        {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        options?.headers
      ),
      options,
    })
  );
};
