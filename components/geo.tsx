import { cn } from "@/lib/utils";

// Palette keys map onto the event's theme variables so the shapes follow
// whatever colours the CMS defines.
const COLORS = {
  orange: "var(--event-primary-bg)",
  blue: "var(--event-secondary-bg)",
  ink: "var(--event-tertiary-bg)",
  sand: "var(--event-accent-bg)",
  cream: "var(--event-base-bg)",
} as const;

type Color = keyof typeof COLORS;

type Tile = {
  bg: Color;
  shapes: React.ReactNode;
};

const fill = (c: Color) => COLORS[c];

// Hungarian-poster style tiles: one bold geometric idea per square.
const TILES: Tile[] = [
  {
    bg: "sand",
    shapes: <path d="M0 100V0a100 100 0 0 1 100 100Z" fill={fill("orange")} />,
  },
  {
    bg: "cream",
    shapes: <circle cx="50" cy="50" r="38" fill={fill("blue")} />,
  },
  {
    bg: "orange",
    shapes: <path d="M0 50a50 50 0 0 1 100 0Z" fill={fill("ink")} />,
  },
  {
    bg: "blue",
    shapes: <path d="M0 100 50 12l50 88Z" fill={fill("sand")} />,
  },
  {
    bg: "cream",
    shapes: (
      <g fill={fill("orange")}>
        <rect y="8" width="100" height="16" />
        <rect y="42" width="100" height="16" />
        <rect y="76" width="100" height="16" />
      </g>
    ),
  },
  {
    bg: "ink",
    shapes: (
      <>
        <circle cx="50" cy="50" r="44" fill={fill("orange")} />
        <circle cx="50" cy="50" r="28" fill={fill("sand")} />
        <circle cx="50" cy="50" r="12" fill={fill("blue")} />
      </>
    ),
  },
  {
    bg: "sand",
    shapes: (
      <>
        <rect width="50" height="100" fill={fill("blue")} />
        <circle cx="50" cy="50" r="30" fill={fill("orange")} />
      </>
    ),
  },
  {
    bg: "orange",
    shapes: <path d="M100 0v100A100 100 0 0 1 0 0Z" fill={fill("cream")} />,
  },
];

export function GeoTile({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const tile = TILES[index % TILES.length];

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={cn("block aspect-square w-full", className)}
    >
      <rect width="100" height="100" fill={fill(tile.bg)} />
      {tile.shapes}
    </svg>
  );
}

// A full-bleed band of tiles, used as a divider between sections.
export function GeoStrip({
  className,
  offset = 0,
}: {
  className?: string;
  offset?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid grid-cols-4 overflow-hidden sm:grid-cols-6 lg:grid-cols-8",
        className,
      )}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <GeoTile
          key={i}
          index={i + offset}
          className={cn(i > 3 && "max-sm:hidden", i > 5 && "max-lg:hidden")}
        />
      ))}
    </div>
  );
}
