// Background.jsx — the ambient canvas behind every page.
// Three layers, all pure CSS (no per-frame JS, so it stays cheap on mobile):
//   1. a faint dot grid
//   2. two slow-drifting aurora blobs
//   3. a vignette that darkens the edges so content stays readable
// To retune the mood, change the two rgba colors in the `blobs` below.

const blobs = [
  {
    color: 'rgba(209, 142, 63, 0.26)', // amber
    size: 620,
    top: '-14%',
    left: '-8%',
    duration: '22s',
    delay: '0s',
  },
  {
    color: 'rgba(184, 92, 56, 0.14)', // copper
    size: 520,
    top: '28%',
    left: '72%',
    duration: '28s',
    delay: '-8s',
  },
]

function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0c0a08]"
    >
      {/* 1. Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.055) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 85% 65% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 65% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />

      {/* 2. Aurora blobs */}
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 68%)`,
            filter: 'blur(70px)',
            animation: `drift ${b.duration} ease-in-out ${b.delay} infinite`,
          }}
        />
      ))}

      {/* 3. Scanlines — faint horizontal CRT lines, static (reduced-motion safe) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.16) 0px, rgba(0,0,0,0.16) 1px, transparent 1px, transparent 3px)',
          opacity: 0.35,
          mixBlendMode: 'multiply',
        }}
      />

      {/* 4. Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 70% at 50% 0%, transparent 30%, rgba(8,6,5,0.75) 100%)',
        }}
      />
    </div>
  )
}

export default Background
