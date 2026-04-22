import { useEffect, useState } from 'react';

/**
 * Banner de consentimento de cookies com Google Consent Mode v2.
 * - Default ANTES de qualquer interação: analytics/ads = denied (reforçado no script inline
 *   do index.astro antes do mount do banner, pra garantir que qualquer tag carregada
 *   respeite os defaults mesmo antes de o React hidratar).
 * - Persistência: cookie `ws_consent` por 12 meses.
 * - Link "Gerenciar cookies" no rodapé reabre o modal.
 */

type ConsentCategories = {
  analytics: boolean;
  ads: boolean;
};

type ConsentRecord = ConsentCategories & {
  ts: number;
  version: 1;
};

const COOKIE_NAME = 'ws_consent';
const COOKIE_DAYS = 365;

function setCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1] ?? '') : null;
}

function pushConsent(c: ConsentCategories) {
  // Usa a gtag se já existir (quando GA4/GTM estiverem integrados na Fase 5).
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  const gtag: (...args: unknown[]) => void =
    w.gtag ||
    function () {
      // eslint-disable-next-line prefer-rest-params
      (w.dataLayer as unknown[]).push(arguments);
    };
  w.gtag = gtag;

  gtag('consent', 'update', {
    analytics_storage: c.analytics ? 'granted' : 'denied',
    ad_storage: c.ads ? 'granted' : 'denied',
    ad_user_data: c.ads ? 'granted' : 'denied',
    ad_personalization: c.ads ? 'granted' : 'denied',
  });
}

function saveConsent(c: ConsentCategories) {
  const record: ConsentRecord = { ...c, ts: Date.now(), version: 1 };
  setCookie(COOKIE_NAME, JSON.stringify(record), COOKIE_DAYS);
  pushConsent(c);
}

function readConsent(): ConsentRecord | null {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed && typeof parsed.analytics === 'boolean') return parsed;
  } catch {
    return null;
  }
  return null;
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setOpen(true);
    } else {
      // Reaplica o consentimento salvo (caso o tag seja carregado em page view subsequente).
      pushConsent(existing);
      setAnalytics(existing.analytics);
      setAds(existing.ads);
    }

    // Abrir via link "Gerenciar cookies" no rodapé.
    const handlers: EventListener[] = [];
    document
      .querySelectorAll<HTMLElement>('[data-open-cookie-preferences]')
      .forEach((el) => {
        const h: EventListener = (e) => {
          e.preventDefault();
          const cur = readConsent();
          if (cur) {
            setAnalytics(cur.analytics);
            setAds(cur.ads);
          }
          setOpen(true);
          setCustomOpen(true);
        };
        el.addEventListener('click', h);
        handlers.push(h);
      });
    return () => {
      document
        .querySelectorAll<HTMLElement>('[data-open-cookie-preferences]')
        .forEach((el, i) => {
          const h = handlers[i];
          if (h) el.removeEventListener('click', h);
        });
    };
  }, []);

  if (!open) return null;

  const acceptAll = () => {
    saveConsent({ analytics: true, ads: true });
    setOpen(false);
    setCustomOpen(false);
  };

  const rejectAll = () => {
    saveConsent({ analytics: false, ads: false });
    setOpen(false);
    setCustomOpen(false);
  };

  const saveCustom = () => {
    saveConsent({ analytics, ads });
    setOpen(false);
    setCustomOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-[60] mx-auto max-w-3xl p-4 sm:bottom-4"
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl md:p-6">
        {!customOpen ? (
          <>
            <h2 id="cookie-banner-title" className="text-base font-semibold text-navy md:text-lg">
              Sua privacidade
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Usamos cookies para melhorar sua experiência e entender como o site é usado.
              Você pode aceitar, rejeitar ou personalizar.{' '}
              <a
                href="/politica-de-privacidade"
                className="font-semibold text-cyan-600 underline-offset-2 hover:underline"
              >
                Política de privacidade
              </a>
              .
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setCustomOpen(true)}
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-cyan-500 hover:text-cyan-600"
              >
                Personalizar
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-cyan-500 hover:text-cyan-600"
              >
                Rejeitar
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-cyan-600"
              >
                Aceitar todos
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id="cookie-banner-title" className="text-base font-semibold text-navy md:text-lg">
              Preferências de cookies
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Controle quais categorias podem ser usadas. Cookies essenciais são
              obrigatórios para o funcionamento do site.
            </p>

            <ul className="mt-5 space-y-3">
              <li className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-semibold text-navy">Cookies necessários</p>
                  <p className="mt-1 text-xs text-slate-600">
                    Essenciais para o funcionamento do site.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-300 px-3 py-1 text-xs font-semibold text-slate-700">
                  Sempre ativos
                </span>
              </li>
              <li className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-navy">Cookies analíticos</p>
                  <p className="mt-1 text-xs text-slate-600">
                    Google Analytics 4 — entender como o site é usado (agregado e anonimizado).
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    aria-label="Ativar cookies analíticos"
                  />
                  <span className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-cyan-500 peer-focus-visible:ring-4 peer-focus-visible:ring-cyan-300"></span>
                  <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"></span>
                </label>
              </li>
              <li className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-navy">Cookies de marketing</p>
                  <p className="mt-1 text-xs text-slate-600">
                    Google Ads — medição de conversões e exibição de anúncios relevantes.
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={ads}
                    onChange={(e) => setAds(e.target.checked)}
                    aria-label="Ativar cookies de marketing"
                  />
                  <span className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-cyan-500 peer-focus-visible:ring-4 peer-focus-visible:ring-cyan-300"></span>
                  <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"></span>
                </label>
              </li>
            </ul>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-cyan-500 hover:text-cyan-600"
              >
                Rejeitar todos
              </button>
              <button
                type="button"
                onClick={saveCustom}
                className="rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-cyan-600"
              >
                Salvar preferências
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
