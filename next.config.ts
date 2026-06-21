import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Izinkan perangkat lain di jaringan lokal (mis. HP) mengakses dev server
  // lewat IP LAN. Tanpa ini, Next 16 memblokir aset/endpoint dev (HMR & runtime)
  // lintas-origin sehingga hidrasi gagal — navbar/tombol jadi tidak interaktif.
  // Wildcard dicocokkan per-segmen, jadi 192.168.*.* mencakup semua IP di subnet.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*"],
};

export default nextConfig;
