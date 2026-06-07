/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, X, MessageCircle } from 'lucide-react';
import { featuredInstructors, instructors } from '../data';
import { FeaturedInstructor, Instructor } from '../types';

function genreTextClass(genre: string): string {
  const key = genre.toUpperCase();
  if (key.includes('ヨガ')) return 'text-violet-600';
  if (key === 'HIPHOP' || key.includes('HIPHOP')) return 'text-pink-600';
  if (key === 'エアロビクス') return 'text-amber-600';
  return 'text-pink-600';
}

function FeaturedInstructorCard({ instructor }: { instructor: FeaturedInstructor }) {
  const hobbies = instructor.hobbies ?? [];
  const genres = instructor.genres ?? [];
  const hasImage = Boolean(instructor.image);

  return (
    <div className="max-w-4xl mx-auto mb-14 md:mb-20 last:mb-0">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
          <div className="flex-1 min-w-0 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {instructor.name}
                </h3>
                {instructor.experience && (
                  <span
                    className={`text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full inline-block shrink-0 ${
                      instructor.experiencePreserveCase
                        ? 'normal-case tracking-normal'
                        : 'uppercase tracking-widest'
                    }`}
                  >
                    {instructor.experience}
                  </span>
                )}
              </div>
              {instructor.role && (
                <p className="text-sm font-bold text-rose-500 mt-2">{instructor.role}</p>
              )}
              <div className="flex flex-wrap items-baseline gap-x-5 md:gap-x-8 gap-y-2 mt-3 text-sm">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide shrink-0">
                    ジャンル
                  </span>
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    {genres.map((genre) => (
                      <span key={genre} className={`text-sm font-extrabold ${genreTextClass(genre)}`}>
                        {genre}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide shrink-0">
                    趣味
                  </span>
                  {hobbies.length > 0 && (
                    <span className="text-sm text-slate-600 font-medium">{hobbies.join(' · ')}</span>
                  )}
                </div>
              </div>
            </div>

            {instructor.messageParagraphs.length > 0 && (
              <>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    メッセージ
                  </h4>
                </div>

                <div className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                  {instructor.messageParagraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="w-full max-w-[200px] sm:max-w-[220px] mx-auto md:ml-auto md:mr-0 shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-md bg-slate-50 aspect-[3/4]">
              {hasImage ? (
                <img
                  src={instructor.image}
                  alt={instructor.imageAlt ?? instructor.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <span className="text-xs font-bold text-slate-400">写真準備中</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Instructors() {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  return (
    <section id="instructors" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
          <span className="text-xs md:text-sm font-bold text-rose-500 tracking-widest uppercase bg-rose-50 px-3 py-1 rounded-full inline-block">
            INSTRUCTORS
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            温かい笑顔でサポートする指導陣
          </h2>
          <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-500 mt-2">
            全員が指導実績豊富で、何よりも「生徒一人ひとりの個性を大切にする心」を持った優しいプロフェッショナルばかり。
          </p>
        </div>

        {featuredInstructors.map((instructor) => (
          <FeaturedInstructorCard key={instructor.name} instructor={instructor} />
        ))}

        {/* その他インストラクター */}
        {instructors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {instructors.map((inst) => (
            <div
              key={inst.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur-md text-amber-400 text-xs font-black px-4 py-1.5 rounded-full shadow-lg border border-slate-800">
                  {inst.experience}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {inst.name} 先生
                  </h3>
                  <p className="text-xs font-bold text-rose-500 mt-0.5">{inst.role}</p>
                  <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                    {inst.profile}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-500 italic relative font-medium">
                    <MessageCircle className="w-4 h-4 text-rose-400 absolute top-2.5 right-3 opacity-30" />
                    <p className="line-clamp-2 pr-4">{inst.message}</p>
                  </div>
                  <button
                    onClick={() => setSelectedInstructor(inst)}
                    className="w-full text-center py-3 rounded-full bg-slate-100 group-hover:bg-rose-50 border border-slate-200/40 group-hover:border-rose-100 text-xs font-extrabold text-slate-700 group-hover:text-rose-500 transition-all cursor-pointer"
                  >
                    詳しいプロフィール・ご挨拶を見る
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {selectedInstructor && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-100">
              <button
                onClick={() => setSelectedInstructor(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 bg-slate-100 p-2 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start mt-4">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border border-slate-100 shadow flex-shrink-0 bg-slate-50">
                  <img
                    src={selectedInstructor.image}
                    alt={selectedInstructor.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase bg-amber-50 border border-amber-100 px-3 py-1 rounded-full inline-block">
                    {selectedInstructor.experience}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 leading-none">
                    {selectedInstructor.name} 先生
                  </h3>
                  <p className="text-xs font-bold text-rose-500">{selectedInstructor.role}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    経歴・プロフィール
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed">{selectedInstructor.profile}</p>
                </div>
                <div className="space-y-1.5 bg-rose-500/5 p-4 rounded-2xl border border-rose-500/10">
                  <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    生徒・保護者のみなさまへのメッセージ
                  </h4>
                  <p className="text-slate-800 text-sm italic font-medium leading-relaxed">
                    「{selectedInstructor.message}」
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 text-right">
                <button
                  onClick={() => setSelectedInstructor(null)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 cursor-pointer"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
