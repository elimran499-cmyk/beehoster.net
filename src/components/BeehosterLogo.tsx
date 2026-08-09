import React from 'react';

/* The bee on its own, monochrome, for badges and watermarks. Takes its colour
   from `currentColor` so it can sit on any surface. */
export const BeeGlyph: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = 'w-4 h-4',
  ...props
}) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true" focusable="false" {...props}>
    <ellipse cx="17" cy="27" rx="11" ry="6.4" transform="rotate(-22 17 27)" opacity="0.5" />
    <ellipse cx="47" cy="27" rx="11" ry="6.4" transform="rotate(22 47 27)" opacity="0.5" />
    <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none">
      <path d="M28.5 12.5c-1.8-1.6-3.6-2.2-5.4-1.9" />
      <path d="M35.5 12.5c1.8-1.6 3.6-2.2 5.4-1.9" />
    </g>
    <circle cx="32" cy="17.5" r="6" />
    <circle cx="32" cy="37" r="12.5" />
  </svg>
);

/* BEEHOSTER mark — a bee carrying a power symbol, set in a honeycomb badge.
   Same construction as the reference art, recoloured into the site's palette:
   deep plum badge, ember-to-gold bee, warm cream outlines. Vectors, so it
   stays crisp from the 24px rail icon up to the footer lockup. */
export const BeehosterLogo: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = 'w-8 h-8',
  ...props
}) => {
  /* The mark renders several times per page (rail, top bar, footer). Shared
     gradient ids would all resolve to whichever copy the browser saw first,
     which is how the badge ended up painting empty in some places — so each
     instance gets its own. */
  const uid = React.useId().replace(/:/g, '');
  const badgeId = `bh-badge-${uid}`;
  const goldId = `bh-gold-${uid}`;

  return (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false" {...props}>
    <defs>
      <linearGradient id={badgeId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#33121F" />
        <stop offset="100%" stopColor="#14070F" />
      </linearGradient>
      <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFE3A3" />
        <stop offset="52%" stopColor="#FFD166" />
        <stop offset="100%" stopColor="#FF9A2E" />
      </linearGradient>
    </defs>

    {/* Badge — a honeycomb cell rather than a rounded square, so the mark reads
        as hive at any size. Solid plate first so it's never see-through against
        the panels it sits on, gradient on top for depth. The rounded linejoin
        softens the six corners without needing arc geometry. */}
    <polygon points="32,3 57.12,17.5 57.12,46.5 32,61 6.88,46.5 6.88,17.5" fill="#1A0912" strokeLinejoin="round" />
    <polygon
      points="32,3 57.12,17.5 57.12,46.5 32,61 6.88,46.5 6.88,17.5"
      fill={`url(#${badgeId})`}
      stroke="#FF5C3A"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* Honeycomb ring */}
    <g stroke="#FF9A2E" strokeWidth="1.6" fill="none" opacity="0.75">
      <polygon points="14,22 18,19.5 22,22 22,27 18,29.5 14,27" />
      <polygon points="42,22 46,19.5 50,22 50,27 46,29.5 42,27" />
      <polygon points="12,33 16,30.5 20,33 20,38 16,40.5 12,38" />
      <polygon points="44,33 48,30.5 52,33 52,38 48,40.5 44,38" />
      <polygon points="24,45 28,42.5 32,45 32,50 28,52.5 24,50" />
      <polygon points="32,45 36,42.5 40,45 40,50 36,52.5 32,50" />
    </g>

    {/* Wings */}
    <g fill={`url(#${goldId})`} stroke="#FFEBD1" strokeWidth="1.4">
      <ellipse cx="17" cy="27" rx="11" ry="6.4" transform="rotate(-22 17 27)" />
      <ellipse cx="47" cy="27" rx="11" ry="6.4" transform="rotate(22 47 27)" />
    </g>

    {/* Antennae */}
    <g stroke="#FFEBD1" strokeWidth="1.6" strokeLinecap="round" fill="none">
      <path d="M28.5 12.5c-1.8-1.6-3.6-2.2-5.4-1.9" />
      <path d="M35.5 12.5c1.8-1.6 3.6-2.2 5.4-1.9" />
    </g>

    {/* Head */}
    <circle cx="32" cy="17.5" r="6" fill={`url(#${goldId})`} stroke="#FFEBD1" strokeWidth="1.6" />

    {/* Body carrying the power symbol */}
    <circle cx="32" cy="37" r="12.5" fill={`url(#${goldId})`} stroke="#FFEBD1" strokeWidth="1.8" />
    <path d="M25.6 32.4a8 8 0 1 0 12.8 0" fill="none" stroke="#14070F" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M32 26.5v10" fill="none" stroke="#14070F" strokeWidth="3.2" strokeLinecap="round" />
  </svg>
  );
};
