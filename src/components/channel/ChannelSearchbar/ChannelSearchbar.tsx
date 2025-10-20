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
import { ChannelSearchResultTemp } from "@/types/channel.type";
import * as S from "./ChannelSearchbar.styles";

const ChannelSearchbar = () => {
  const navigate = useNavigate();
  const { data: results, isLoading, refetch } = useGetJoinedChannels();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleFocus = () => {
    setIsOpen(true);
    if (!results) {
      refetch();
    }
  };
  
  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  const handleItemSelect = (channel: ChannelSearchResultTemp) => {
    setIsOpen(false);
    navigate(`/channels/${channel.channelInfo.channelId}`);
  };

  return (
    <div className={S.container}>
      <Command className={S.command} onBlur={handleBlur}>
        <CommandInput
          placeholder="채널 검색하기..."
          onFocus={handleFocus}
          onValueChange={setSearchQuery}
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
                    {results.map((channel) => {
                      const isPublic = channel.channelInfo.settings.contentVisibility === 'PUBLIC';

                      return (
                        <CommandItem
                          key={channel.channelInfo.channelId}
                          value={channel.channelInfo.title} 
                          onSelect={() => handleItemSelect(channel)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="flex items-center truncate">
                              {channel.channelInfo.title}
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