/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Bell, CalendarDays, Loader2 } from 'lucide-react';
import { AppPage } from '../appNavigation';
import { announcements } from '../data';
import { Announcement } from '../types';

interface AnnouncementsProps {
  onNavigate: (page: AppPage) => void;
}

const announcementsUrl = import.meta.env.VITE_ANNOUNCEMENTS_URL as string | undefined;

const categoryLabel = {
  notice: 'おしらせ',
  event: 'イベント',
  lesson: 'レッスン'
};

interface AnnouncementsPayload {
  ok: boolean;
  announcements?: Announcement[];
}

export default function Announcements({ onNavigate }: AnnouncementsProps) {
  const [isLoading, setIsLoading] = useState(Boolean(announcementsUrl));
  const [remoteAnnouncements, setRemoteAnnouncements] = useState<Announcement[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (!announcementsUrl) {
      return;
    }

    const controller = new AbortController();
    const timerId = window.setTimeout(() => controller.abort(), 20000);

    fetch('/api/announcements', {
      signal: controller.signal,
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Announcements API responded with ${response.status}`);
        }
        return response.json() as Promise<AnnouncementsPayload>;
      })
      .then((payload) => {
        setRemoteAnnouncements(payload.announcements ?? []);
        setLoadFailed(!payload.ok);
      })
      .catch(() => {
        setLoadFailed(true);
      })
      .finally(() => {
        window.clearTimeout(timerId);
        setIsLoading(false);
      });

    return () => {
      window.clearTimeout(timerId);
      controller.abort();
    };
  }, []);

  const visibleAnnouncements = announcementsUrl ? (remoteAnnouncements ?? []) : announcements;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-bold text-rose-500 hover:text-rose-600 mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-100 px-4 py-1.5 text-xs font-black text-rose-500">
            <Bell className="w-4 h-4" />
            おしらせ
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            最新情報
          </h1>
          <p className="mt-3 text-sm md:text-base font-medium text-slate-500 leading-relaxed">
            休講・イベント・体験レッスンなど、dancestudio VANZからのおしらせを掲載します。
          </p>
        </div>

        {isLoading && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex items-center justify-center gap-3 text-sm font-bold text-slate-500">
            <Loader2 className="w-5 h-5 text-rose-500 animate-spin" aria-hidden="true" />
            おしらせを読み込んでいます
          </div>
        )}

        {!isLoading && loadFailed && announcementsUrl && (
          <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5 md:p-6 mb-4">
            <p className="text-sm font-bold text-slate-600 leading-relaxed">
              おしらせの読み込みに時間がかかっています。
              <a
                href={announcementsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-rose-500 hover:text-rose-600 underline underline-offset-4"
              >
                別画面で確認する
              </a>
            </p>
          </div>
        )}

        {!isLoading && visibleAnnouncements.length === 0 && !loadFailed && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-sm md:text-base font-bold text-slate-500">
            現在、おしらせはありません。
          </div>
        )}

        <div className="space-y-4">
          {!isLoading && visibleAnnouncements.map((announcement) => (
            <article
              key={announcement.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {announcement.date}
                </span>
                {announcement.category && (
                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-rose-500">
                    {categoryLabel[announcement.category]}
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-lg md:text-xl font-black text-slate-900">
                {announcement.title}
              </h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-slate-600">
                {announcement.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
