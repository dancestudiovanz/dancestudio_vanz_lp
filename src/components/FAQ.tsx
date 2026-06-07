/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Filter } from 'lucide-react';
import { fqas } from '../data';
import { FAQItem } from '../types';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1'); // Default open first
  const [activeCategory, setActiveCategory] = useState<'all' | 'booking' | 'price' | 'venue'>('all');

  const categories = [
    { label: 'すべて', value: 'all' },
    { label: 'お申し込み・体験', value: 'booking' },
    { label: '料金・費用', value: 'price' },
    { label: '施設・場所', value: 'venue' }
  ] as const;

  const filteredFqas = activeCategory === 'all'
    ? fqas
    : fqas.filter(f => f.category === activeCategory);

  const toggleFAQ = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-24 bg-slate-50 border-y border-slate-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs md:text-sm font-bold text-rose-500 tracking-widest uppercase bg-rose-50 px-3 py-1 rounded-full inline-block">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            よくあるご質問
          </h2>
          <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-500 mt-2">
            体験レッスンや発表会、月会費に関して頂く、よくある質問と回答をまとめました。
          </p>
        </div>

        {/* Category Filters inside FAQ */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-10 pb-4 border-b border-slate-200/50">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions Frame */}
        <div className="space-y-4">
          {filteredFqas.length === 0 ? (
            <p className="text-center text-slate-400 font-bold py-6">該当する質問はありません。</p>
          ) : (
            filteredFqas.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Trigger head */}
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full text-left px-5 sm:px-8 py-5 flex items-center justify-between gap-4 font-bold text-slate-950 focus:outline-none focus:ring-1 focus:ring-rose-200 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-rose-500 text-lg font-black leading-none mt-0.5">Q.</span>
                      <span className="text-xs sm:text-sm md:text-base leading-tight font-extrabold text-slate-900 transition-colors hover:text-rose-500">
                        {item.question}
                      </span>
                    </div>

                    <div className="text-slate-400 select-none">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-rose-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Body Expand text */}
                  {isOpen && (
                    <div className="px-5 sm:px-8 pb-5 pt-1.5 border-t border-slate-50 text-slate-700 bg-slate-50/50 animate-in slide-in-from-top-2 duration-150">
                      <div className="flex gap-3">
                        <span className="text-emerald-500 text-lg font-black leading-none mt-0.5">A.</span>
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
