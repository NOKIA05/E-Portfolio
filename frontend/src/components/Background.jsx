// Background.jsx - Aurora ribbons: flowing amber/gold/teal bands behind the content.

// vignette stay from the original design.
function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0b0908]"
    >
      {/* Dot grid (original) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 85% 65% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 65% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />

      {/* Aurora ribbons */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.9 }}
      >
        <defs>
          <linearGradient id="rb1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e0923c" stopOpacity="0" />
            <stop offset=".5" stopColor="#e0923c" stopOpacity=".5" />
            <stop offset="1" stopColor="#e0923c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rb2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#43a08a" stopOpacity="0" />
            <stop offset=".5" stopColor="#43a08a" stopOpacity=".35" />
            <stop offset="1" stopColor="#43a08a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rb3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffd9a0" stopOpacity="0" />
            <stop offset=".5" stopColor="#ffd9a0" stopOpacity=".28" />
            <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
          </linearGradient>
          <filter id="rbsoft">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>
        <path
          d="M-100,230 C300,110 700,350 1540,130 L1540,250 C700,470 300,230 -100,350 Z"
          fill="url(#rb1)"
          filter="url(#rbsoft)"
        />
        <path
          d="M-100,430 C400,310 900,530 1540,330 L1540,420 C900,620 400,400 -100,520 Z"
          fill="url(#rb2)"
          filter="url(#rbsoft)"
        />
        <path
          d="M-100,110 C500,30 900,170 1540,50 L1540,110 C900,230 500,90 -100,170 Z"
          fill="url(#rb3)"
          filter="url(#rbsoft)"
        />
      </svg>

      {/* Scanlines (original) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.16) 0px, rgba(0,0,0,0.16) 1px, transparent 1px, transparent 3px)',
          opacity: 0.3,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Vignette (original) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 70% at 50% 0%, transparent 30%, rgba(8,6,5,0.7) 100%)',
        }}
      />
    </div>
  )
}

export default Background
