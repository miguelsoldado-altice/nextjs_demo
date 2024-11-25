const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/products", permanent: false }];
  },
};

export default nextConfig;
