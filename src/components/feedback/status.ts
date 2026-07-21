import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

/**
 * Shared status vocabulary for feedback components (Bible §11, Sprint 02 §08).
 *
 * Info / success / warning / error each carry an icon AND a colour token, so
 * meaning is never communicated by colour alone. Alert, Toast and the status
 * states all read from this single table — one place defines the mapping.
 */
export type Status = 'info' | 'success' | 'warning' | 'error';

export interface StatusStyle {
  icon: LucideIcon;
  /** Text/icon accent colour class. */
  accent: string;
  /** Subtle tinted surface class. */
  surface: string;
  /** Left datum-rule / border colour class. */
  border: string;
}

export const STATUS: Record<Status, StatusStyle> = {
  info: {
    icon: Info,
    accent: 'text-info',
    surface: 'bg-surface',
    border: 'border-info',
  },
  success: {
    icon: CheckCircle2,
    accent: 'text-success',
    surface: 'bg-surface',
    border: 'border-success',
  },
  warning: {
    icon: AlertTriangle,
    accent: 'text-warning',
    surface: 'bg-surface',
    border: 'border-warning',
  },
  error: {
    icon: XCircle,
    accent: 'text-danger',
    surface: 'bg-surface',
    border: 'border-danger',
  },
};
