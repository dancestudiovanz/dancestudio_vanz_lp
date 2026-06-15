/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problems from './components/Problems';
import Solutions from './components/Solutions';
import Lessons from './components/Lessons';
import Schedule from './components/Schedule';
import Pricing from './components/Pricing';
import Instructors from './components/Instructors';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import TermsOfService from './components/TermsOfService';
import SpecifiedCommercialTransactions from './components/SpecifiedCommercialTransactions';
import PrivacyPolicy from './components/PrivacyPolicy';
import MemberBoard from './components/MemberBoard';
import { AppPage, navigateApp, pageFromHash } from './appNavigation';

export default function App() {
  const [page, setPage] = useState<AppPage>(() => pageFromHash());

  const goToPage = (target: AppPage) => {
    navigateApp(target);
    setPage(target);
  };

  useEffect(() => {
    const syncPage = () => setPage(pageFromHash());
    window.addEventListener('hashchange', syncPage);
    window.addEventListener('popstate', syncPage);
    return () => {
      window.removeEventListener('hashchange', syncPage);
      window.removeEventListener('popstate', syncPage);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (page === 'terms') {
    return <TermsOfService onNavigate={goToPage} />;
  }

  if (page === 'tokusho') {
    return <SpecifiedCommercialTransactions onNavigate={goToPage} />;
  }

  if (page === 'privacy') {
    return <PrivacyPolicy onNavigate={goToPage} />;
  }

  if (page === 'member-board') {
    return <MemberBoard onNavigate={goToPage} />;
  }

  return (
    <div className="min-h-screen flex flex-col antialiased text-slate-800 bg-slate-50 font-sans">
      <Header onNavClick={scrollToSection} onNavigate={goToPage} />

      <main className="flex-1">
        <Hero />
        <Problems />
        <Solutions />
        <Lessons />
        <Schedule />
        <Pricing />
        <Instructors />
        <FAQ />
      </main>

      <Footer onNavigate={goToPage} />
    </div>
  );
}
