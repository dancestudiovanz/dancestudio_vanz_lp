/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ClipboardList } from 'lucide-react';
import { officialLineUrl } from '../data';
import { AppPage } from '../appNavigation';

interface MemberBoardPlaceholderProps {
  onNavigate: (page: AppPage) => void;
}

export default function MemberBoardPlaceholder({ onNavigate }: MemberBoardPlaceholderProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-bold text-rose-500 hover:text-rose-600 mb-10 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </button>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10 space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
            <ClipboardList className="w-8 h-8 text-rose-500" />
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            会員専用掲示板
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            現在、会員専用掲示板を準備中です。
            <br />
            公開まで今しばらくお待ちください。
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            レッスンに関するお問い合わせは、公式LINEまたはお電話（0569-89-8898）にて承ります。
          </p>
          <a
            href={officialLineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-[#06C755] hover:bg-[#05b34c] transition-colors"
          >
            公式LINEでお問い合わせ
          </a>
        </div>
      </div>
    </div>
  );
}
