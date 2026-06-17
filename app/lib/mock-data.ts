export type GameAccount = {
    id: string;
    game: "Mobile Legends" | "Free Fire";
    title: string;
    rank: string;
    skins: number;
    heroes: string[];
    price: number;
    status: "Ready" | "Pending";
    seller: string;
    description: string;
};

export const gameAccounts: GameAccount[] = [
    {
        id: "ml-001",
        game: "Mobile Legends",
        title: "Legendary Mage Account",
        rank: "Mythic+",
        skins: 48,
        heroes: ["Valir", "Lylia", "Novaria"],
        price: 250000,
        status: "Ready",
        seller: "Ari Gaming",
        description: "Akun dengan hero favorit dan skin lengkap untuk rank tinggi.",
    },
    {
        id: "ff-001",
        game: "Free Fire",
        title: "Elite Free Fire Vault",
        rank: "Heroic",
        skins: 32,
        heroes: ["DJ Alok", "Chrono", "Kla"],
        price: 180000,
        status: "Ready",
        seller: "Nadia Store",
        description: "Akun dengan banyak skin dan item premium siap pakai.",
    },
    {
        id: "ml-002",
        game: "Mobile Legends",
        title: "Seasonal Fighter Account",
        rank: "Epic",
        skins: 26,
        heroes: ["Miya", "Harith", "Balmond"],
        price: 95000,
        status: "Ready",
        seller: "Raka Market",
        description: "Cocok untuk pemain yang ingin naik rank dengan akun stabil.",
    },
    {
        id: "ff-002",
        game: "Free Fire",
        title: "Diamond Collector Account",
        rank: "Grandmaster",
        skins: 40,
        heroes: ["Kelly", "Moco", "Jota"],
        price: 220000,
        status: "Pending",
        seller: "KlanX",
        description: "Akun dengan koleksi skin premium dan performa bagus.",
    },
    {
        id: "ml-003",
        game: "Mobile Legends",
        title: "Pro Support Bundle",
        rank: "Legend",
        skins: 35,
        heroes: ["Mathilda", "Angela", "Estes"],
        price: 300000,
        status: "Ready",
        seller: "PixelTrade",
        description: "Ideal untuk pemain yang fokus pada role support dan gameplay aman.",
    },
    {
        id: "ff-003",
        game: "Free Fire",
        title: "Battle Ready FF Account",
        rank: "Master",
        skins: 22,
        heroes: ["Alok", "Moco", "Wukong"],
        price: 140000,
        status: "Ready",
        seller: "Vio Store",
        description: "Akun dengan performa bagus untuk mode ranked dan classic.",
    },
];

export const featuredStats = [
    { label: "Akun Terjual", value: "1.2K+" },
    { label: "User Aktif", value: "850+" },
    { label: "Transaksi Aman", value: "98%" },
    { label: "Admin Verifikasi", value: "24/7" },
];

export const categories = [
    "Semua",
    "Mobile Legends",
    "Free Fire",
    "Rank Tinggi",
    "Harga Rendah",
];
