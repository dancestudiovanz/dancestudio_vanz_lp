/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, ClipboardList, Menu, X } from 'lucide-react';
import { images, officialLineUrl } from '../data';

import { AppPage } from '../appNavigation';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  onNavigate: (page: AppPage) => void;
}

export default function Header({ onNavClick, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'お悩み', id: 'problems' },
    { label: '選ばれる理由', id: 'solutions' },
    { label: 'レッスン', id: 'lessons' },
    { label: '料金', id: 'pricing' },
    { label: '講師', id: 'instructors' },
    { label: 'FAQ', id: 'faq' }
  ];

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-800 border-b border-rose-50'
          : 'bg-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleLinkClick('hero')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 transform group-hover:scale-110 transition-transform duration-200">
              <img
                src={images.logo}
                alt="dancestudio VANZ ロゴ"
                className={`h-full w-full object-contain object-center transition-all duration-300 ${
                  isScrolled ? 'brightness-0' : 'brightness-0 invert'
                }`}
              />
            </div>
            <div className="min-w-0">
              <p
                className={`font-extrabold text-base sm:text-lg md:text-xl tracking-tight leading-tight transition-colors duration-300 ${
                  isScrolled ? 'text-slate-800' : 'text-white'
                }`}
              >
                dancestudioVANZ
              </p>
              <p
                className={`text-[10px] sm:text-xs font-semibold mt-0.5 leading-snug whitespace-nowrap transition-colors duration-300 ${
                  isScrolled ? 'text-amber-600' : 'text-amber-400'
                }`}
              >
                キッズダンス(HIPHOP)・エアロビクス・ヨガ
              </p>
              <p
                className={`text-[10px] mt-0.5 hidden sm:block ${isScrolled ? 'text-slate-500' : 'text-slate-300'}`}
              >
                Dance, Yoga & Fitness Studio
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4 text-sm font-semibold">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`transition-colors cursor-pointer hover:text-rose-500 py-1 border-b-2 border-transparent hover:border-rose-500 ${
                  isScrolled ? 'text-slate-600' : 'text-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Menu */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <a
              href={officialLineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 rounded-full text-[11px] sm:text-xs font-bold text-white bg-[#06C755] shadow-md hover:bg-[#05b34c] transition-all whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>無料体験</span>
            </a>
            <button
              type="button"
              onClick={() => onNavigate('member-board')}
              className="flex items-center gap-1 px-3 py-2 rounded-full text-[11px] sm:text-xs font-bold text-white bg-rose-500 shadow-md hover:bg-rose-600 transition-all whitespace-nowrap cursor-pointer"
            >
              <ClipboardList className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden min-[420px]:inline">会員専用掲示板</span>
              <span className="min-[420px]:hidden">掲示板</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg cursor-pointer ${
                isScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 text-slate-800 shadow-xl border-t border-slate-100 py-4 px-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="text-xs font-medium text-slate-400 pb-2 border-b border-slate-100">メニュー</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="text-left py-2 font-bold text-slate-700 hover:text-rose-500 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href={officialLineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 w-full rounded-xl bg-[#06C755] text-white font-bold hover:bg-[#05b34c] text-sm shadow-md transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>公式LINEで無料体験を申し込む</span>
            </a>
            <button
              type="button"
              onClick={() => {
                onNavigate('member-board');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-3 w-full rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600 text-sm shadow-md transition-all cursor-pointer"
            >
              <ClipboardList className="w-4 h-4" />
              <span>会員専用掲示板</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
