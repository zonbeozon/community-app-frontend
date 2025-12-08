import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetChannels } from '@/queries/useGetChannels';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useDebounce } from '@/hooks/common/useDebounce';
import * as S from './ChannelSearchbar.styles';

export const ChannelSearchbar = () => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debouncedKeyword = useDebounce(inputValue, 300);

  const navigate = useNavigate();

  const { data, isLoading } = useGetChannels({
    keyword: debouncedKeyword,
    page: 0,
    size: 10,
  });

  const searchResults = data?.content || [];

  const handleFocus = () => setIsOpen(true);

  const handleBlur = () => setTimeout(() => setIsOpen(false), 200);

  const handleItemSelect = (channelData: any) => {
    setIsOpen(false);

    const { channelInfo } = channelData;
    const isPublic = channelInfo.settings.contentVisibility === 'PUBLIC';

    if (isPublic) {
      navigate(`/channels/${channelInfo.channelId}`);
    } else {
      toast.error('비공개 채널에는 검색을 통해 참여할 수 없습니다.');
    }
  };

  return (
    <div className={S.container}>
      <Command className={S.command} shouldFilter={false}>
        <CommandInput
          placeholder="채널 검색..."
          onFocus={handleFocus}
          onBlur={handleBlur}
          onValueChange={setInputValue}
          value={inputValue}
        />

        {isOpen && (
          <div className={S.dropdownContainer}>
            <CommandList>
              {isLoading && <CommandEmpty>검색 중...</CommandEmpty>}

              {!isLoading && searchResults.length === 0 && (
                <CommandEmpty>
                  {inputValue ? `"${inputValue}"에 대한 결과가 없습니다.` : '검색어를 입력하세요.'}
                </CommandEmpty>
              )}

              {!isLoading && searchResults.length > 0 && (
                <CommandGroup heading="검색 결과">
                  {searchResults.map((item) => {
                    const info = item.channelInfo;
                    const isPublic = info.settings?.contentVisibility === 'PUBLIC';

                    return (
                      <CommandItem
                        key={info.channelId}
                        value={String(info.channelId)}
                        onSelect={() => handleItemSelect(item)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="flex items-center truncate">{info.title}</span>
                          {!isPublic && <Lock className="ml-2 h-4 w-4 flex-shrink-0 text-gray-500" />}
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
};
