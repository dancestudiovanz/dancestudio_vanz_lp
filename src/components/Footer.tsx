/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, MessageCircle, Instagram } from 'lucide-react';
import { images, officialLineUrl, officialInstagramUrl, studioAddress } from '../data';
import { LegalPage } from '../appNavigation';

interface FooterProps {
  onNavigate: (page: LegalPage) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="app-footer" className="relative bg-slate-950 text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="border-b border-white/5 pb-10 flex flex-col sm:flex-row sm:items-stretch gap-8 sm:gap-6 md:gap-8">
          {/* 左：スタジオ情報 */}
          <div className="flex-1 min-w-0 space-y-6 sm:max-w-[46%] md:max-w-[44%]">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14">
                <img
                  src={images.logo}
                  alt="dancestudio VANZ ロゴ"
                  className="h-full w-full object-contain object-center brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-lg tracking-tight">dancestudioVANZ</h3>
                <span className="text-[10px] text-slate-400">幼児・キッズ専門・ヨガ & エアロビクス</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              ダンスチームYummyBeatは設立から20年、ダンススタジオVANZはオープンから10年。地域密着型のアットホームなスタジオとして、一人ひとりの可能性を笑顔で引き出します。
            </p>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                スタジオ所在地・アクセス
              </h4>
              <ul className="space-y-3 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>
                    〒{studioAddress.postal}
                    <br />
                    {studioAddress.line}
                    <br />
                    {studioAddress.access}
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">お問い合わせ窓口</h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex flex-wrap gap-3">
                  <a
                    href={officialLineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-white hover:text-[#06C755] transition-colors bg-[#06C755]/10 border border-[#06C755]/30 px-4 py-3 rounded-xl"
                  >
                    <MessageCircle className="w-5 h-5 text-[#06C755]" />
                    公式LINE
                  </a>
                  <a
                    href={officialInstagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-white hover:text-pink-300 transition-colors bg-pink-500/10 border border-pink-500/30 px-4 py-3 rounded-xl"
                  >
                    <Instagram className="w-5 h-5 text-pink-400" />
                    Instagram
                  </a>
                </li>
                <li className="text-[10px] text-slate-400 leading-relaxed">
                  ※無料体験のお申し込み・レッスンに関するご質問は、すべて公式LINEより承ります。
                </li>
              </ul>
            </div>
          </div>

          {/* 右：Google Map */}
          <div className="w-full sm:flex-1 sm:min-w-0">
            <div className="relative w-full h-[280px] sm:min-h-[320px] sm:h-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
              <iframe
                title="dancestudioVANZ 所在地"
                src={studioAddress.mapEmbedUrl}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
          <p>© 2026 dancestudioVANZ. All Rights Reserved.</p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => onNavigate('terms')}
              className="hover:text-slate-300 cursor-pointer"
            >
              利用規約
            </button>
            <span>|</span>
            <button
              type="button"
              onClick={() => onNavigate('tokusho')}
              className="hover:text-slate-300 cursor-pointer"
            >
              特定商取引表示
            </button>
            <span>|</span>
            <button
              type="button"
              onClick={() => onNavigate('privacy')}
              className="hover:text-slate-300 cursor-pointer"
            >
              プライバシーポリシー
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
