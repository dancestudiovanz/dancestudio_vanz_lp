/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { scheduleEvents } from '../data';
import { ScheduleEvent } from '../types';
import RentalStudio from './RentalStudio';

const SCHEDULE_MORNING_START = 10 * 60;
const MIDDAY_GAP_PX = 34;
const PX_PER_MINUTE = 1.2;
/** 連続クラス間の余白（全曜日で同じ時間＝同じ縦位置） */
const TIGHT_GAP_TARGET_PX = 6;

type ScheduleSegment =
  | { kind: 'linear'; until: number; pxPerMin: number }
  | { kind: 'compress'; until: number; heightPx: number };

/** 10:00〜21:00 の共通タイムライン（月・水・金で縦位置を揃える） */
const SCHEDULE_SEGMENTS: ScheduleSegment[] = [
  { kind: 'linear', until: 11 * 60, pxPerMin: PX_PER_MINUTE },
  { kind: 'compress', until: 16 * 60, heightPx: MIDDAY_GAP_PX },
  { kind: 'linear', until: 16 * 60 + 50, pxPerMin: PX_PER_MINUTE },
  { kind: 'compress', until: 17 * 60, heightPx: TIGHT_GAP_TARGET_PX },
  { kind: 'linear', until: 18 * 60, pxPerMin: PX_PER_MINUTE },
  { kind: 'compress', until: 18 * 60 + 30, heightPx: TIGHT_GAP_TARGET_PX },
  { kind: 'linear', until: 19 * 60 + 30, pxPerMin: PX_PER_MINUTE },
  { kind: 'compress', until: 19 * 60 + 40, heightPx: TIGHT_GAP_TARGET_PX },
  { kind: 'linear', until: 21 * 60, pxPerMin: PX_PER_MINUTE }
];

const WEEK_DAYS: Array<{
  key: ScheduleEvent['dayOfWeek'];
  label: string;
  narrow?: boolean;
}> = [
  { key: 'Monday', label: '月' },
  { key: 'Tuesday', label: '火', narrow: true },
  { key: 'Wednesday', label: '水' },
  { key: 'Thursday', label: '木', narrow: true },
  { key: 'Friday', label: '金' }
];

const formatTime = (time: string) => time.replace(':', '：');

const formatTimeRange = (start: string, end: string) =>
  `${formatTime(start)}～${formatTime(end)}`;

function parseMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function timeToTopPx(time: string): number {
  const target = parseMinutes(time);
  let y = 0;
  let cursor = SCHEDULE_MORNING_START;

  if (target <= cursor) return 0;

  for (const seg of SCHEDULE_SEGMENTS) {
    if (target > seg.until) {
      if (seg.kind === 'linear') {
        y += (seg.until - cursor) * seg.pxPerMin;
      } else {
        y += seg.heightPx;
      }
      cursor = seg.until;
      continue;
    }

    if (seg.kind === 'linear') {
      return y + (target - cursor) * seg.pxPerMin;
    }
    const span = seg.until - cursor;
    if (span <= 0) return y;
    return y + seg.heightPx * ((target - cursor) / span);
  }

  return y;
}

function eventHeightPx(timeStart: string, timeEnd: string): number {
  return Math.max(timeToTopPx(timeEnd) - timeToTopPx(timeStart) - 2, 60);
}

const GRID_HEIGHT = timeToTopPx('21:00') + 8;

const GRID_COLS =
  'grid-cols-[minmax(76px,1fr)_40px_minmax(76px,1fr)_40px_minmax(76px,1fr)] sm:grid-cols-[minmax(96px,1fr)_48px_minmax(96px,1fr)_48px_minmax(96px,1fr)] md:grid-cols-[minmax(112px,1fr)_56px_minmax(112px,1fr)_56px_minmax(112px,1fr)]';

function getCellStyle(event: ScheduleEvent): string {
  if (event.category === 'yoga') {
    return 'bg-sky-300 border-sky-500 text-slate-900';
  }
  if (event.category === 'aerobics') {
    return 'bg-orange-400 border-orange-600 text-white';
  }
  if (event.category === 'hiphop') {
    return event.hiphopType === 'adult'
      ? 'bg-emerald-300 border-emerald-600 text-slate-900'
      : 'bg-pink-300 border-pink-500 text-slate-900';
  }
  return 'bg-yellow-300 border-yellow-500 text-slate-900';
}

function getTextScale(height: number) {
  if (height <= 62) {
    return {
      container: 'gap-0 px-0.5 py-0.5',
      time: 'text-[8px] sm:text-[9px] leading-none',
      title: 'text-[9px] sm:text-[10px] leading-tight',
      meta: 'text-[8px] sm:text-[9px] leading-none',
      hiphopMain: 'text-[9px] sm:text-[10px] leading-none',
      hiphopSub: 'text-[7px] sm:text-[8px] leading-none'
    };
  }
  if (height <= 72) {
    return {
      container: 'gap-0 px-1 py-0.5',
      time: 'text-[9px] sm:text-[10px] leading-none',
      title: 'text-[10px] sm:text-[11px] leading-tight',
      meta: 'text-[8px] sm:text-[9px] leading-none',
      hiphopMain: 'text-[10px] sm:text-[11px] leading-none',
      hiphopSub: 'text-[8px] sm:text-[9px] leading-none'
    };
  }
  return {
    container: 'gap-0.5 px-1 py-1',
    time: 'text-[10px] sm:text-xs leading-none',
    title: 'text-[11px] sm:text-sm leading-tight',
    meta: 'text-[9px] sm:text-[10px] leading-none',
    hiphopMain: 'text-[11px] sm:text-sm leading-none',
    hiphopSub: 'text-[9px] sm:text-[10px] leading-none'
  };
}

/** HIPHOP 小中 / HIPHOP 成人 はサブタイトルだけ小さく表示 */
function renderLessonTitle(event: ScheduleEvent, scale: ReturnType<typeof getTextScale>) {
  const hiphopMatch = event.lessonTitle.match(/^HIPHOP\s+(.+)$/);
  if (hiphopMatch) {
    return (
      <div className="flex flex-col items-center justify-center gap-0">
        <span className={`${scale.hiphopMain} font-extrabold`}>
          HIPHOP{event.requiresTicket ? '※' : ''}
        </span>
        <span className={`${scale.hiphopSub} font-bold`}>{hiphopMatch[1]}</span>
      </div>
    );
  }
  return (
    <p className={`${scale.title} font-extrabold text-center break-keep`}>
      {event.lessonTitle}
      {event.requiresTicket ? '※' : ''}
    </p>
  );
}

export default function Schedule() {
  const eventsByDay = WEEK_DAYS.map((day) => ({
    ...day,
    events: scheduleEvents
      .filter((e) => e.dayOfWeek === day.key)
      .sort((a, b) => a.timeStart.localeCompare(b.timeStart))
  }));

  return (
    <section id="schedule" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-3">
          <span className="text-xs md:text-sm font-bold text-rose-500 tracking-widest uppercase bg-rose-50 px-3 py-1 rounded-full inline-block">
            TIME TABLE
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            レッスンスケジュール
          </h2>
          <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            2026年4月〜のレッスン表です。お申し込みは公式LINEよりお願いします。
          </p>
        </div>

        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-4 md:mb-6">
            <p className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
              dancestudioVANZ レッスン表
            </p>
            <p className="text-sm md:text-base font-bold text-slate-600 mt-1">2026.4月〜</p>
          </div>

          <div className="w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm bg-white overflow-hidden">
            <div className={`grid ${GRID_COLS} border-b border-rose-700 bg-rose-700`}>
              {eventsByDay.map((day) => (
                <div
                  key={day.key}
                  className="text-white text-center font-extrabold border-l border-rose-500/60 first:border-l-0 py-3.5 text-base sm:text-lg"
                >
                  {day.label}
                </div>
              ))}
            </div>

            <div className={`grid ${GRID_COLS} relative`} style={{ height: GRID_HEIGHT }}>
              {eventsByDay.map((day) => (
                <div
                  key={day.key}
                  className={`relative border-l border-slate-100 first:border-l-0 ${
                    day.narrow ? 'bg-slate-50/60' : 'bg-white'
                  }`}
                >
                  {day.narrow ? (
                    <div
                      className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm sm:text-base font-medium pointer-events-none"
                      aria-hidden
                    >
                      —
                    </div>
                  ) : (
                    day.events.map((event) => {
                      const top = timeToTopPx(event.timeStart);
                      const height = eventHeightPx(event.timeStart, event.timeEnd);
                      const scale = getTextScale(height);

                      return (
                        <div
                          key={event.id}
                          className={`absolute left-1 right-1 sm:left-1.5 sm:right-1.5 rounded-lg sm:rounded-xl border-2 text-center overflow-hidden z-10 ${getCellStyle(event)}`}
                          style={{ top: top + 1, height }}
                        >
                          <div
                            className={`h-full min-h-0 w-full flex flex-col items-center justify-center ${scale.container}`}
                          >
                            <p
                              className={`${scale.time} font-bold tabular-nums whitespace-nowrap opacity-90 text-center shrink-0`}
                            >
                              {formatTimeRange(event.timeStart, event.timeEnd)}
                            </p>
                            <div className="shrink min-h-0 flex items-center justify-center">
                              {renderLessonTitle(event, scale)}
                            </div>
                            {event.intensityLabel && (
                              <p className={`${scale.meta} font-bold text-center shrink-0`}>
                                {event.intensityLabel}
                              </p>
                            )}
                            {event.instructorName && (
                              <p className={`${scale.meta} font-bold text-center shrink-0`}>
                                {event.instructorName}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-4 text-xs sm:text-sm font-bold text-slate-700">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-yellow-300 border border-yellow-500" />
              キッズ（幼児50分・他60分）
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-orange-400 border border-orange-600" />
              エアロ
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-sky-300 border border-sky-500" />
              ヨガ
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-pink-300 border border-pink-500" />
              HIPHOP小中
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-300 border border-emerald-600" />
              HIPHOP成人
            </span>
          </div>

          <p className="text-center text-xs sm:text-sm font-bold text-rose-500 mt-3 md:mt-4">
            ※要レッスンチケット
          </p>

          <p className="text-center text-[10px] sm:text-xs text-slate-400 mt-4 md:mt-6 leading-relaxed px-2">
            ※スケジュールや担当は予告なく変更される場合があります。
          </p>

          <RentalStudio />
        </div>
      </div>
    </section>
  );
}
