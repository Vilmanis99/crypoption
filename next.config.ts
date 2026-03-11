import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Affiliate redirect links (update destination URLs with your actual affiliate links)
      { source: '/pocket/go-en',    destination: '/pocket-option/',  permanent: false },
      { source: '/pocket/go-rus',   destination: '/pocket-option-ru/', permanent: false },
      { source: '/quotex/go-en',    destination: '/quotex/',         permanent: false },
      { source: '/iq-option/go-en', destination: '/iq-option/',      permanent: false },
      { source: '/binomo/go-en',    destination: '/binomo/',         permanent: false },
      { source: '/iqcent/go-en',    destination: '/iq-cent/',        permanent: false },
    ]
  },
};

export default nextConfig;
