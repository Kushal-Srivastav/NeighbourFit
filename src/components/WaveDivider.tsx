// A wavy SVG divider for section transitions
export default function WaveDivider({ color = '#1e293b', flip = false }: { color?: string, flip?: boolean }) {
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
        <path
          d="M0,80 C360,160 1080,0 1440,80 L1440,100 L0,100 Z"
          fill={color}
          fillOpacity="1"
        />
      </svg>
    </div>
  );
}
