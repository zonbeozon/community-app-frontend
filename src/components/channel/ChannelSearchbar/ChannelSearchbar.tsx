import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command";
import { Lock } from "lucide-react";
import { toast } from "sonner"; // 사용하시는 토스트 라이브러리를 import 합니다. (예: sonner)

// 이제 모든 채널 목록을 가져오는 훅 하나만 필요합니다.
import useGetAllChannels from "@/queries/useGetAllChannels";
import { ChannelSearchResultTemp } from "@/types/channel.type";
import * as S from "./ChannelSearchbar.styles";

const ChannelSearchbar = () => {
  const navigate = useNavigate();

  // 필요한 훅이 useGetAllChannels 하나로 줄었습니다.
  const { data: allChannels, isLoading } = useGetAllChannels();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // 필터링 로직은 그대로 유지합니다.
  const filteredResults = useMemo(() => {
    if (!allChannels) return [];
    if (!searchQuery) return allChannels;
    return allChannels.filter((channel) =>
      channel.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allChannels, searchQuery]);

  const handleFocus = () => setIsOpen(true);
  const handleBlur = () => setTimeout(() => setIsOpen(false), 150);

  // --- 핵심 로직: 새로운 요구사항에 맞춰 완전히 재작성되었습니다 ---
  const handleItemSelect = (channel: ChannelSearchResultTemp) => {
    setIsOpen(false);

    // 1. 채널이 공개 상태인지 확인합니다.
    const isPublic = channel.settings?.contentVisibility === 'PUBLIC';

    if (isPublic) {
      navigate(`/channels/${channel.channelId}`);
    } else {
      toast.error("비공개 채널에는 검색을 통해 참여할 수 없습니다.");
    }
  };

  return (
    <div className={S.container}>
      <Command className={S.command} onBlur={handleBlur} shouldFilter={false}>
        <CommandInput
          placeholder="모든 채널 검색하기..."
          onFocus={handleFocus}
          onValueChange={setSearchQuery}
          value={searchQuery}
        />
        
        {isOpen && (
          <div className={S.dropdownContainer}>
            <CommandList>
              {isLoading && <CommandEmpty>채널 목록을 불러오는 중...</CommandEmpty>}
              {!isLoading && allChannels?.length === 0 && (
                <CommandEmpty>검색할 수 있는 채널이 없습니다.</CommandEmpty>
              )}
              {!isLoading && filteredResults.length > 0 && (
                <CommandGroup heading="채널 목록">
                  {filteredResults.map((channel) => {
                    const isPublic = channel.settings?.contentVisibility === 'PUBLIC';

                    return (
                      <CommandItem
                        key={channel.channelId}
                        value={channel.title} 
                        onSelect={() => handleItemSelect(channel)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="flex items-center truncate">
                            {channel.title}
                          </span>
                          {!isPublic && (
                            <Lock className="ml-2 h-4 w-4 flex-shrink-0 text-gray-500" />
                          )}
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
              {!isLoading && allChannels && allChannels.length > 0 && filteredResults.length === 0 && (
                 <CommandEmpty>"{searchQuery}"에 대한 검색 결과가 없습니다.</CommandEmpty>
              )}
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
};

export default ChannelSearchbar;