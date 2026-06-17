export default function AnimeHero() {
    return (
        <svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
        >
            <defs>
                <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
                </linearGradient>
                <radialGradient id="glowEffect">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Background glow */}
            <circle cx="200" cy="180" r="150" fill="url(#glowEffect)" />

            {/* Head */}
            <circle cx="200" cy="120" r="45" fill="#f5d9b8" stroke="#06b6d4" strokeWidth="2" />

            {/* Hair */}
            <path
                d="M 160 100 Q 155 70 200 60 Q 245 70 240 100"
                fill="#1f2937"
                stroke="#06b6d4"
                strokeWidth="1.5"
            />

            {/* Eyes with glow */}
            <g>
                {/* Left eye */}
                <circle cx="185" cy="115" r="8" fill="#06b6d4" />
                <circle cx="187" cy="113" r="3" fill="#ffffff" />

                {/* Right eye */}
                <circle cx="215" cy="115" r="8" fill="#2563eb" />
                <circle cx="217" cy="113" r="3" fill="#ffffff" />
            </g>

            {/* Smile */}
            <path
                d="M 190 135 Q 200 142 210 135"
                stroke="#06b6d4"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />

            {/* Neck */}
            <rect x="190" y="160" width="20" height="15" fill="#f5d9b8" />

            {/* Upper body - Gaming outfit */}
            <path
                d="M 165 175 L 160 220 L 240 220 L 235 175 Q 200 165 165 175"
                fill="#1e293b"
                stroke="#06b6d4"
                strokeWidth="2"
            />

            {/* Chest accent */}
            <circle cx="200" cy="195" r="12" fill="#06b6d4" opacity="0.4" />
            <circle cx="200" cy="195" r="8" fill="none" stroke="#06b6d4" strokeWidth="1.5" />

            {/* Left arm */}
            <path
                d="M 165 180 Q 130 190 120 240"
                stroke="#f5d9b8"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
            />

            {/* Left hand - holding controller */}
            <circle cx="115" cy="245" r="12" fill="#f5d9b8" stroke="#06b6d4" strokeWidth="1.5" />

            {/* Controller in left hand */}
            <g>
                <rect x="105" y="240" width="25" height="15" rx="3" fill="#334155" stroke="#06b6d4" strokeWidth="1" />
                <circle cx="112" cy="247" r="2" fill="#06b6d4" />
                <circle cx="120" cy="247" r="2" fill="#06b6d4" />
            </g>

            {/* Right arm */}
            <path
                d="M 235 180 Q 270 190 280 240"
                stroke="#f5d9b8"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
            />

            {/* Right hand - holding controller */}
            <circle cx="285" cy="245" r="12" fill="#f5d9b8" stroke="#2563eb" strokeWidth="1.5" />

            {/* Controller in right hand */}
            <g>
                <rect x="275" y="240" width="25" height="15" rx="3" fill="#334155" stroke="#2563eb" strokeWidth="1" />
                <circle cx="282" cy="247" r="2" fill="#2563eb" />
                <circle cx="290" cy="247" r="2" fill="#2563eb" />
            </g>

            {/* Lower body */}
            <path
                d="M 175 220 L 170 280 L 185 285 L 185 220"
                fill="#2d3748"
                stroke="#06b6d4"
                strokeWidth="1"
            />

            <path
                d="M 225 220 L 230 280 L 215 285 L 215 220"
                fill="#2d3748"
                stroke="#06b6d4"
                strokeWidth="1"
            />

            {/* Shoes */}
            <ellipse cx="177.5" cy="290" rx="10" ry="8" fill="#1f2937" stroke="#06b6d4" strokeWidth="1" />
            <ellipse cx="217.5" cy="290" rx="10" ry="8" fill="#1f2937" stroke="#06b6d4" strokeWidth="1" />

            {/* Energy effects around character */}
            <g opacity="0.6" stroke="#06b6d4" strokeWidth="2" fill="none">
                <circle cx="110" cy="120" r="15" strokeDasharray="5,5" />
                <circle cx="290" cy="140" r="20" strokeDasharray="5,5" />
            </g>

            {/* Glowing particles */}
            <g fill="#06b6d4" opacity="0.7">
                <circle cx="140" cy="100" r="2" />
                <circle cx="260" cy="110" r="2.5" />
                <circle cx="150" cy="280" r="1.5" />
                <circle cx="250" cy="270" r="2" />
                <circle cx="100" cy="200" r="1.5" />
                <circle cx="300" cy="190" r="2" />
            </g>

            {/* Text badge */}
            <rect x="130" y="330" width="140" height="35" rx="8" fill="#06b6d4" opacity="0.15" stroke="#06b6d4" strokeWidth="1.5" />
            <text
                x="200"
                y="355"
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#06b6d4"
                fontFamily="Arial, sans-serif"
            >
                Gaming Ready
            </text>
        </svg>
    );
}
