'use client';

import { useEffect, useRef } from 'react';

const TickerTape = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any previous widget content
    containerRef.current.innerHTML = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';

    const widgetInner = document.createElement('div');
    widgetInner.className = 'tradingview-widget-container__widget';
    widgetContainer.appendChild(widgetInner);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'FX:EURUSD', title: 'EUR/USD' },
        { proName: 'FX:GBPUSD', title: 'GBP/USD' },
        { proName: 'BITSTAMP:BTCUSD', title: 'BTC/USD' },
        { proName: 'BITSTAMP:ETHUSD', title: 'ETH/USD' },
        { proName: 'TVC:GOLD', title: 'XAU/USD' },
        { proName: 'NASDAQ:AAPL', title: 'Apple' },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'compact',
      colorTheme: 'dark',
      locale: 'en',
    });

    widgetContainer.appendChild(script);
    containerRef.current.appendChild(widgetContainer);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      style={{
        background: '#0a1018',
        borderBottom: '1px solid #1e2e40',
        overflow: 'hidden',
      }}
    >
      <div ref={containerRef} />
    </div>
  );
};

export default TickerTape;
