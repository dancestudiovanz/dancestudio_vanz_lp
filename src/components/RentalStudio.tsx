/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Music2, CheckCircle, Clock } from 'lucide-react';
import { images } from '../data';

export default function RentalStudio() {
  return (
    <div className="mt-16 md:mt-24 pt-16 md:pt-24 border-t border-slate-100">
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-3">
        <span className="text-xs md:text-sm font-bold text-rose-500 tracking-widest uppercase bg-rose-50 px-3 py-1 rounded-full inline-block">
          RENTAL STUDIO
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          レンタルスタジオ料金
        </h2>
        <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="md:col-start-2 bg-white rounded-3xl overflow-hidden border border-teal-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
          {/* 画像（レッスン紹介カードと同じ比率） */}
          <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden bg-[#d4b896]">
            <img
              src={images.studioImage}
              alt="レンタルスタジオの様子"
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover scale-[1.22] [object-position:42%_28%]"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-4 left-4 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md border text-teal-700 bg-teal-50 border-teal-100 ring-teal-500/20">
              スタジオレンタル
            </span>
          </div>

          {/* 説明・料金 */}
          <div className="p-6 md:p-8 flex flex-col space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                レンタルスタジオ
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4">
                レッスンが入っていない時間帯で、ダンス・楽器練習・カラオケなどにスタジオをご利用いただけます。鏡張りの広いスタジオで、音響設備もご利用可能です。
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div className="rounded-2xl border-2 border-yellow-200 bg-yellow-50/50 p-4 text-center">
                  <p className="inline-flex items-center justify-center gap-1 text-xs font-extrabold text-yellow-800 mb-2">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500 shrink-0" aria-hidden />
                    会員価格
                  </p>
                  <p className="text-xs font-bold text-slate-600 mb-1">YummyBeat会員</p>
                  <p className="text-base font-extrabold text-slate-900 tabular-nums">
                    500円<span className="text-xs font-bold text-slate-600">/1h</span>
                  </p>
                  <p className="text-xs font-extrabold text-yellow-800 tabular-nums mt-1">
                    （税込550円）
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-slate-300 bg-slate-50/80 p-4 text-center">
                  <p className="inline-flex items-center justify-center gap-1 text-xs font-extrabold text-slate-700 mb-2">
                    <Star className="w-3.5 h-3.5 fill-slate-400 text-slate-500 shrink-0" aria-hidden />
                    ビジター価格
                  </p>
                  <p className="text-base font-extrabold text-slate-900 tabular-nums">
                    1,750円<span className="text-xs font-bold text-slate-600">/1h</span>
                  </p>
                  <p className="text-xs font-extrabold text-slate-700 tabular-nums mt-1">
                    （税込1,925円）
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-50 text-xs text-slate-600">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-400 shrink-0">利用時間：</span>
                  <span className="flex items-center gap-1 font-bold text-slate-800 text-right">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    1時間単位
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-slate-400 shrink-0">対象：</span>
                  <span className="font-bold text-slate-800 text-right leading-snug">
                    YummyBeat会員・一般の方
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 bg-teal-50/60 p-4 rounded-2xl border border-teal-100">
              <div className="text-[10px] font-black uppercase text-teal-700/80 tracking-wider mb-2">
                ご利用について
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <Music2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" aria-hidden />
                <span>
                  音響設備利用可（CD＜ピッチコントローラー有＞・iPhoneなど）
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" aria-hidden />
                <span>スタジオ内での飲食はできません</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
