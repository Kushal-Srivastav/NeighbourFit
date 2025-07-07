// A diagonal SVG divider for section transitions
export default function DiagonalDivider({ color = '#0f172a', flip = false }: { color?: string, flip?: boolean }) {
  return (
    <div style={{ lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 100"
        style={{ display: 'block', transform: flip ? 'scaleY(-1)' : undefined }}
        width="100%"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <polygon
          points="0,100 1440,0 1440,100"
          fill={color}
          fillOpacity="1"
        />
      </svg>
    </div>
  );
}
