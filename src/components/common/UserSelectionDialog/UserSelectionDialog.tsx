import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as S from "./UserSelectionDialog.styles";

interface UserSelectionDialogProps {
  children: React.ReactNode;
}

const UserSelectionDialog = ({ children }: UserSelectionDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUserSelect = (userNumber: number) => {
    const email = `user_${userNumber}@gmail.com`;
    window.location.href = `http://localhost:8080/local/login?email=${email}`;
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={S.dialogContent}>
        <DialogHeader>
          <DialogTitle>로그인 사용자 선택</DialogTitle>
          <DialogDescription>
            테스트 계정 중 하나를 선택하여 로그인합니다.
          </DialogDescription>
        </DialogHeader>
        <div className={S.buttonGrid}>
          <Button onClick={() => handleUserSelect(1)}>
            User 1 (user_1@gmail.com)
          </Button>
          <Button onClick={() => handleUserSelect(2)}>
            User 2 (user_2@gmail.com)
          </Button>
          <Button onClick={() => handleUserSelect(3)}>
            User 3 (user_3@gmail.com)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSelectionDialog;