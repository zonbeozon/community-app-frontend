import { Button } from "@/components/ui/button";
import * as S from "@/components/common/SignOutButton/SignOutButton.styles";
import useSignOut from "@/hooks/auth/useSignOut";
import { Loader2 } from "lucide-react";

const SignOutButton = () => {
  const { mutateAsync: signOut, isPending: loading } = useSignOut();

  const handleLogoutClick = async () => {
    if (loading) return;
    try {
      await signOut();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <Button
      className={S.signOutButton}
      variant="ghost"
      aria-label="Log out"
      onClick={handleLogoutClick}
      disabled={loading}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      로그아웃
    </Button>
  );
};

export default SignOutButton;
