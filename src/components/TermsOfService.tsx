/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { officialLineUrl, studioAddress } from '../data';
import { LegalPage } from '../appNavigation';

interface TermsOfServiceProps {
  onNavigate: (page: LegalPage) => void;
}

const sections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: '第1条（適用）',
    paragraphs: [
      '本利用規約（以下「本規約」）は、中原千佳代（個人事業主）（以下「当スタジオ」）が運営するダンススタジオヴァンズ（以下「当施設」）におけるレッスン、体験、イベントその他サービス（以下「本サービス」）の利用条件を定めるものです。',
      '本サービスを利用する会員、体験参加者、保護者その他の利用者（以下「利用者」）は、本規約に同意のうえ本サービスを利用するものとします。'
    ]
  },
  {
    title: '第2条（対象プログラム）',
    paragraphs: [
      'キッズダンス（幼児・小学生クラス等）は会員制（月会費制）により提供します。',
      'HIPHOP（小・中学生・成人）、エアロビクス、癒しのヨガは、レッスンチケット制により提供します。',
      'プログラムの内容、スケジュール、担当講師は、当スタジオの都合により変更される場合があります。'
    ]
  },
  {
    title: '第3条（入会・契約）',
    paragraphs: [
      '入会および体験のお申し込みは、原則として保護者または本人が、電話、公式LINEその他当スタジオが指定する方法により行うものとします。',
      '未成年者が本サービスを利用する場合、保護者が申込みおよび本規約への同意を行うものとします。',
      '当スタジオが入会を承諾した時点で、利用者と当スタジオとの間に利用契約が成立します。'
    ]
  },
  {
    title: '第4条（料金・支払い）',
    paragraphs: [
      '利用料金は、当スタジオが定める料金表に従います。入会金、年会費、月会費、レッスンチケット代、発表会参加費等が発生する場合があります。',
      '支払方法および支払期限は、当スタジオが別途定めるところによります。',
      '利用者が支払期限までに料金を支払わない場合、当スタジオはレッスン参加の停止その他必要な措置を取ることができます。'
    ]
  },
  {
    title: '第5条（退会）',
    paragraphs: [
      'キッズダンス会員が退会を希望する場合、退会希望月の前月10日までに、電話または公式LINEにて当スタジオへ申し出るものとします（例：4月退会希望の場合、3月10日まで）。',
      '退会申出期限を過ぎた場合、退会は翌月以降の取り扱いとなることがあります。',
      'ケガ・病気等を理由とする通常の休会制度は設けておりません。やむを得ずレッスンを休止する場合は、退会手続きを行うものとします。'
    ]
  },
  {
    title: '第6条（長期休会および返金）',
    paragraphs: [
      '長期にわたるケガまたは病気によりレッスン継続が困難な場合に限り、医師の診断書を提出いただくことで、月会費の返金または免除の対象となる場合があります。',
      '返金の対象は月会費のみとし、入会金、年会費、レッスンチケット代その他の費用は返金の対象外とします。',
      '長期休会の期間は、最長3ヶ月間とします。診断書の内容、休会開始時期等は当スタジオが確認のうえ対応します。',
      '診断書の提出がない場合、または長期休会の要件を満たさない場合、返金は行いません。'
    ]
  },
  {
    title: '第7条（返金の一般原則）',
    paragraphs: [
      '前条に定める場合を除き、入会金、年会費、月会費、レッスンチケット代その他一切の費用について、返金は行いません。',
      'レッスンチケットは、購入後の返金、換金、他人への譲渡はできません（当スタジオが認めた場合を除く）。',
      '利用者都合による欠席、退会、途中解約等においても、返金は行いません。'
    ]
  },
  {
    title: '第8条（無料体験）',
    paragraphs: [
      '無料体験は、お一人様1回限りとします。',
      '体験の日程変更またはキャンセルは、事前に電話または公式LINEにてご連絡ください。当日キャンセルについても、連絡いただければ対応可能です。',
      '無断キャンセルが続く場合、今後の体験または入会をお断りすることがあります。'
    ]
  },
  {
    title: '第9条（レッスン参加・欠席・キャンセル）',
    paragraphs: [
      'レッスン参加にあたっては、当スタジオまたは講師の指示に従い、安全に配慮した服装・持ち物等で参加してください。',
      '体調不良の場合は無理な参加を避け、必要に応じて当スタジオへご連絡ください。',
      '欠席時の振替レッスンは行いません。',
      'レッスン当日のキャンセルについては、事前に電話または公式LINEにてご連絡いただければ対応します。'
    ]
  },
  {
    title: '第10条（禁止事項）',
    paragraphs: [
      '利用者は、以下の行為を行ってはなりません。',
      '（1）他の利用者、講師、スタッフへの迷惑行為、暴力、差別的言動',
      '（2）レッスンの妨害、施設・備品の故意による損壊',
      '（3）当スタジオの許可なく施設内を撮影し、不適切に公開する行為',
      '（4）無断キャンセルの繰り返し、その他当スタジオが不適切と判断する行為'
    ]
  },
  {
    title: '第11条（参加停止・契約解除）',
    paragraphs: [
      '利用者が本規約に違反した場合、またはレッスンの運営上支障があると当スタジオが判断した場合、当スタジオは警告、参加停止、退会処分等の措置を取ることができます。',
      'この場合も、既にお支払いいただいた料金の返金は行いません。'
    ]
  },
  {
    title: '第12条（免責事項）',
    paragraphs: [
      '当スタジオは、レッスン中または施設利用中のケガ、盗難、紛失等について、当スタジオに故意または重大な過失がある場合を除き、責任を負いません。',
      '当スタジオは、施設内において生じたケガについて、治療費、休業損害、慰謝料その他一切の補償・保証は行いません。',
      '天災、停電、講師の急病その他やむを得ない事情により、レッスンを休講、変更、中止する場合があります。この場合の返金は、前各条の定めに従います。',
      '利用者は、自身および被保護者（お子さま）の健康状態について、必要な情報を当スタジオに正確に伝えるものとします。'
    ]
  },
  {
    title: '第13条（個人情報）',
    paragraphs: [
      '当スタジオは、利用者から取得した個人情報を、別途定めるプライバシーポリシーに従い、適切に取り扱います。'
    ]
  },
  {
    title: '第14条（規約の変更）',
    paragraphs: [
      '当スタジオは、必要に応じて本規約を変更できます。変更後の規約は、当施設のウェブサイトに掲載した時点から効力を生じます。',
      '重要な変更がある場合、当スタジオは公式LINE等により告知します。'
    ]
  },
  {
    title: '第15条（準拠法・合意管轄）',
    paragraphs: [
      '本規約は日本法に準拠します。',
      '本サービスに関して紛争が生じた場合、名古屋地方裁判所を第一審の専属的合意管轄裁判所とします。'
    ]
  },
  {
    title: 'お問い合わせ',
    paragraphs: [
      `運営者：中原千佳代（個人事業主）`,
      `施設名：ダンススタジオヴァンズ`,
      `所在地：〒${studioAddress.postal} ${studioAddress.line}`,
      `電話：0569-89-8898`,
      `公式LINE：当サイトフッターよりお問い合わせください。`
    ]
  }
];

export default function TermsOfService({ onNavigate }: TermsOfServiceProps) {
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
            利用規約
          </h1>
          <p className="text-sm text-slate-500">
            ダンススタジオヴァンズ
          </p>
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
