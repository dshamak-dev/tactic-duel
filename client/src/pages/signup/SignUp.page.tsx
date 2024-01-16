import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { postUser } from "src/api/user.api";
import { useApi } from "src/support/useApi";
import { setAuth } from "src/auth/auth.controller";
import { parseFormFields } from "src/support/form.support";
import { AppLink } from "src/components/atoms/AppLink";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { loading, error, dispatch } = useApi({
    request: (user) => postUser(user),
  });
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const fields = parseFormFields<{
      email: string;
      password: string;
      confirm: string;
    }>(ev.target);

    try {
      const response = await dispatch(fields);

      if (response) {
        const redirectPathname =
          new URLSearchParams(location.search).get("redirect") || "/";

        navigate(redirectPathname);
      }
    } catch (err) {}
  };

  return (
    <main>
      <div>
        <AppLink href="/" className="underline">
          go home
        </AppLink>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          name="email"
          required
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          required
        />
        <input
          type="password"
          placeholder="confirm password"
          id="confirm"
          name="confirm"
          required
        />
        <div>
          <AppLink
            href="/sigin"
            className="underline"
          >{`already have an account?`}</AppLink>
        </div>
        <button>sign up</button>
      </form>
    </main>
  );
};
