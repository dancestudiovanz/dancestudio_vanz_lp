/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { officialLineUrl, studioAddress } from '../data';
import { LegalPage } from '../appNavigation';

interface PrivacyPolicyProps {
  onNavigate: (page: LegalPage) => void;
}

const sections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: '1. 基本方針',
    paragraphs: [
      'ダンススタジオヴァンズ（運営者：中原千佳代、以下「当スタジオ」）は、利用者の個人情報の重要性を認識し、個人情報の保護に関する法律その他関連法令を遵守し、適切に取り扱います。',
      '本プライバシーポリシーは、当スタジオが取得する個人情報の取扱いについて定めるものです。'
    ]
  },
  {
    title: '2. 取得する個人情報',
    paragraphs: [
      '当スタジオは、本サービスの提供にあたり、以下の個人情報を取得する場合があります。',
      '（1）氏名（保護者名、参加者名）',
      '（2）年齢、学年等（お子さまの場合）',
      '（3）電話番号',
      '（4）メールアドレス',
      '（5）レッスン希望日時、参加クラス、お問い合わせ内容',
      '（6）入会・退会・休会に関する情報',
      '（7）長期休会に伴う医師の診断書に記載された情報（提出いただいた場合）',
      '（8）口座引き落としに必要な金融機関情報（月会費の引き落とし手続に限る）',
      '（9）公式LINEその他の連絡手段を通じてお知らせいただいた情報'
    ]
  },
  {
    title: '3. 個人情報の利用目的',
    paragraphs: [
      '当スタジオは、取得した個人情報を以下の目的で利用します。',
      '（1）レッスン、体験、イベント等の提供および運営管理',
      '（2）入会・退会・休会・料金に関する手続および連絡',
      '（3）スケジュール変更、休講、安全上の連絡',
      '（4）お問い合わせ、ご相談への対応',
      '（5）レッスン中の安全管理および緊急時の連絡',
      '（6）サービス向上のための参考（個人を特定しない形での統計を含む）',
      '（7）上記に付随する業務'
    ]
  },
  {
    title: '4. 個人情報の第三者提供',
    paragraphs: [
      '当スタジオは、次の場合を除き、あらかじめ本人の同意を得ることなく個人情報を第三者に提供しません。',
      '（1）法令に基づく場合',
      '（2）人の生命、身体または財産の保護のために必要がある場合で、本人の同意を得ることが困難な場合',
      '（3）公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合で、本人の同意を得ることが困難な場合',
      '（4）国の機関または地方公共団体等への協力が必要な場合'
    ]
  },
  {
    title: '5. 個人情報の委託',
    paragraphs: [
      '当スタジオは、利用目的の達成に必要な範囲で、個人情報の取扱いを外部事業者に委託する場合があります。この場合、委託先を適切に選定し、必要かつ適切な監督を行います。',
      '委託の例：口座引き落としに関する金融機関、公式LINE（LINEヤフー株式会社が提供するサービス）等'
    ]
  },
  {
    title: '6. 外部サービスの利用',
    paragraphs: [
      '当スタジオのウェブサイトでは、Googleマップの地図表示機能等、外部サービスを利用している場合があります。これらのサービスでは、各事業者のプライバシーポリシーに基づき、Cookie等が利用されることがあります。',
      '当スタジオの公式Instagram等、外部サイトへのリンクから離れた後の情報取扱いについては、各外部事業者の規定が適用されます。'
    ]
  },
  {
    title: '7. 個人情報の安全管理',
    paragraphs: [
      '当スタジオは、個人情報への不正アクセス、紛失、破壊、改ざん、漏えい等を防止するため、必要かつ適切な安全管理措置を講じます。',
      '個人情報を取り扱う従業者・協力者に対しても、必要な監督を行います。'
    ]
  },
  {
    title: '8. 個人情報の保存期間',
    paragraphs: [
      '当スタジオは、利用目的の達成に必要な期間、個人情報を保存します。',
      '退会後は、法令上の保存義務、料金に関する記録保持、トラブル対応等に必要な範囲で、一定期間保存した後、適切な方法で削除または匿名化します。'
    ]
  },
  {
    title: '9. 開示・訂正・削除等の請求',
    paragraphs: [
      '本人またはその法定代理人から、個人情報の開示、訂正、追加、削除、利用停止等を求められた場合、本人確認のうえ、法令に従い適切に対応します。',
      'お問い合わせは、末尾の連絡先までご連絡ください。'
    ]
  },
  {
    title: '10. 未成年者の個人情報',
    paragraphs: [
      'お子さまの個人情報については、原則として保護者の方が申込み・同意を行うものとし、保護者の連絡先等とあわせて適切に管理します。'
    ]
  },
  {
    title: '11. プライバシーポリシーの変更',
    paragraphs: [
      '当スタジオは、必要に応じて本ポリシーを変更することがあります。変更後の内容は、当スタジオのウェブサイトに掲載した時点から効力を生じます。',
      '重要な変更がある場合、公式LINE等により告知します。'
    ]
  },
  {
    title: '12. お問い合わせ窓口',
    paragraphs: [
      '個人情報の取扱いに関するお問い合わせは、以下までご連絡ください。',
      `運営者：中原千佳代（個人事業主）`,
      `施設名：ダンススタジオヴァンズ`,
      `所在地：〒${studioAddress.postal} ${studioAddress.line}`,
      `電話：0569-89-8898（受付：月・水・金 10:00～21:00）`,
      `公式LINE：当サイトフッターよりお問い合わせください。`
    ]
  }
];

export default function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
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
            プライバシーポリシー
          </h1>
          <p className="text-sm text-slate-500">ダンススタジオヴァンズ</p>
          <p className="text-xs text-slate-400">制定日：2016年10月1日</p>
        </header>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-base md:text-lg font-extrabold text-slate-900">{section.title}</h2>
              <div className="space-y-2.5 text-sm text-slate-600 leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <div className="pt-4 border-t border-slate-100">
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
