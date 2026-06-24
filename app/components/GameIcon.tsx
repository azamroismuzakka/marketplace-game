"use client";

import { useState } from "react";

// Logo game per nama game. File ditaruh di public/games/.
// Jika file belum ada / gagal dimuat, otomatis fallback ke emoji.
const GAME_LOGOS: Record<string, string> = {
  "Mobile Legends": "/games/mobile-legends.png",
  "Free Fire": "/games/free-fire.png",
};

export default function GameIcon({
  game,
  emoji,
}: {
  game: string;
  emoji: string;
}) {
  const logo = GAME_LOGOS[game];
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={game}
        onError={() => setFailed(true)}
        className="h-full w-full object-contain p-1.5"
      />
    );
  }

  return <span className="text-2xl">{emoji}</span>;
}
