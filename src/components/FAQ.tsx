import { useState, useRef, useEffect } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  items: readonly FaqItem[];
}

export default function FAQ({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((current) => (current === i ? null : i));
  };

  return (
    <ul className="mt-10 space-y-3" role="list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-btn-${i}`;
        return (
          <li
            key={item.q}
            className={`overflow-hidden rounded-xl border bg-white transition ${
              isOpen
                ? 'border-cyan-300 shadow-md'
                : 'border-slate-200 hover:border-cyan-200'
            }`}
          >
            <button
              id={btnId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 md:px-6"
            >
              <span className="text-base md:text-lg">{item.q}</span>
              <span
                aria-hidden="true"
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-500/10 text-cyan-600 transition-transform duration-300 ${
                  isOpen ? 'rotate-45 bg-cyan-500 text-white' : ''
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
            <AnimatedPanel id={panelId} labelledBy={btnId} open={isOpen}>
              <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 md:px-6 md:pb-6 md:text-base">
                {item.a}
              </p>
            </AnimatedPanel>
          </li>
        );
      })}
    </ul>
  );
}

function AnimatedPanel({
  id,
  labelledBy,
  open,
  children,
}: {
  id: string;
  labelledBy: string;
  open: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | 'auto'>(0);

  useEffect(() => {
    if (!ref.current) return;
    if (open) {
      setHeight(ref.current.scrollHeight);
      const t = setTimeout(() => setHeight('auto'), 260);
      return () => clearTimeout(t);
    } else {
      if (ref.current) setHeight(ref.current.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [open]);

  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      hidden={!open && height === 0}
      style={{
        height: height === 'auto' ? 'auto' : `${height}px`,
        overflow: 'hidden',
        transition: 'height 240ms ease',
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}
