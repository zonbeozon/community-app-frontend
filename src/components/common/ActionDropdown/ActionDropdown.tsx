import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import * as S from "./ActionDropdown.styles";
import type { ActionDropdownProps } from "@/types/common.type";

export const ActionDropdown = ({
  actions,
  triggerClassName,
  open,
  onOpenChange,
  ...rest
}: ActionDropdownProps) => {
  const visibleActions = actions.filter((action) => action.isRendered !== false);

  if (visibleActions.length === 0) {
    return null;
  }

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className={`${S.triggerButton} ${triggerClassName || ''}`}
          {...rest}
        >
          <EllipsisVertical size={S.iconSize} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {visibleActions.map((action) => (
          <DropdownMenuItem
            key={action.label}
            onSelect={action.onSelect}
            className={S.menuItem(action.isDestructive)}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};