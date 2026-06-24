/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LessonGenreBlock {
  label: string;
  text: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: 'kids' | 'aerobics' | 'yoga';
  categoryLabel: string;
  description: string;
  genreBlocks?: LessonGenreBlock[];
  target: string;
  duration: string;
  intensity?: 1 | 2 | 3 | 4 | 5;
  intensityLabel?: string;
  spotsLeft: number;
  features: string[];
  image: string;
}

export interface FeaturedInstructor {
  name: string;
  role: string;
  experience?: string;
  /** false のときバッジの uppercase を適用しない（例: YummyBeat出身） */
  experiencePreserveCase?: boolean;
  genres?: string[];
  hobbies?: string[];
  image?: string;
  imageAlt?: string;
  messageParagraphs: string[];
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  message: string;
  profile: string;
  image: string;
  experience: string;
}

export interface ScheduleEvent {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeStart: string;
  timeEnd: string;
  lessonTitle: string;
  instructorName?: string;
  category: 'kids' | 'aerobics' | 'yoga' | 'hiphop';
  requiresTicket?: boolean;
  intensityLabel?: string;
  hiphopType?: 'kids' | 'adult';
}

export interface Announcement {
  id: string;
  date: string;
  title: string;
  body: string;
  category?: 'notice' | 'event' | 'lesson';
}

export interface Booking {
  id: string;
  lessonId: string;
  lessonTitle: string;
  className: string;
  preferredDate: string;
  preferredTime: string;
  parentName: string;
  childName?: string;
  childAge?: string;
  participantAgeGroup: 'kids' | 'adult';
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface PriceLine {
  label: string;
  amount: number;
  taxIncluded: number;
}

export interface LessonTicketPlan {
  count: number;
  amount: number;
  taxIncluded: number;
  perLesson: number;
}

export interface KidsDancePricing {
  title: string;
  enrollment: PriceLine;
  annualFee: PriceLine;
  monthly: PriceLine[];
}

export interface LessonTicketPricing {
  title: string;
  note: string;
  eligibleClasses: string;
  plans: LessonTicketPlan[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'price' | 'venue';
}
