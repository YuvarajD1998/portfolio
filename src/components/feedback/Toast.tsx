'use client';

import * as RadixToast from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { STATUS, type Status } from '@/components/feedback/status';
import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * Toast — a transient, dismissible notification (Bible §13, Sprint 02 §08).
 *
 * Purpose:      Surface a short-lived confirmation or error at the edge of the
 *               screen, on Radix Toast for focus + dismissal behaviour.
 * Public API:   <ToastProvider>, `useToast()` → `toast({ status, title, … })`.
 * Props:        toast opts — status, title, description, duration.
 * Variants:     status — info | success | warning | error (shared vocabulary;
 *               icon + text, never colour alone).
 * States:       enter · auto-dismiss (duration) · swipe/close dismiss.
 * A11y:         Radix supplies the live-region semantics, swipe-to-dismiss and
 *               focus handling; our close button carries a required label.
 * Responsive:   Viewport pins bottom-right on desktop, full-width bottom on
 *               mobile; toasts stack.
 * Composition:  Mount <ToastProvider> once near the app root; call `toast()`
 *               from anywhere beneath it. Behaviour is Radix's; styling ours.
 */
export interface ToastOptions {
  status?: Status;
  title: ReactNode;
  description?: ReactNode;
  /** Auto-dismiss delay in ms. Default 5000. */
  duration?: number;
}

interface ToastEntry extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const nextId = useRef(0);

  const toast = useCallback((opts: ToastOptions) => {
    const id = (nextId.current += 1);
    setToasts((list) => [...list, { id, ...opts }]);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        {toasts.map((t) => {
          const s = STATUS[t.status ?? 'info'];
          return (
            <RadixToast.Root
              key={t.id}
              duration={t.duration ?? 5000}
              onOpenChange={(open) => {
                if (!open) remove(t.id);
              }}
              className={cn(
                'bg-paper border-hairline shadow-e2 flex items-start gap-3 rounded-md border border-l-2 p-4',
                s.border,
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[swipe=end]:animate-out',
              )}
            >
              <Icon icon={s.icon} className={cn('mt-0.5', s.accent)} />
              <div className="min-w-0 flex-1">
                <RadixToast.Title className="text-ink text-small font-sans font-semibold">
                  {t.title}
                </RadixToast.Title>
                {t.description ? (
                  <RadixToast.Description className="text-graphite text-small mt-1">
                    {t.description}
                  </RadixToast.Description>
                ) : null}
              </div>
              <RadixToast.Close
                aria-label="Dismiss notification"
                className="text-mute hover:text-ink -mt-2 -mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm transition-colors"
              >
                <Icon icon={X} size="sm" />
              </RadixToast.Close>
            </RadixToast.Root>
          );
        })}
        <RadixToast.Viewport
          className={cn(
            'z-toast fixed right-0 bottom-0 m-4 flex w-full max-w-sm flex-col gap-2 outline-none',
          )}
        />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}

/** Access the toast dispatcher. Throws outside a ToastProvider — a wiring bug. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider.');
  }
  return ctx;
}
