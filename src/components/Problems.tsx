/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserX, Sparkles, Coins } from 'lucide-react';
import { problems } from '../data';

export default function Problems() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'prob-1':
        return <UserX className="w-6 h-6" />;
      case 'prob-2':
        return <Sparkles className="w-6 h-6" />;
      case 'prob-3':
        return <Coins className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section
      id="problems"
      className="py-16 md:py-24 bg-slate-50 border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
          <span className="text-xs md:text-sm font-bold text-rose-500 tracking-widest uppercase bg-rose-50 px-3 py-1 rounded-full inline-block">
            MAMA&apos;S WORRY
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            はじめての習い事、こんな不安はありませんか？
          </h2>
          <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            新しい習い事を始めるとき、特にダンス教室を選ぶときは、保護者の方にもお子さまにも不安がありますよね。VANZでは、初めてのお子さまでも無理なく慣れていけるよう、一人ひとりのペースを大切にしています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {problems.map((prob) => (
            <div
              key={prob.id}
              className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100/80 shadow-sm relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 hover:border-rose-100 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start gap-3 mb-3">
                <div className="text-rose-400 bg-rose-50 p-3 rounded-xl shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  {getIcon(prob.id)}
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight group-hover:text-rose-500 transition-colors leading-snug pt-1.5">
                  {prob.title}
                </h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">{prob.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm font-bold text-rose-500">
          VANZが、そのお悩みに寄り添いながらサポートします
        </p>

        <div className="mt-8 text-center max-w-xl mx-auto bg-rose-500/5 rounded-2xl p-6 md:p-8 border border-rose-500/10 space-y-4">
          <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed">
            保護者の皆さまのご不安に寄り添いながら、親御さまの負担を減らし、お子さまが笑顔で通える教室づくりを20年以上追求してきました。
          </p>
          <p className="text-slate-800 font-bold text-sm md:text-base leading-relaxed">
            「他の習い事はやめても、VANZのダンスだけは笑顔で続けてくれる」そんな嬉しいお声も、たくさんの保護者様からいただいています。
          </p>
        </div>
      </div>
    </section>
  );
}
