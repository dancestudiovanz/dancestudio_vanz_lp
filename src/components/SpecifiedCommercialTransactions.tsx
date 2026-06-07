/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { kidsDancePricing, lessonTicketPricing, officialLineUrl, studioAddress } from '../data';
import { LegalPage } from '../appNavigation';

interface SpecifiedCommercialTransactionsProps {
  onNavigate: (page: LegalPage) => void;
}

function formatPriceTax(taxIncluded: number) {
  return `${taxIncluded.toLocaleString('ja-JP')}円（税込）`;
}

function salesUrl() {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/`;
  }
  return '（本ウェブサイト）';
}

const rows = (onNavigate: (page: LegalPage) => void): Array<{ label: string; value: React.ReactNode }> => [
  {
    label: '販売事業者',
    value: '中原千佳代（個人事業主）'
  },
  {
    label: '運営責任者',
    value: '中原千佳代'
  },
  {
    label: '所在地',
    value: (
      <>
        〒{studioAddress.postal}
        <br />
        {studioAddress.line}
      </>
    )
  },
  {
    label: '電話番号',
    value: '0569-89-8898'
  },
  {
    label: '電話受付時間',
    value: '月・水・金 10:00～21:00'
  },
  {
    label: 'メールアドレス',
    value: 'お問い合わせはお電話または公式LINEにて承ります。'
  },
  {
    label: '販売URL',
    value: salesUrl()
  },
  {
    label: 'サービス名称',
    value: (
      <>
        キッズダンス会員（月会費制）
        <br />
        レッスンチケット（HIPHOP・エアロビクス・癒しのヨガ）
        <br />
        無料体験レッスン
      </>
    )
  },
  {
    label: '販売価格',
    value: (
      <div className="space-y-3">
        <div>
          <p className="font-bold text-slate-800 mb-1">キッズダンス（会員制）</p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>
              {kidsDancePricing.enrollment.label}：{formatPriceTax(kidsDancePricing.enrollment.taxIncluded)}
            </li>
            <li>
              {kidsDancePricing.annualFee.label}：{formatPriceTax(kidsDancePricing.annualFee.taxIncluded)}
            </li>
            {kidsDancePricing.monthly.map((line) => (
              <li key={line.label}>
                月会費（{line.label}）：{formatPriceTax(line.taxIncluded)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-slate-800 mb-1">レッスンチケット</p>
          <p className="text-slate-600 mb-1">対象：{lessonTicketPricing.eligibleClasses}</p>
          <ul className="list-disc pl-5 space-y-0.5">
            {lessonTicketPricing.plans.map((plan) => (
              <li key={plan.count}>
                {plan.count}回券：{formatPriceTax(plan.taxIncluded)}（1回あたり
                {plan.perLesson.toLocaleString('ja-JP')}円）
              </li>
            ))}
          </ul>
          <p className="mt-1">{lessonTicketPricing.note}</p>
        </div>
        <p>無料体験レッスン：0円（お一人様1回限り）</p>
      </div>
    )
  },
  {
    label: '商品代金以外の必要料金',
    value: '発表会参加費、衣装代等、当スタジオが別途案内する費用が発生する場合があります。'
  },
  {
    label: '代金の支払方法',
    value: (
      <>
        現金
        <br />
        月会費のみ口座引き落とし
      </>
    )
  },
  {
    label: '代金の支払時期',
    value: '各レッスン受講前までにお支払いください。月会費の引き落とし日は、当スタジオが別途定めるところによります。'
  },
  {
    label: 'サービス提供時期',
    value: '入会手続完了後、またはレッスンチケット購入後、各レッスン日程にサービスを提供します。'
  },
  {
    label: '申込みの有効期限',
    value: '特になし'
  },
  {
    label: 'キャンセル・返金について',
    value: (
      <div className="space-y-2">
        <p>
          キッズダンスの退会は、退会希望月の前月10日までに電話または公式LINEにてお申し出ください（例：4月退会希望の場合、3月10日まで）。
        </p>
        <p>
          原則として、入会金、年管理費、月会費、レッスンチケット代その他一切の返金は行いません。欠席時の振替レッスンはありません。
        </p>
        <p>
          長期にわたるケガまたは病気によりレッスン継続が困難な場合に限り、医師の診断書提出により月会費の返金または免除の対象となる場合があります（最長3ヶ月間）。
        </p>
        <p>
          無料体験およびレッスンの当日キャンセルは、事前に電話または公式LINEにてご連絡いただければ対応します。
        </p>
        <p className="text-slate-500">
          詳細は
          <button
            type="button"
            onClick={() => onNavigate('terms')}
            className="text-rose-500 font-bold hover:underline mx-1 cursor-pointer"
          >
            利用規約
          </button>
          をご確認ください。
        </p>
      </div>
    )
  }
];

export default function SpecifiedCommercialTransactions({ onNavigate }: SpecifiedCommercialTransactionsProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-bold text-rose-500 hover:text-rose-600 mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </button>

        <header className="mb-10 space-y-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            特定商取引法に基づく表記
          </h1>
          <p className="text-sm text-slate-500">ダンススタジオヴァンズ</p>
        </header>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <dl className="divide-y divide-slate-100">
            {rows(onNavigate).map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6 px-6 md:px-10 py-5"
              >
                <dt className="text-xs font-black text-slate-400 uppercase tracking-wide shrink-0">
                  {row.label}
                </dt>
                <dd className="text-sm text-slate-600 leading-relaxed">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="px-6 md:px-10 py-5 border-t border-slate-100 bg-slate-50/50">
            <a
              href={officialLineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#06C755] hover:underline"
            >
              公式LINEでお問い合わせ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
