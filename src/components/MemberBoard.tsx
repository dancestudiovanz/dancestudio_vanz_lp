/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, ClipboardList, Loader2 } from 'lucide-react';
import { AppPage } from '../appNavigation';

interface MemberBoardProps {
  onNavigate: (page: AppPage) => void;
}

const boardUrl = import.meta.env.VITE_MEMBER_BOARD_URL as string | undefined;

export default function MemberBoard({ onNavigate }: MemberBoardProps) {
  const [isLoading, setIsLoading] = useState(Boolean(boardUrl));

  if (!boardUrl) {
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
              掲示板のURLが設定されていません。
              <br />
              管理者が GAS Webアプリのデプロイ後、環境変数を設定してください。
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-bold text-rose-500 hover:text-rose-600 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </button>

        <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[70vh]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
              <Loader2 className="w-8 h-8 text-rose-500 animate-spin" aria-hidden="true" />
              <span className="sr-only">読み込み中</span>
            </div>
          )}
          <iframe
            src={boardUrl}
            title="会員専用掲示板"
            className="w-full min-h-[70vh] border-0"
            loading="lazy"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
