import { Button } from "@/components/ui/button";
import * as S from "@/components/common/SignInButton/SignInButton.styles";
import UserSelectionDialog from "@/components/common/UserSelectionDialog/UserSelectionDialog";

const SignInButton = () => {
  return (
    <UserSelectionDialog>
      <Button
        className={S.signInButton}
        variant="ghost"
        aria-label="Sign in with Google"
      >
        로그인
      </Button>
    </UserSelectionDialog>
  );
}

export default SignInButton;