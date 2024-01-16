import React from "react";
import { useNavigate } from "react-router-dom";
import { postAuth } from "src/api/user.api";
import { useApi } from "src/support/useApi";
import { setAuth } from "src/auth/auth.controller";
import { parseFormFields } from "src/support/form.support";
import { AppLink } from "src/components/atoms/AppLink";

export const SignInPage = () => {
  const { loading, error, dispatch } = useApi({ request: postAuth });
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const redirectPathname =
      new URLSearchParams(location.search).get("redirect") || "/";

    const fields = parseFormFields<{
      email: string;
      password: string;
    }>(ev.target);

    const response = await dispatch(fields);

    if (response) {
      navigate(redirectPathname);
    }
  };

  return (
    <main>
      <div><AppLink href="/" className="underline">go home</AppLink></div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" id="email" name="email" required />
        <input type="password" placeholder="password" name="password" required />
        <div><AppLink href="/signup" className="underline">{`don't have an account?`}</AppLink></div>
        <button>submit</button>
      </form>
    </main>
  );
};
