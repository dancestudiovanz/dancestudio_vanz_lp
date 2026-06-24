/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Award, CheckCircle, Bell } from 'lucide-react';
import { AppPage } from '../appNavigation';
import { images, officialLineUrl } from '../data';

interface HeroProps {
  onNavigate: (page: AppPage) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-20"
    >
      <div className="absolute inset-0 z-0">
        <picture className="block w-full h-full">
          <source
            media="(max-width: 767px)"
            srcSet={images.heroMobileWebp}
            type="image/webp"
          />
          <source srcSet={images.heroWebp} type="image/webp" />
          <img
            src={images.hero}
            alt="武豊町のキッズダンス教室 dancestudio VANZ"
            width="1448"
            height="1086"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-90 md:opacity-95 brightness-110 contrast-[1.02] saturate-[1.05] animate-subtle-zoom"
            referrerPolicy="no-referrer"
          />
        </picture>
        <div className="absolute inset-0 bg-slate-900/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/5 to-slate-900/20" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 gap-8 lg:gap-12 items-center">
          <div className="space-y-5 md:space-y-7 text-left relative z-10">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-rose-500 text-white text-xs md:text-sm font-black px-4 py-1.5 rounded-full shadow-xl">
                <Award className="w-4 h-4 text-rose-100" />
                <span>無料体験受付中</span>
              </span>
              <span className="inline-flex items-center bg-pink-500/25 text-pink-100 text-xs font-bold px-3 py-1.5 rounded-full border border-pink-400/40">
                人気の王道！HIPHOP
              </span>
              <span className="inline-flex items-center bg-white/10 text-slate-100 text-xs font-bold px-3 py-1.5 rounded-full border border-white/15">
                初めての方も安心
              </span>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                知多郡武豊町で、
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-amber-500 font-black">
                  お子さまが笑顔で通えるキッズダンス教室。
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-bold text-slate-50 leading-relaxed max-w-xl drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
                設立20年以上・指導歴30年以上。
                <br className="hidden sm:block" />
                一人ひとりのペースに寄り添いながら、リズム感・表現力・自信を育みます。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl text-xs sm:text-sm font-extrabold text-white">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-500 shrink-0 drop-shadow-md" />
                <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">幼児・低学年クラスあり</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 drop-shadow-md" />
                <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">体験レッスン無料</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 drop-shadow-md" />
                <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">発表会も続けやすい費用</span>
              </div>
            </div>

            <div className="max-w-xl flex justify-end">
              <button
                type="button"
                onClick={() => onNavigate('announcements')}
                className="notice-pulse group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs sm:text-sm font-black text-white backdrop-blur-md shadow-lg shadow-rose-500/25 hover:bg-white/15 hover:-translate-y-0.5 transition-all cursor-pointer"
                aria-label="おしらせを見る"
              >
                <Bell className="notice-bell w-4 h-4 text-rose-100" aria-hidden="true" />
                <span>VANZからのおしらせ</span>
              </button>
            </div>

            <div>
              <a
                href={officialLineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-10 py-5 text-lg font-black text-white bg-[#06C755] rounded-full shadow-xl shadow-[#06C755]/30 hover:bg-[#05b34c] hover:-translate-y-0.5 hover:shadow-2xl transition-all transform duration-200 w-full lg:inline-flex lg:w-fit"
              >
                <Calendar className="w-5 h-5" />
                <span>公式LINEで無料体験を申し込む</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
