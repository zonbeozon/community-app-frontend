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
import { toast } from "sonner";
import useGetAllChannels from "@/queries/useGetAllChannels";
// [주목!] 이 타입은 실제 데이터와 다를 수 있으므로, 실제 데이터 타입을 정의하는 것이 좋습니다.
// 우선은 any를 사용하거나, 실제 데이터에 맞는 새 타입을 만들어 사용하세요.
// import { ChannelSearchResultTemp } from "@/types/channel.type";
import * as S from "./ChannelSearchbar.styles";

// 임시로 사용할 실제 데이터 타입 (예시)
interface AllChannelItem {
  channelId: number;
  title: string;
  settings?: {
    contentVisibility: 'PUBLIC' | 'PRIVATE';
  };
  // ... getChannels API가 반환하는 다른 속성들
}

const ChannelSearchbar = () => {
  const navigate = useNavigate();

  // useGetAllChannels의 데이터 타입이 AllChannelItem[]이라고 가정합니다.
  const { data: allChannels, isLoading } = useGetAllChannels();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredResults = useMemo(() => {
    // channel이 null 또는 undefined인 경우를 필터링하여 안정성 확보
    if (!allChannels) return [];
    
    const validChannels = allChannels.filter(channel => channel && channel.title);

    if (!searchQuery) return validChannels;

    return validChannels.filter((channel) =>
      channel.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allChannels, searchQuery]);

  const handleFocus = () => setIsOpen(true);
  const handleBlur = () => setTimeout(() => setIsOpen(false), 150);

  // handleItemSelect의 파라미터 타입을 임시 타입으로 변경
  const handleItemSelect = (channel: AllChannelItem) => {
    setIsOpen(false);

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