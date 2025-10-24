import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { ChannelMemberDropdownProps } from "@/types/channelMember.type";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ChannelMemberBanDialog from "../ChannelMemberBanDialog/ChannelMemberBanDialog";
import ChannelMemberRoleChangeDialog from "../ChannelMemberRoleChangeDialog/ChannelMemberRoleChangeDialog";

type DialogType = "ban" | "role" | null;

const ChannelMemberDropdown = ({ channelId, targetMember }: ChannelMemberDropdownProps) => {
  const [dialog, setDialog] = useState<DialogType>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setDialog("role")}>
            권한 수정
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-red-500" 
            onSelect={() => setDialog("ban")}
          >
            추방
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChannelMemberRoleChangeDialog
        open={dialog === "role"}
        onOpenChange={(isOpen) => !isOpen && setDialog(null)}
        channelId={channelId}
        targetMember={targetMember}
      />
      <ChannelMemberBanDialog
        open={dialog === "ban"}
        onOpenChange={(isOpen) => !isOpen && setDialog(null)}
        channelId={channelId}
        targetMember={targetMember}
      />
    </>
  );
};

export default ChannelMemberDropdown;