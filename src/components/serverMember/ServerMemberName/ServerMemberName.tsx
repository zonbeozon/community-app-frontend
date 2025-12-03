import { useEffect, useState } from 'react';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useAtom } from 'jotai';
import { Check, Loader2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUpdateServerMemberUsername } from '@/hooks/servermember/useUpdateServerMemberUsername';
import { validateServerMember } from '@/validations/validateServerMember';
import * as S from './ServerMemberName.styles';

export const ServerMemberName = () => {
  const [serverMember, setServerMember] = useAtom(serverMemberAtom);
  const { mutate: updateUsername, isPending: isUpdatingUsername } = useUpdateServerMemberUsername();

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(serverMember?.username || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (serverMember) setNewUsername(serverMember.username);
  }, [serverMember]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUsername(value);
    if (serverMember) {
      const validationErrors = validateServerMember({ ...serverMember, username: value });
      setError(validationErrors.username || null);
    }
  };

  const handleSave = () => {
    if (error || isUpdatingUsername || newUsername === serverMember?.username) return;
    updateUsername(
      { username: newUsername },
      {
        onSuccess: () => {
          if (serverMember) setServerMember({ ...serverMember, username: newUsername });
          setIsEditing(false);
        },
      },
    );
  };

  const startEditing = () => {
    setIsEditing(true);
    setError(null);
    if (serverMember) setNewUsername(serverMember.username);
  };

  return (
    <div className={S.usernameContainer}>
      {isEditing ? (
        <div className={S.editForm}>
          <div className={S.inputWrapper}>
            <Input value={newUsername} onChange={handleUsernameChange} className={S.usernameInput} autoFocus />
            {error && <p className={S.errorMessage}>{error}</p>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className={S.saveButton}
            disabled={!!error || isUpdatingUsername || newUsername === serverMember?.username}
          >
            {isUpdatingUsername ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
          </Button>
        </div>
      ) : (
        <>
          <h2 className={S.username}>{serverMember?.username}</h2>
          <Button variant="ghost" size="icon" onClick={startEditing} className={S.editButton}>
            <Pencil size={16} />
          </Button>
        </>
      )}
    </div>
  );
};
