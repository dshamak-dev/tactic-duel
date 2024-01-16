import { useEffect, useMemo, useReducer } from "react";

interface UseApiProps {
  request: (props: any) => Promise<any>;
}

interface UseApiResponse {
  ready: boolean;
  loading: boolean;
  data: any;
  error: string;
  dispatch: (props?) => Promise<any>;
}

const reducer = (prev, { type, value }) => {
  const next = Object.assign({}, prev, { ready: true });

  switch (type) {
    case "loading": {
      next.loading = value;
      break;
    }
    case "error": {
      next.error = value;
      next.loading = false;
      break;
    }
    case "data": {
      next.error = null;
      next.loading = false;
      next.data = value;
      break;
    }
  }

  return next;
};

const defaultState = { loading: false, data: null, error: null, ready: false };

export const useApi = ({ request }: UseApiProps): UseApiResponse => {
  const [{ ready, loading, data, error }, _dispatch] = useReducer(
    reducer,
    defaultState
  );

  const dispatch = (props) => {
    if (!request) {
      return;
    }

    _dispatch({ type: "loading", value: true });

    return request(props)
      .then((value) => {
        _dispatch({ type: "data", value });

        return value;
      })
      .catch((err) => {
        _dispatch({ type: "error", value: err.message });
      })
      .finally(() => {
        _dispatch({ type: "loading", value: false });
      });
  };

  const result = useMemo(() => {
    return { ready, loading, data, error, dispatch };
  }, [ready, loading, data, error, dispatch]);

  return { ready, loading, data, error, dispatch };
};
