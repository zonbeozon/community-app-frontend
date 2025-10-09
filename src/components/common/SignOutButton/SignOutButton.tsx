import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as S from "@/components/common/SignOutButton/SignOutButton.styles";
import useSignOut from "@/hooks/auth/useSignOut";

const SignOutButton = () => {
  const [loading, setLoading] = useState(false);
  const signOutHandler = useSignOut();

  const handleLogoutClick = async () => {
    if (loading) return;
    setLoading(true);
    await signOutHandler();
    setLoading(false);
  };

  return (
    <Button
      className={S.signOutButton}
      variant="ghost"
      aria-label="Log out"
      onClick={handleLogoutClick}
      disabled={loading}
    >
      {loading ? "로그아웃 중..." : "로그아웃"}
    </Button>
  );
};

export default SignOutButton;
