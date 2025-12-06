import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useDialog } from '@/hooks/common/useDialog';
import { CoinBySymbol } from '@/types/coin.type';
import * as S from './CoinInfoDialog.styles';
import { TrendingUp, Coins, Globe, ZoomIn } from 'lucide-react'; 

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    notation: 'compact',
  }).format(value);
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const CoinInfoDialog = ({ coin }: { coin: CoinBySymbol }) => {
  const { props: dialogProps } = useDialog();

  if (!coin) return null;

  const { localizedInfo, quote, circulatingSupply, totalSupply, website, currencyRank } = coin;

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>
        <ZoomIn className='cursor-pointer w-5 h-5 text-gray-400'/>
      </DialogTrigger>

      <DialogContent className={S.dialogContent}>
        <div className="sr-only">
          <DialogTitle>{localizedInfo.name} Information</DialogTitle>
          <DialogDescription>Details about {localizedInfo.name}</DialogDescription>
        </div>

        <div className={S.header}>
          <img className={S.logo} src={coin.logo} alt={coin.symbol} />
          <div className={S.titleWrapper}>
            <div className={S.title}>
              {localizedInfo.name}
              <span className={S.symbolBadge}>{coin.symbol}</span>
            </div>
            <span className={S.rankBadge}>Rank #{currencyRank}</span>
          </div>
        </div>

        <div className={S.scrollableArea}>
          <div className={S.description}>
            {localizedInfo.description || "설명이 제공되지 않았습니다."}
          </div>

          <div>
            <h4 className={S.sectionTitle}>
              <TrendingUp size={16} /> Market Stats
            </h4>
            <div className={S.grid}>
              <div className={S.statItem}>
                <span className={S.statLabel}>Market Cap</span>
                <span className={S.statValue}>{formatCurrency(quote.marketCap)}</span>
              </div>
              <div className={S.statItem}>
                <span className={S.statLabel}>Volume (24h)</span>
                <span className={S.statValue}>{formatCurrency(quote.volume24h)}</span>
              </div>
              <div className={S.statItem}>
                <span className={S.statLabel}>Fully Diluted Cap</span>
                <span className={S.statValue}>{formatCurrency(quote.fullyDilutedMarketCap)}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className={S.sectionTitle}>
              <Coins size={16} /> Supply Info
            </h4>
            <div className={S.grid}>
              <div className={S.statItem}>
                <span className={S.statLabel}>Circulating Supply</span>
                <span className={S.statValue}>
                  {formatCurrency(circulatingSupply)?.replace('$', '')} {coin.symbol}
                </span>
              </div>
              <div className={S.statItem}>
                <span className={S.statLabel}>Total Supply</span>
                <span className={S.statValue}>
                  {formatCurrency(totalSupply)?.replace('$', '')} {coin.symbol}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={S.footer}>
          <span>Last updated: {formatDate(coin.metadataLastUpdated)}</span>
          {website && (
            <a 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={S.linkButton}
            >
              <span className="flex items-center gap-1">
                <Globe size={14} /> Official Website
              </span>
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};