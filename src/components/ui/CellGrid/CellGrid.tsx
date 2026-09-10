import type { CSSProperties } from "react";
import styles from "./CellGrid.module.css";

export interface Cell {
  number: string;
  label: string;
}

export interface CellGridProps {
  cells: Cell[];
  /** Minimum width before a cell wraps to the next row. */
  minCellWidth?: string;
  /** Display-face label size — the spec uses 19px (Dissect) and 21px (process rows). */
  labelSize?: string;
  className?: string;
}

/**
 * The "rules are drawn on the cells" grid used for Dissect and the
 * process rows — borders on each cell plus a top/left border on the
 * container, so a half-filled final row leaves page ground, not a grey
 * slab (README.md → Home, "Dissect").
 */
export function CellGrid({ cells, minCellWidth = "150px", labelSize = "19px", className }: CellGridProps) {
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minCellWidth}), 1fr))`,
  };

  return (
    <div className={[styles.grid, className].filter(Boolean).join(" ")} style={gridStyle}>
      {cells.map((cell) => (
        <div key={cell.number} className={styles.cell}>
          <div className={`${styles.number} tabular-nums`}>{cell.number}</div>
          <div className={styles.label} style={{ fontSize: labelSize }}>
            {cell.label}
          </div>
        </div>
      ))}
    </div>
  );
}
