/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { kidsDancePricing, lessonTicketPricing } from '../data';

function formatPriceTax(amount: number, taxIncluded: number) {
  return `${amount.toLocaleString()}円（税込${taxIncluded.toLocaleString()}円）`;
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-16 md:py-24 bg-slate-50 border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs md:text-sm font-bold text-rose-500 tracking-widest uppercase bg-rose-50 px-3 py-1 rounded-full inline-block">
            PRICE PLAN
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            シンプルで続けやすい料金体系
          </h2>
          <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-500 mt-2">
            衣装代や発表会の負担も極力カット！誰もが無理なく夢中になれる、納得の低予算設計です。
          </p>
        </div>

        {/* キッズダンス（YummyBeat） */}
        <div className="max-w-4xl mx-auto mb-6 md:mb-8">
          <div className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden">
            <div className="bg-rose-50 px-6 py-4 sm:px-8 border-b border-rose-100">
              <span className="text-xs font-black text-rose-600 bg-white px-3 py-1 rounded-full uppercase">
                キッズダンス
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                {kidsDancePricing.title}
              </h3>
            </div>

            <div className="px-4 py-6 sm:px-8 sm:py-8 space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-4 sm:p-6 flex flex-col min-h-[200px] sm:min-h-[220px]">
                  <h4 className="text-sm sm:text-base font-extrabold text-rose-800 text-center pb-3 mb-4 border-b-2 border-rose-200">
                    ご入会時
                  </h4>
                  <ul className="flex-1 flex flex-col justify-center gap-5 sm:gap-6">
                    <li className="text-center space-y-1">
                      <p className="text-xs sm:text-sm font-bold text-slate-600">
                        {kidsDancePricing.enrollment.label}
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 tabular-nums leading-snug">
                        {formatPriceTax(
                          kidsDancePricing.enrollment.amount,
                          kidsDancePricing.enrollment.taxIncluded
                        )}
                      </p>
                    </li>
                    <li className="text-center space-y-1">
                      <p className="text-xs sm:text-sm font-bold text-slate-600">
                        {kidsDancePricing.annualFee.label}
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 tabular-nums leading-snug">
                        {formatPriceTax(
                          kidsDancePricing.annualFee.amount,
                          kidsDancePricing.annualFee.taxIncluded
                        )}
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border-2 border-sky-200 bg-sky-50/50 p-4 sm:p-6 flex flex-col min-h-[200px] sm:min-h-[220px]">
                  <h4 className="text-sm sm:text-base font-extrabold text-sky-800 text-center pb-3 mb-4 border-b-2 border-sky-200">
                    月会費
                  </h4>
                  <ul className="flex-1 flex flex-col justify-center gap-5 sm:gap-6">
                    {kidsDancePricing.monthly.map((line) => (
                      <li key={line.label} className="text-center space-y-1">
                        <p className="text-xs sm:text-sm font-bold text-slate-600">
                          {line.label}
                        </p>
                        <p className="text-xs sm:text-sm font-extrabold text-slate-900 tabular-nums leading-snug">
                          {formatPriceTax(line.amount, line.taxIncluded)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 font-medium pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>発表会の衣装・参加費用の積み立て義務なし</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* レッスンチケット */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">
            <div className="bg-amber-50 px-6 py-4 sm:px-8 border-b border-amber-100">
              <span className="text-xs font-black text-amber-700 bg-white px-3 py-1 rounded-full uppercase">
                チケット
              </span>
              <div className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-3 gap-y-1 mt-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 shrink-0">
                  {lessonTicketPricing.title}
                </h3>
                <p className="text-[11px] sm:text-sm font-bold text-amber-800 leading-snug">
                  レッスンチケット対象クラス：{lessonTicketPricing.eligibleClasses}
                </p>
              </div>
            </div>

            <div className="px-4 py-6 sm:px-8 sm:py-8 space-y-4">
              <p className="text-center">
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                  {lessonTicketPricing.note}
                </span>
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {lessonTicketPricing.plans.map((plan) => (
                  <div
                    key={plan.count}
                    className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-4 sm:p-6 text-center flex flex-col justify-center min-h-[140px] sm:min-h-[160px]"
                  >
                    <p className="text-sm sm:text-base font-extrabold text-amber-800 mb-2">
                      {plan.count}レッスンチケット
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 tabular-nums leading-snug">
                      {formatPriceTax(plan.amount, plan.taxIncluded)}
                    </p>
                    <p className="text-xs font-bold text-slate-500 mt-2 tabular-nums">
                      1レッスンあたり {plan.perLesson.toLocaleString()}円
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
