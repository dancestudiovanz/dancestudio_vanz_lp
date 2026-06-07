/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppPage = 'home' | 'terms' | 'tokusho' | 'privacy' | 'member-board';

export function pageFromHash(): AppPage {
  const hash = window.location.hash;
  if (hash === '#terms') return 'terms';
  if (hash === '#tokusho') return 'tokusho';
  if (hash === '#privacy') return 'privacy';
  if (hash === '#member-board') return 'member-board';
  return 'home';
}

export function navigateApp(page: AppPage) {
  if (page === 'home') {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    window.scrollTo(0, 0);
    return;
  }
  window.location.hash = page;
  window.scrollTo(0, 0);
}

/** @deprecated navigateApp を使用してください */
export const navigateLegal = navigateApp;

/** @deprecated AppPage を使用してください */
export type LegalPage = AppPage;
