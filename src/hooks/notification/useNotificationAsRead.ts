import { notificationsRead } from '@/apis/http/notification.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useMarkNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications.lists() });
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
