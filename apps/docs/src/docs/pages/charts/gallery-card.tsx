// Cards of the chart gallery demos: a localized caption linking to the
// chart's page and a fixed-height thumbnail (the charts use height="100%").
// The thumbnail is mounted only while its card is near the viewport: the
// gallery shows dozens of live charts, and each GPU chart holds its own
// WebGPU / WebGL context, which browsers limit (about 16 WebGL contexts).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  TextLink,
} from "minerva-design";

/** Responsive grid: as many 240 px columns as fit, one on narrow screens */
export function GalleryGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

/** `true` while the element is within 400 px of the viewport */
function useNearViewport() {
  const ref = useRef<HTMLDivElement>(null);
  // without IntersectionObserver (old browsers, tests) everything is mounted
  const [near, setNear] = useState(
    () => typeof IntersectionObserver !== "function",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(
      (entries) => setNear(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "400px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, near] as const;
}

export function GalleryCard({
  title,
  page,
  component,
  description,
  children,
}: {
  /** Localized name of the chart type */
  title: string;
  /** Id of the docs page (its route) */
  page: string;
  /** Component name, shown in code style */
  component: string;
  /** Localized use case */
  description: string;
  /** The chart, with height="100%" */
  children: ReactNode;
}) {
  const [ref, near] = useNearViewport();
  return (
    <Card padding="small" style={{ minWidth: 0 }}>
      <CardHeader>
        <CardTitle>
          <TextLink asChild>
            <Link to={`/${page}`}>{title}</Link>
          </TextLink>
        </CardTitle>
        <CardDescription>
          <code>{component}</code> · {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={ref} style={{ height: 180, minWidth: 0 }}>
          {near ? (
            children
          ) : (
            <Skeleton variant="rounded" decorative width="100%" height="100%" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
