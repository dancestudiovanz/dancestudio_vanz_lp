/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check } from 'lucide-react';
import { solutions, images } from '../data';

const accentStyles = {
  rose: {
    gradient: 'from-rose-500 to-amber-500',
    badge: 'bg-rose-500',
    tag: 'text-rose-500 bg-rose-50',
    highlight: 'text-rose-500',
    bullet: 'bg-rose-50 text-rose-500'
  },
  amber: {
    gradient: 'from-amber-500 to-rose-500',
    badge: 'bg-amber-600',
    tag: 'text-amber-600 bg-amber-50',
    highlight: 'text-amber-600',
    bullet: 'bg-amber-50 text-amber-600'
  },
  teal: {
    gradient: 'from-teal-500 to-sky-500',
    badge: 'bg-teal-600',
    tag: 'text-teal-600 bg-teal-50',
    highlight: 'text-teal-600',
    bullet: 'bg-teal-50 text-teal-600'
  }
} as const;

export default function Solutions() {
  return (
    <section id="solutions" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20 space-y-3">
          <span className="text-xs md:text-sm font-bold text-rose-500 tracking-widest uppercase bg-rose-50 px-3 py-1 rounded-full inline-block">
            VANZが選ばれる理由
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            初めてでも安心して通える理由
          </h2>
          <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            地域で20年以上選ばれてきたVANZでは、技術だけでなく、お子さまの気持ちと保護者様の安心を大切にしています。
          </p>
        </div>

        <div className="space-y-16 md:space-y-20 max-w-6xl mx-auto">
          {solutions.map((solution, index) => {
            const style = accentStyles[solution.accent];
            const imageSrc = images[solution.imageKey];
            const isReverse = index % 2 === 1;

            return (
              <div
                key={solution.id}
                className={`flex flex-col items-center gap-10 md:gap-12 ${
                  isReverse ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                <div className="w-full md:w-1/2 relative">
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${style.gradient} rounded-3xl blur-md opacity-20`}
                  />
                  <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-xl aspect-video md:aspect-[4/3] bg-slate-50">
                    <img
                      src={imageSrc}
                      alt={solution.title}
                      width="1200"
                      height="900"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className={`absolute top-4 left-4 ${style.badge} text-white text-xs font-black px-3 py-1 rounded-full shadow-lg`}
                    >
                      {solution.badge}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-4 md:space-y-5">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full inline-block uppercase tracking-wider ${style.tag}`}
                  >
                    {solution.tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                    {solution.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{solution.description}</p>
                  <ul className="space-y-2 md:space-y-3">
                    {solution.bulletPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                        <div className={`p-1 rounded mt-0.5 ${style.bullet}`}>
                          <Check className="w-4 h-4" />
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
