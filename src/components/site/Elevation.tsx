/**
 * Self-drawing architectural elevation. Replace with the supplied SVG when
 * available — keep the `elevation-draw` class to retain the drawing animation.
 */
export function Elevation({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 320"
      fill="none"
      aria-hidden="true"
      className={`elevation-draw ${className ?? ""}`}
      stroke="currentColor"
      strokeWidth="1"
    >
      <line x1="0" y1="280" x2="480" y2="280" style={{ ["--dash" as string]: 480 }} />
      <rect x="60" y="120" width="150" height="160" style={{ ["--dash" as string]: 620 }} />
      <rect x="210" y="70" width="120" height="210" style={{ ["--dash" as string]: 660 }} />
      <rect x="330" y="150" width="90" height="130" style={{ ["--dash" as string]: 440 }} />
      <line x1="60" y1="170" x2="210" y2="170" style={{ ["--dash" as string]: 150 }} />
      <line x1="60" y1="220" x2="210" y2="220" style={{ ["--dash" as string]: 150 }} />
      <line x1="240" y1="70" x2="240" y2="280" style={{ ["--dash" as string]: 210 }} />
      <line x1="270" y1="70" x2="270" y2="280" style={{ ["--dash" as string]: 210 }} />
      <line x1="300" y1="70" x2="300" y2="280" style={{ ["--dash" as string]: 210 }} />
      <line x1="330" y1="200" x2="420" y2="200" style={{ ["--dash" as string]: 90 }} />
      <polyline points="40,300 440,300" style={{ ["--dash" as string]: 400 }} />
      <line x1="40" y1="292" x2="40" y2="308" style={{ ["--dash" as string]: 16 }} />
      <line x1="440" y1="292" x2="440" y2="308" style={{ ["--dash" as string]: 16 }} />
    </svg>
  );
}