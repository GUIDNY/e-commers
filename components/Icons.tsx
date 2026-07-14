import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function TentIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 4 3 20h18L12 4Z" />
      <path d="M8.5 20 12 11l3.5 9" />
      <path d="M3 20h18" />
    </Base>
  );
}

export function ShowerIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 9a6 6 0 0 1 11.3-2.8" />
      <circle cx="16" cy="8" r="2.4" />
      <path d="M4 13h16" />
      <path d="M6 17v2M10 17v2M14 17v2M18 17v2" />
    </Base>
  );
}

export function LanternIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 3h6M10 3v2.5h4V3" />
      <rect x="7" y="5.5" width="10" height="12" rx="3" />
      <path d="M12 8.5v5" />
      <path d="M10 21h4" />
    </Base>
  );
}

export function StoveIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <circle cx="8" cy="16.5" r="1.6" />
      <circle cx="16" cy="16.5" r="1.6" />
      <path d="M8 13c0-2 1-2.5 1-4.5S8 6 8 6M16 13c0-2 1-2.5 1-4.5S16 6 16 6" />
    </Base>
  );
}

export function PillowIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 9c0-2.5 2-4 4-3 1-1.5 3-1.5 4 0 2-1 5 0 5 3.5s-2 6-6.5 6S4 13 4 9Z" />
    </Base>
  );
}

export function PowerBankIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M10 3V1.5h4V3" />
      <path d="m13 8-3 4h3l-3 4" />
    </Base>
  );
}

export function HammockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 6v14M21 6v14" />
      <path d="M3 8c3 4 15 4 18 0" />
      <path d="M3 8c3 5 15 5 18 0" opacity={0.5} />
    </Base>
  );
}

export function HeadlampIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M4 12a8 8 0 0 1 4-7M20 12a8 8 0 0 0-4-7" />
      <path d="M12 5V3" />
    </Base>
  );
}

export function ChairIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 4v9M18 8v5" />
      <path d="M6 13h12l-2 7H8l-2-7Z" />
      <path d="M6 4h6" />
    </Base>
  );
}

export function WaterFilterIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 6 12a6 6 0 1 0 12 0L12 3Z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
    </Base>
  );
}

export function SleepingPadIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="8" width="18" height="8" rx="4" />
      <path d="M7 8v8M11 8v8M15 8v8" opacity={0.6} />
    </Base>
  );
}

export function BugLanternIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="7" y="5" width="10" height="12" rx="3" />
      <path d="M10 2.5 12 5l2-2.5" />
      <path d="m4 5 2 2M20 5l-2 2M4 19l2-2M20 19l-2-2" />
    </Base>
  );
}

export function GrillIcon(props: IconProps) {
  return (
    <Base {...props}>
      <ellipse cx="12" cy="9" rx="8" ry="3" />
      <path d="M4 9v3a8 3 0 0 0 16 0V9" />
      <path d="M8 15v4M16 15v4M6 19h12" />
    </Base>
  );
}

export function CookwareIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 11h16v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-2Z" />
      <path d="M2 11h1M21 11h1" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Base>
  );
}

export function MultiToolIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="10" width="14" height="4" rx="1" />
      <path d="M5 12H3M21 12h-2" />
      <path d="M8 10V6a1 1 0 0 1 1-1h1M16 10V6a1 1 0 0 0-1-1h-1" />
    </Base>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
      <path d="M2.5 3h2l2.4 12.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6" />
    </Base>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2 7h11v9H2z" />
      <path d="M13 10h4l4 3v3h-8z" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </Base>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 20c8 0 16-6 16-16C11 4 4 12 4 20Z" />
      <path d="M6 18c4-4 8-7 12-11" />
    </Base>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5 12 5 5 9-9" />
    </Base>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M10 11v6M14 11v6" />
    </Base>
  );
}

export function BoxIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m3.5 7 8.5-4 8.5 4-8.5 4-8.5-4Z" />
      <path d="M3.5 7v10l8.5 4 8.5-4V7" />
      <path d="M12 11v10" />
    </Base>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  );
}

export const CATEGORY_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  shower: ShowerIcon,
  lantern: LanternIcon,
  stove: StoveIcon,
  pillow: PillowIcon,
  "power-bank": PowerBankIcon,
  hammock: HammockIcon,
  headlamp: HeadlampIcon,
  chair: ChairIcon,
  "water-filter": WaterFilterIcon,
  "sleeping-pad": SleepingPadIcon,
  "bug-lantern": BugLanternIcon,
  grill: GrillIcon,
  cookware: CookwareIcon,
  "multi-tool": MultiToolIcon,
};

export function ProductIcon({ icon, ...props }: { icon: string } & IconProps) {
  const Comp = CATEGORY_ICONS[icon] ?? TentIcon;
  return <Comp {...props} />;
}
