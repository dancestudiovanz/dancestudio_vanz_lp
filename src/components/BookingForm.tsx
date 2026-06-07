/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, Mail, FileText, ChevronRight, ChevronLeft, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { lessons } from '../data';
import { Booking } from '../types';

interface BookingFormProps {
  initialLessonId?: string;
  initialDayOfWeek?: string;
  initialTime?: string;
  onSubmitBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
}

export default function BookingForm({
  initialLessonId = '',
  initialDayOfWeek = '',
  initialTime = '',
  onSubmitBooking
}: BookingFormProps) {
  // Wizard steps
  const [step, setStep] = useState<number>(1);
  const [success, setSuccess] = useState<boolean>(false);

  // Form states
  const [lessonId, setLessonId] = useState<string>(initialLessonId || 'lesson-kids');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>(initialTime || '16:00');
  const [parentName, setParentName] = useState<string>('');
  const [childName, setChildName] = useState<string>('');
  const [childAge, setChildAge] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Selected lesson categorization for dynamic form display
  const selectedLesson = lessons.find((l) => l.id === lessonId) || lessons[0];
  const isKidsClass = selectedLesson.category === 'kids';

  // Synchronize dynamic initial props changes (e.g. user clicked calendar slot)
  useEffect(() => {
    if (initialLessonId) {
      setLessonId(initialLessonId);
    }
  }, [initialLessonId]);

  useEffect(() => {
    if (initialTime) {
      setPreferredTime(initialTime);
    }
  }, [initialTime]);

  // Set default potential date (e.g., next Monday or tomorrow as convenient date)
  useEffect(() => {
    const today = new Date();
    // Default tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setPreferredDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Validation rules
  const isStep1Valid = () => {
    return lessonId !== '' && preferredDate !== '' && preferredTime !== '';
  };

  const isStep2Valid = () => {
    if (isKidsClass) {
      return parentName.trim() !== '' && childName.trim() !== '' && childAge.trim() !== '';
    }
    return parentName.trim() !== ''; // parentName is reused as attendee name
  };

  const isStep3Valid = () => {
    // Regex simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9-]{10,14}$/;
    return emailRegex.test(email) && phone.trim().length >= 10;
  };

  // Triggers
  const handleNextStep = () => {
    if (step === 1 && isStep1Valid()) setStep(2);
    else if (step === 2 && isStep2Valid()) setStep(3);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep3Valid()) return;

    // Send payload up
    onSubmitBooking({
      lessonId,
      lessonTitle: selectedLesson.title,
      className: selectedLesson.categoryLabel,
      preferredDate,
      preferredTime,
      parentName,
      childName: isKidsClass ? childName : undefined,
      childAge: isKidsClass ? childAge : undefined,
      participantAgeGroup: isKidsClass ? 'kids' : 'adult',
      email,
      phone,
      message
    });

    // Toggle local success page
    setSuccess(true);
    setStep(1);
  };

  const resetForm = () => {
    setSuccess(false);
    setParentName('');
    setChildName('');
    setChildAge('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <section
      id="booking-section"
      className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Decorative gradient elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-rose-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-full inline-block uppercase tracking-widest leading-none">
            2分でかんたん入力！
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            無料体験レッスンお申し込み
          </h2>
          <div className="w-12 h-1 bg-rose-500 mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            無理な勧誘は一切ございません。お気軽にお子様と一緒にスタジオの雰囲気を感じに来てくださいね。
          </p>
        </div>

        {/* Wizard Form Frame */}
        <div className="bg-slate-950 rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10">
          
          {success ? (
            /* SUCCESS feedback block */
            <div className="text-center py-10 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mx-auto ring-4 ring-rose-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  お申し込みありがとうございました！
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  ご入力いただいたメールアドレス・電話番号に、スタッフより24時間以内に日程確定のご連絡を差し上げます。
                </p>
              </div>

              {/* Confirmation Summary Box */}
              <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-5 text-left text-xs space-y-2.5">
                <div className="text-[10px] uppercase font-black text-amber-400 tracking-wider">
                  お申し込みの概要
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">体験クラス:</span>
                  <span className="font-extrabold">{selectedLesson.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">参加希望日:</span>
                  <span className="font-extrabold">{preferredDate} ({preferredTime})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">お名前(代表/保護者):</span>
                  <span className="font-extrabold">{parentName} 様</span>
                </div>
                {isKidsClass && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">お子様（お名前・ご年齢）:</span>
                    <span className="font-extrabold">{childName} 様 ({childAge})</span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  onClick={resetForm}
                  className="px-8 py-3 rounded-full text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 shadow transition-colors cursor-pointer"
                >
                  他の体験を予約する / フォームへ戻る
                </button>
              </div>
            </div>
          ) : (
            /* REGULAR Booking Steps Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Steps Progress Header Indicators */}
              <div className="flex items-center justify-between max-w-md mx-auto border-b border-white/5 pb-6">
                
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    step >= 1 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>1</div>
                  <span className={`text-[10px] mt-1 font-bold ${step >= 1 ? 'text-rose-400' : 'text-slate-500'}`}>レッスン選択</span>
                </div>

                <div className="h-0.5 bg-slate-800 flex-grow mx-2" />

                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    step >= 2 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>2</div>
                  <span className={`text-[10px] mt-1 font-bold ${step >= 2 ? 'text-rose-400' : 'text-slate-500'}`}>参加者さま情報</span>
                </div>

                <div className="h-0.5 bg-slate-800 flex-grow mx-2" />

                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    step >= 3 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>3</div>
                  <span className={`text-[10px] mt-1 font-bold ${step >= 3 ? 'text-rose-400' : 'text-slate-500'}`}>ご連絡先入力</span>
                </div>

              </div>

              {/* Step 1 Content */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-100">どの無料体験クラスに参加しますか？</h3>
                    <p className="text-xs text-slate-400">ご希望のプログラムとスタジオ訪問日時を選んでください。</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => setLessonId(lesson.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                          lessonId === lesson.id
                            ? 'border-rose-500 bg-rose-500/10 shadow-lg'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        {lessonId === lesson.id && (
                          <span className="absolute top-2 right-2 text-rose-500">
                            <CheckCircle2 className="w-4 h-4 fill-white" />
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-rose-400 block mb-1">{lesson.categoryLabel}</span>
                        <h4 className="text-xs sm:text-sm font-extrabold">{lesson.title.split(' (')[0]}</h4>
                        <span className="text-[10px] text-slate-400 mt-2 block">対象: {lesson.target.split('（')[0]}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-rose-500" />
                        <span>希望日</span>
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1 flex-shrink-0">
                        <span>希望時間帯</span>
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                      >
                        <option value="10:00">10:00〜11:00 (平日朝・土曜)</option>
                        <option value="11:15">11:15〜12:15 (平日昼・フィットネス)</option>
                        <option value="14:00">14:00〜14:50 (土曜キッズ合同)</option>
                        <option value="16:00">16:00〜16:50 (平日夕方キッズ)</option>
                        <option value="17:10">17:10〜18:00 (平日夕方キッズ)</option>
                        <option value="18:15">18:15〜19:15 (平日夜キッズ)</option>
                        <option value="19:00">19:00〜20:00 (仕事帰り夜クラス)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 text-right">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!isStep1Valid()}
                      className={`inline-flex items-center gap-1 px-8 py-3.5 rounded-full text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-rose-500/20 ${
                        isStep1Valid()
                          ? 'bg-rose-500 hover:bg-rose-600 hover:scale-105'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                      }`}
                    >
                      <span>次へ進む</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 Content */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-100">
                      {isKidsClass ? 'お子様・保護者様のお名前' : '参加される方のお名前'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isKidsClass ? 'お子様の対象クラス指導を最適化するため、年齢をご入力ください。' : '初心者でも気軽にご参加いただけます！'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Parent Name / Main Attendee Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                        <User className="w-4 h-4 text-rose-500" />
                        <span>{isKidsClass ? '保護者様のお名前' : 'お名前（フルネーム）'}</span>
                      </label>
                      <input
                        type="text"
                        placeholder="例：山田 花子"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>

                    {/* Child details if Kids Class */}
                    {isKidsClass && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-300">
                            お子様のお名前（ひらがなでも可）
                          </label>
                          <input
                            type="text"
                            placeholder="例：やまだ たろう"
                            value={childName}
                            onChange={(e) => setChildName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-300">
                            ご年齢・学年
                          </label>
                          <input
                            type="text"
                            placeholder="例：5歳（年中）"
                            value={childAge}
                            onChange={(e) => setChildAge(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="inline-flex items-center gap-1 text-slate-400 font-bold hover:text-white transition-colors cursor-pointer text-xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>戻る</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!isStep2Valid()}
                      className={`inline-flex items-center gap-1 px-8 py-3.5 rounded-full text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-rose-500/20 ${
                        isStep2Valid()
                          ? 'bg-rose-500 hover:bg-rose-600 hover:scale-105'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                      }`}
                    >
                      <span>ご連絡先の入力へ</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 Content */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-100">ご連絡先をご入力ください</h3>
                    <p className="text-xs text-slate-400">日程確定の連絡以外には一切使用いたしません。ご安心ください。</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                          <Mail className="w-4 h-4 text-rose-500" />
                          <span>メールアドレス</span>
                        </label>
                        <input
                          type="email"
                          placeholder="例：tanaka@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                          <Phone className="w-4 h-4 text-rose-500" />
                          <span>電話番号 (ハイフン無し)</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="例：09012345678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Short Message / Notice */}
                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                        <FileText className="w-4 h-4 text-rose-500" />
                        <span>ご質問・要望・人見知りなどの懸念事項（任意）</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="例：恥ずかしがり屋なので他の子とうまく踊れるか不安です、等。"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="inline-flex items-center gap-1 text-slate-400 font-bold hover:text-white transition-colors cursor-pointer text-xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>戻る</span>
                    </button>

                    <button
                      type="submit"
                      disabled={!isStep3Valid()}
                      className={`inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-black text-white transition-all cursor-pointer shadow-lg ${
                        isStep3Valid()
                          ? 'bg-rose-500 hover:bg-rose-600 hover:scale-105 shadow-rose-500/30'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Sparkles className="w-5 h-5 animate-pulse" />
                      <span>お申し込みを完了する</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom security assurance block */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] text-slate-400 leading-relaxed flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>
                  ※ご入力いただきましたプライバシー情報は厳重に管理し、体験連絡以外の営業電話などには一切利用いたしません。また、定員を超えるお申し込みとなった場合は順番でのご案内になります。
                </span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
