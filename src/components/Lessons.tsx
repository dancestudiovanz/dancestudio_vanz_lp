/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Star, Users, CheckCircle, Clock } from 'lucide-react';
import { lessons } from '../data';
import { Lesson } from '../types';

export default function Lessons() {
  const [activeTab, setActiveTab] = useState<'all' | 'kids' | 'aerobics' | 'yoga'>('all');

  const filteredLessons = activeTab === 'all'
    ? lessons
    : lessons.filter(l => l.category === activeTab);

  const getIntensityBadge = (intensity: number) => {
    return (
      <div className="flex gap-1 items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < intensity ? 'text-amber-500 fill-amber-500' : 'text-slate-200 fill-slate-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const getColByTheme = (category: string) => {
    switch (category) {
      case 'kids':
        return 'text-rose-500 bg-rose-50 border-rose-100 ring-rose-500/20 hover:border-rose-300';
      case 'aerobics':
        return 'text-amber-600 bg-amber-50 border-amber-100 ring-amber-500/20 hover:border-amber-300';
      case 'yoga':
        return 'text-teal-600 bg-teal-50 border-teal-100 ring-teal-500/20 hover:border-teal-300';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-100 ring-slate-500/20 hover:border-slate-300';
    }
  };

  return (
    <section
      id="lessons"
      className="py-16 md:py-24 bg-slate-50 border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs md:text-sm font-bold text-rose-500 tracking-widest uppercase bg-rose-50 px-3 py-1 rounded-full inline-block">
            CLASS PROGRAM
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            楽しさと心地よさを備えたVANZの３プログラム
          </h2>
          <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            お子様の能力を引き出すキッズダンスから、
            <br />
            大人のすっきり発汗、深い癒しのヨガまで幅広くお選びいただけます。
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 lg:hidden">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            すべてのプログラム ({lessons.length})
          </button>
          <button
            onClick={() => setActiveTab('kids')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'kids'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'bg-white hover:bg-rose-50 text-rose-500 border border-rose-100'
            }`}
          >
            キッズダンス
          </button>
          <button
            onClick={() => setActiveTab('aerobics')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'aerobics'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                : 'bg-white hover:bg-amber-50 text-amber-600 border border-amber-100'
            }`}
          >
            エアロビクス
          </button>
          <button
            onClick={() => setActiveTab('yoga')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'yoga'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                : 'bg-white hover:bg-teal-50 text-teal-600 border border-teal-100'
            }`}
          >
            癒やしのヨガ
          </button>
        </div>

        {/* Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              
              {/* Card Image Header */}
              <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden bg-slate-50">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Accent Badge */}
                <span className={`absolute top-4 left-4 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md border ${getColByTheme(lesson.category)}`}>
                  {lesson.categoryLabel}
                </span>
              </div>

              {/* Card Content Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                    {lesson.title}
                  </h3>
                  
                  <div className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4 space-y-3">
                    <p>{lesson.description}</p>
                    {lesson.genreBlocks?.map((block) => (
                      <div
                        key={block.label}
                        className="rounded-xl bg-rose-50/80 border border-rose-100 px-3 py-2.5"
                      >
                        <p className="font-extrabold text-rose-800 text-xs mb-1">
                          ◆ {block.label}
                        </p>
                        <p className="text-slate-600 leading-relaxed">{block.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Summary properties */}
                  <div className="space-y-2 pt-4 border-t border-slate-50 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-400">対象：</span>
                      <span className="font-bold text-slate-800">{lesson.target}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-400">レッスン時間：</span>
                      <span className="flex items-center gap-1 font-bold text-slate-800">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {lesson.duration}
                      </span>
                    </div>
                    {(lesson.intensityLabel != null || lesson.intensity != null) && (
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-400">運動強度：</span>
                        <span>
                          {lesson.intensityLabel != null ? (
                            <span className="font-bold text-amber-500 tracking-wider">
                              {lesson.intensityLabel}
                            </span>
                          ) : (
                            getIntensityBadge(lesson.intensity!)
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Program Highlights */}
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                    お薦めポイント
                  </div>
                  {lesson.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1 text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
