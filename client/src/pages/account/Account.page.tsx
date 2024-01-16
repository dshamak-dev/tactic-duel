import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccount } from "src/api/user.api";
import { clearAuthToken } from "src/auth/auth.controller";
import { Button } from "src/components/atoms/Button";
import { UserNavigation } from "src/components/molecules/UserNavigation";
import { useApi } from "src/support/useApi";

export const AccountPage = () => {
  const navigate = useNavigate();

  const { dispatch } = useApi({ request: getAccount });

  const handleLogout = () => {
    clearAuthToken();

    navigate("/signin");
  };

  useEffect(() => {
    dispatch();
  }, []);

  return (
    <main>
      <UserNavigation />
      <div className="flex flex-col gap-4 justify-center px-12">
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
    </main>
  );
};
