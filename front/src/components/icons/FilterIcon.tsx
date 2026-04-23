export default function FilterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <line x1="2" y1="4" x2="14" y2="4" />
      <line x1="4" y1="8" x2="12" y2="8" />
      <line x1="6" y1="12" x2="10" y2="12" />
    </svg>
  );
}
