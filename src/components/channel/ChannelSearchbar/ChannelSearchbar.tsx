import { useState } from "react";
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

import useGetJoinedChannels from "@/queries/useGetJoinedChannel";
import { ChannelSearchResultTemp } from "@/types/channel.type"; // ChannelSearchResultTemp 타입을 적절한 위치에서 임포트
import * as S from "./ChannelSearchbar.styles";

const ChannelSearchbar = () => {
  const navigate = useNavigate();

  // 2. 쿼리 훅을 호출합니다. enabled: false 옵션으로 처음에는 실행되지 않도록 합니다.
  const { data: results, isLoading, refetch } = useGetJoinedChannels();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // 3. onFocus 이벤트가 발생했을 때만 수동으로 데이터를 가져옵니다.
  const handleFocus = () => {
    setIsOpen(true);
    // results가 아직 로드되지 않았을 때(최초 포커스 시)만 refetch를 실행합니다.
    if (!results) {
      refetch();
    }
  };
  
  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  const handleItemSelect = (channel: ChannelSearchResultTemp) => {
    setIsOpen(false);
    navigate(`/channels/${channel.channelId}`);
  };

  return (
    <div className={S.container}>
      <Command className={S.command} onBlur={handleBlur}>
        <CommandInput
          placeholder="채널 검색하기..."
          onFocus={handleFocus}
          onValueChange={setSearchQuery} // onValue-change -> onValueChange
          value={searchQuery}
        />
        
        {isOpen && (
          <div className={S.dropdownContainer}>
            <CommandList>
              {isLoading && <CommandEmpty>채널 목록을 불러오는 중...</CommandEmpty>}
              {!isLoading && results?.length === 0 && (
                <CommandEmpty>참여할 수 있는 채널이 없습니다.</CommandEmpty>
              )}
              {!isLoading && results && results.length > 0 && (
                <>
                  <CommandEmpty>"{searchQuery}"에 대한 검색 결과가 없습니다.</CommandEmpty>
                  <CommandGroup heading="채널 목록">
                    {/* 4. 검색 로직: Shadcn의 Command 컴포넌트는 필터링을 자동으로 처리해줍니다. */}
                    {results.map((channel) => {
                      const isPublic = channel.settings.contentVisibility === 'PUBLIC';

                      return (
                        <CommandItem
                          key={channel.channelId}
                          value={channel.title} // CommandItem의 value는 필터링의 기준이 됩니다.
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
                </>
              )}
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
};

export default ChannelSearchbar;