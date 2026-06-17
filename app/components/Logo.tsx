export default function Logo() {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
            </defs>

            {/* Shield background */}
            <path
                d="M16 2L4 8V16C4 24 16 30 16 30C16 30 28 24 28 16V8L16 2Z"
                fill="url(#logoGradient)"
                opacity="0.2"
                stroke="url(#logoGradient)"
                strokeWidth="1.5"
            />

            {/* Game controller shape - stylized C */}
            <g fill="url(#logoGradient)">
                {/* Left circle */}
                <circle cx="10" cy="16" r="2.5" />
                {/* Right circles */}
                <circle cx="20" cy="13" r="1.8" />
                <circle cx="23" cy="16" r="1.8" />
                <circle cx="20" cy="19" r="1.8" />
            </g>

            {/* Center accent line */}
            <line
                x1="16"
                y1="10"
                x2="16"
                y2="22"
                stroke="url(#logoGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}
