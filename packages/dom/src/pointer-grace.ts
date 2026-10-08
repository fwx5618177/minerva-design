/** A point in client (viewport) coordinates. */
export interface Point {
  x: number;
  y: number;
}

/** A closed polygon (the last point connects back to the first). */
export type Polygon = Point[];

/** Side of the exit point on which the target (e.g. the submenu) lies. */
export type GraceSide = "top" | "right" | "bottom" | "left";

/** Rectangle in client coordinates (a `DOMRect` works). */
export interface GraceRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Ray-casting point-in-polygon test (points exactly on an edge may go
 * either way).
 */
export function isPointInPolygon(point: Point, polygon: Polygon): boolean {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * The "safe triangle" between the point where the pointer left a trigger
 * (e.g. a submenu item) and the target rectangle (the submenu): a polygon
 * from the exit point (pushed back by `padding` px so it is strictly
 * inside) to the near and far edges of the target.
 */
export function getGraceArea(
  exitPoint: Point,
  rect: GraceRect,
  side: GraceSide,
  padding = 5,
): Polygon {
  switch (side) {
    case "right":
      return [
        { x: exitPoint.x - padding, y: exitPoint.y },
        { x: rect.left, y: rect.top },
        { x: rect.right, y: rect.top },
        { x: rect.right, y: rect.bottom },
        { x: rect.left, y: rect.bottom },
      ];
    case "left":
      return [
        { x: exitPoint.x + padding, y: exitPoint.y },
        { x: rect.right, y: rect.top },
        { x: rect.left, y: rect.top },
        { x: rect.left, y: rect.bottom },
        { x: rect.right, y: rect.bottom },
      ];
    case "bottom":
      return [
        { x: exitPoint.x, y: exitPoint.y - padding },
        { x: rect.left, y: rect.top },
        { x: rect.left, y: rect.bottom },
        { x: rect.right, y: rect.bottom },
        { x: rect.right, y: rect.top },
      ];
    case "top":
      return [
        { x: exitPoint.x, y: exitPoint.y + padding },
        { x: rect.left, y: rect.bottom },
        { x: rect.left, y: rect.top },
        { x: rect.right, y: rect.top },
        { x: rect.right, y: rect.bottom },
      ];
  }
}

export interface PointerGraceOptions {
  /** Grace area padding, see `getGraceArea`. @default 5 */
  padding?: number;
  /**
   * The grace area expires after this many ms (the pointer is assumed to
   * have stopped heading to the target). `0` disables expiry. @default 300
   */
  timeout?: number;
}

export interface PointerGrace {
  /** Starts a grace period when the pointer leaves the trigger. */
  start(exitPoint: Point, targetRect: GraceRect, side: GraceSide): void;
  /** Whether `point` is inside the current (non-expired) grace area. */
  isInGraceArea(point: Point): boolean;
  /** Ends the grace period. */
  clear(): void;
  /** Current grace polygon, if any (for debugging / drawing). */
  getArea(): Polygon | null;
}

/**
 * Pointer "grace intent" for submenus: while the pointer travels from a
 * submenu trigger towards the open submenu it may cross sibling items;
 * those should not steal the hover as long as the pointer is inside the
 * safe triangle.
 */
export function createPointerGrace(
  options: PointerGraceOptions = {},
): PointerGrace {
  const { padding = 5, timeout = 300 } = options;
  let area: Polygon | null = null;
  let startedAt = 0;

  const expired = () => timeout > 0 && Date.now() - startedAt > timeout;

  return {
    start(exitPoint, targetRect, side) {
      area = getGraceArea(exitPoint, targetRect, side, padding);
      startedAt = Date.now();
    },
    isInGraceArea(point) {
      if (!area) return false;
      if (expired()) {
        area = null;
        return false;
      }
      return isPointInPolygon(point, area);
    },
    clear() {
      area = null;
    },
    getArea() {
      if (area && expired()) area = null;
      return area;
    },
  };
}
