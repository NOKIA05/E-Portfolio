export default function Background() {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
        }}>
            {Array.from({ length: 40 }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: `${(i * 2.5) % 96 + 2}%`,
                        top: `${(i * 7.3) % 90 + 2}%`,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'white',
                        opacity: 0.8,
                        boxShadow: '0 0 8px 2px rgba(255,255,255,0.9)',
                    }}
                />
            ))}
        </div>
    )
}
