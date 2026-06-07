/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, User, Phone, CheckCircle, XCircle, Clock, Trash2, Settings, Users, Star, ArrowRight } from 'lucide-react';
import { Booking } from '../types';

interface BookingDashboardProps {
  bookings: Booking[];
  isOpen: boolean;
  onClose: () => void;
  onCancelBooking: (id: string) => void;
  onUpdateStatus?: (id: string, status: 'confirmed' | 'cancelled' | 'pending') => void;
}

export default function BookingDashboard({
  bookings,
  isOpen,
  onClose,
  onCancelBooking,
  onUpdateStatus
}: BookingDashboardProps) {
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  if (!isOpen) return null;

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="text-[10px] bg-emerald-500/15 text-emerald-500 font-extrabold px-2.5 py-1 rounded-full border border-emerald-500/20">日程確定</span>;
      case 'cancelled':
        return <span className="text-[10px] bg-red-500/15 text-red-500 font-extrabold px-2.5 py-1 rounded-full border border-red-500/20">キャンセル済</span>;
      case 'pending':
      default:
        return <span className="text-[10px] bg-amber-500/15 text-amber-500 font-extrabold px-2.5 py-1 rounded-full border border-amber-500/20">スタッフ確認待ち</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-100 flex flex-col justify-between max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header decoration banner */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-teal-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 bg-slate-100 p-2 rounded-full cursor-pointer transition-colors"
        >
          <XCircle className="w-5 h-5 text-slate-500" />
        </button>

        {/* Modal Info Head */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between border-b border-slate-100 pb-5 mt-3 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-rose-500" />
              <span>お申し込み体験レッスンの管理</span>
            </h2>
            <p className="text-xs text-slate-400">
              体験の予約日程確認や予約キャンセルをブラウザ上で実行可能です。
            </p>
          </div>

          {/* Admin Toggle button */}
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold border transition-colors cursor-pointer ${
              isAdminMode
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-3.5 h-3.5 animate-spin" />
            <span>{isAdminMode ? '管理者モード：ON' : '仮管理者モードに切替'}</span>
          </button>
        </div>

        {/* Main Bookings Area Scrollbar wrapper */}
        <div className="my-6 overflow-y-auto flex-grow max-h-[50vh] pr-2 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
              <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2 animate-pulse" />
              <p className="text-sm font-extrabold text-slate-500">まだ体験レッスンのお申し込みはありません</p>
              <p className="text-xs text-slate-400 mt-1">LPから無料体験フォームで簡単にお申し込みいただけます。</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4 relative overflow-hidden shadow-sm"
              >
                {/* Visual side marker by category */}
                <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                  booking.participantAgeGroup === 'kids' ? 'bg-rose-500' : 'bg-teal-500'
                }`} />

                <div className="space-y-2.5 flex-grow font-normal text-slate-700 pl-2">
                  {/* Status header inside slot */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] bg-slate-900 text-white font-extrabold px-2 py-0.5 rounded">
                      {booking.className}
                    </span>
                    {getStatusBadge(booking.status)}
                    <span className="text-[10px] text-slate-400 ml-auto">
                      申込日: {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Core class specification */}
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">{booking.lessonTitle}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <strong>希望日時: {booking.preferredDate} ({booking.preferredTime})</strong>
                    </p>
                  </div>

                  {/* Attendee fields layout */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-2 border-t border-slate-200/50">
                    <div>
                      <span className="text-slate-400">代表お名前:</span>
                      <span className="font-bold text-slate-800 ml-1">{booking.parentName} 様</span>
                    </div>
                    {booking.childName && (
                      <div>
                        <span className="text-slate-400">お子様お名前:</span>
                        <span className="font-bold text-slate-800 ml-1">{booking.childName} 様 ({booking.childAge})</span>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-400">連絡先:</span>
                      <span className="font-medium text-slate-800 ml-1">{booking.phone} / {booking.email}</span>
                    </div>
                  </div>

                  {booking.message && (
                    <div className="bg-white/85 rounded-xl p-3 border border-slate-200/40 text-xs text-slate-500">
                      <strong>ご要望：</strong>「{booking.message}」
                    </div>
                  )}
                </div>

                {/* Right side Actions (Conditional Admin vs Regular) */}
                <div className="flex sm:flex-col justify-end items-stretch gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 min-w-[120px]">
                  
                  {isAdminMode ? (
                    /* Admin controls */
                    <>
                      {onUpdateStatus && booking.status !== 'confirmed' && (
                        <button
                          onClick={() => onUpdateStatus(booking.id, 'confirmed')}
                          className="px-3 py-1.5 text-[10px] font-bold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-center cursor-pointer"
                        >
                          日程を確定
                        </button>
                      )}
                      {onUpdateStatus && booking.status !== 'cancelled' && (
                        <button
                          onClick={() => onUpdateStatus(booking.id, 'cancelled')}
                          className="px-3 py-1.5 text-[10px] font-bold bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors text-center cursor-pointer"
                        >
                          キャンセル処理
                        </button>
                      )}
                      {onUpdateStatus && booking.status !== 'pending' && (
                        <button
                          onClick={() => onUpdateStatus(booking.id, 'pending')}
                          className="px-3 py-1.5 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors text-center cursor-pointer"
                        >
                          保留に戻す
                        </button>
                      )}
                    </>
                  ) : (
                    /* Client controls */
                    <>
                      {booking.status !== 'cancelled' ? (
                        <button
                          onClick={() => {
                            if (window.confirm('本当にこの体験お申し込みをキャンセルしますか？')) {
                              onCancelBooking(booking.id);
                            }
                          }}
                          className="px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all border border-red-200 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>体験申込キャンセル</span>
                        </button>
                      ) : (
                        <div className="text-center text-[10px] font-bold text-red-400 py-1.5 bg-red-50/50 rounded-xl border border-red-100">
                          キャンセル済
                        </div>
                      )}
                    </>
                  )}

                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer controls */}
        <div className="border-t border-slate-100 pt-5 flex items-center justify-between text-xs">
          <div className="text-slate-400">
            {isAdminMode ? (
              <span className="text-amber-600 font-bold">⚠️ 管理者用：日程ステータスを変更可能です</span>
            ) : (
              <span>※お申し込み内容はブラウザのストレージに保存されます。</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold transition-colors cursor-pointer"
          >
            閉じる
          </button>
        </div>

      </div>
    </div>
  );
}
