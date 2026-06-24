/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Lesson,
  Instructor,
  FeaturedInstructor,
  ScheduleEvent,
  FAQItem,
  KidsDancePricing,
  LessonTicketPricing,
  Announcement
} from './types';

/** 公式LINE（アカウントURLに合わせて変更してください） */
export const officialLineUrl = 'https://lin.ee/P5pFiaA';

/** 公式Instagram */
export const officialInstagramUrl = 'https://www.instagram.com/dancestudio_vanz/';

export const announcements: Announcement[] = [
  {
    id: 'trial-lesson',
    date: '2026.06.24',
    title: '無料体験レッスン受付中',
    body: 'キッズダンス・エアロビクス・癒しのヨガの体験を受付中です。気になるクラスがありましたら、公式LINEよりお気軽にお問い合わせください。',
    category: 'lesson'
  },
  {
    id: 'kids-dance',
    date: '2026.06.24',
    title: 'キッズダンスクラスのご案内',
    body: '幼児・低学年・高学年・中学生でクラス分けをしています。初めてのお子さまも安心して参加できるよう、年齢やペースに合わせて丁寧にサポートします。',
    category: 'notice'
  }
];

export const studioAddress = {
  postal: '470-2347',
  line: '愛知県知多郡武豊町道崎12-3',
  access: '知多武豊駅から徒歩3分（専用駐車場あり）',
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent('愛知県知多郡武豊町道崎12-3')}&hl=ja&z=16&output=embed`
};

// Images
export const images = {
  logo: '/assets/images/logo-vanz.png',
  hero: '/assets/images/top03.png',
  heroWebp: '/assets/images/top03.webp',
  heroMobileWebp: '/assets/images/top03-sp.webp',
  kids: '/assets/images/kizdance_1.png',
  aerobics: '/assets/images/aerobikusu_1.png',
  yoga: '/assets/images/yoga_1.png',
  studioImage: '/assets/images/studio_image.png',
  chika: '/assets/images/chika_intora.png',
  akimi: '/assets/images/akimi_intora.png',
  sayaka: '/assets/images/sayaka_intora.png',
  kana: '/assets/images/kana_intora.png',
  zenntai: '/assets/images/zenntai.png',
  ibent0: '/assets/images/ibent0_1.png',
  butai1: '/assets/images/butai_1.png'
};

// Lessons (3 main categories requested)
export const lessons: Lesson[] = [
  {
    id: 'lesson-kids',
    title: 'キッズダンス（YummyBeat）',
    category: 'kids',
    categoryLabel: 'キッズダンス',
    description:
      '当スタジオでは、ストリートダンスの王道であり、学校のダンス授業にも役立つ「HIPHOP」をベースに指導しています。高学年からはgirlsHIPHOPも取り入れていきます。',
    target: '3歳〜中学3年生（幼児・低学年・高学年・中学生でクラス分けあり）',
    duration: '60分（幼児のみ50分）',
    spotsLeft: 4,
    features: [
      '指導歴30年のプロによる丁寧・安心の指導',
      '年齢・レベルに合わせたクラス編成で馴染みやすい',
      '年2回の発表会！衣装代など保護者負担を抑えた設計'
    ],
    image: images.kids
  },
  {
    id: 'lesson-aero',
    title: 'エアロビクス（初級クラス）',
    category: 'aerobics',
    categoryLabel: 'エアロビクス',
    description: 'アップテンポな音楽に乗せて、楽しく有酸素運動を行うクラスです。脂肪燃焼や心肺機能の向上に優れており、運動が苦手な方でも自然とステップを踏めるようにステップバイステップで展開します。汗を流して体もスッキリ！',
    target: '初心者〜、運動管理したい方',
    duration: '60分',
    intensityLabel: '★～★★★',
    spotsLeft: 6,
    features: [
      '初心者大歓迎！基本のステップからじっくり丁寧に解説',
      '心地よい発汗と脂肪燃焼、リフレッシュに効果的',
      '運動習慣を身につけて、免疫力＆体力アップ'
    ],
    image: images.aerobics
  },
  {
    id: 'lesson-yoga',
    title: '癒しのヨガ',
    category: 'yoga',
    categoryLabel: '癒しのヨガ',
    description: '深い呼吸と共に体感と柔軟性を整えていくヨガクラスです。日頃のストレスや肩こり・腰痛、疲労をリフレッシュし、心安らぐ時間を提供します。年齢問わず、自分のペースで安全に参加いただけます。',
    target: 'どなたでも、運動不足の方、リラクゼーションを求める方',
    duration: '60分',
    intensityLabel: '★～★★',
    spotsLeft: 5,
    features: [
      '呼吸法＋優しいポーズ中心の疲労回復プログラム',
      '体力に自信のない方でも参加できるプログラム',
      '自律神経を整え、質の高い睡眠や健康をサポート'
    ],
    image: images.yoga
  }
];

// メイン表示インストラクター（sayaka → kana → 中村昭美 → chika の順）
export const featuredInstructors: FeaturedInstructor[] = [
  {
    name: 'sayaka',
    role: 'キッズダンス講師',
    experience: '指導歴10年以上',
    genres: ['HIPHOP', 'girlsHIPHOP'],
    hobbies: ['ダンス', 'ショッピング', '美容'],
    image: images.sayaka,
    imageAlt: 'sayaka（キッズダンス講師）',
    messageParagraphs: [
      '幼少よりJAZZ,Hip-Hopを習い、2010年 avex、2012年にEXPGに入る。DANCE TRAX2011,12 ガールズヒップホップ選抜メンバー、DANCE NATION CHANPIONSIP2015全国準優勝、a-STAR2014 FAKYバックダンサー、EXPG上位クラス進級などの経歴を活かしつつ、キッズから大人まで、初心者から経験者まで幅広く指導しています。',
      'HIPHOP、girlsHIPHOP、時々JAZZFUNKやK-POPなど様々なジャンルを通して、ダンスの楽しさを大切にしながら、一人ひとりのレベルに合わせて丁寧にサポート。踊ることがもっと好きになるレッスンを心掛けています。'
    ]
  },
  {
    name: 'kana',
    role: '',
    experience: 'YummyBeat出身',
    experiencePreserveCase: true,
    genres: ['HIPHOP', 'girlsHIPHOP'],
    hobbies: ['音楽を聴くこと', '古着'],
    image: images.kana,
    imageAlt: 'kana（インストラクター）',
    messageParagraphs: [
      '小学生の頃からYummyBeatでHIPHOP・girlsHIPHOPを習ってきました。ダンス歴は8年で、得意ジャンルはHIPHOPです。',
      '自分自身も生徒として通っていた経験があるからこそ、初めての不安や「できた！」と感じる楽しさに寄り添いながらレッスンを行います。',
      '明るく楽しい雰囲気を大切にし、みんなが笑顔でダンスを楽しめる時間をつくっていきます。'
    ]
  },
  {
    name: '中村昭美',
    role: '癒しのヨガ',
    genres: ['癒しのヨガ'],
    hobbies: ['ショッピング', 'ドライブ', '人間ウォッチング'],
    image: images.akimi,
    imageAlt: '中村昭美（癒しのヨガ）',
    messageParagraphs: [
      '私は50歳のときにヨガと出会いました。当時の私は、身体がかたく、運動不足も感じていました。そんな中で初めてヨガを体験したとき、身体がゆるむだけでなく、心までふっと軽くなるような深いリラックス感を味わいました。',
      'その心地よさに惹かれ、もっとヨガを知りたいと思い、たくさんのレッスンを受け、ヨガスクールでも学びを深めてきました。',
      'ヨガは、年齢や身体のかたさに関係なく、自分のペースで始められるものです。日々の疲れや緊張でこわばった身体と心を、ゆっくりとほぐしてみませんか？私自身が感じたリラックス感や爽快感を、皆さまにもお届けできたら嬉しいです。'
    ]
  },
  {
    name: 'chika',
    role: 'dancestudioVANZ オーナー / YummyBeat代表',
    experience: '指導歴30年以上',
    genres: ['HIPHOP', 'エアロビクス'],
    hobbies: ['AI', 'アガベ育成', '温泉'],
    image: images.chika,
    imageAlt: 'chika（YummyBeat代表）',
    messageParagraphs: [
      'こんにちは！dancestudioVANZオーナーのchikaです。インストラクターとしてこれまでに延べ5000名以上の指導をしてきました。この経験を基に、お子さま一人ひとりの性格や成長段階に合わせた指導を大切にしています。「メンバーの皆様が笑顔で帰っていただけるレッスン」をモットーに、初めての習い事でも「ウェルカム＆フレンドリー」に大歓迎。大人数に埋もれさせず、小さな「できた！」を見逃さず優しく褒めて伸ばす、経験に裏打ちされたレッスンを心がけています。',
      'ダンスを通じて、一歩踏み出す自信を育ててみませんか？まずは無料体験レッスンへ、お気軽に遊びに来てください！'
    ]
  }
];

// Instructors（下部グリッド用・現在なし）
export const instructors: Instructor[] = [];

// キッズダンス（YummyBeat）料金
export const kidsDancePricing: KidsDancePricing = {
  title: 'キッズダンス（YummyBeat）',
  enrollment: { label: '入会金', amount: 5000, taxIncluded: 5500 },
  annualFee: { label: '年管理費', amount: 3000, taxIncluded: 3300 },
  monthly: [
    { label: '幼児', amount: 5900, taxIncluded: 6490 },
    { label: '小中学生', amount: 6400, taxIncluded: 7040 }
  ]
};

export const lessonTicketPricing: LessonTicketPricing = {
  title: 'レッスンチケット',
  note: '有効期限なし',
  eligibleClasses: 'エアロビクス・癒しのヨガ・HIPHOP',
  plans: [
    { count: 4, amount: 6600, taxIncluded: 7260, perLesson: 1650 },
    { count: 6, amount: 9600, taxIncluded: 10560, perLesson: 1600 }
  ]
};

// Schedule（2026年4月〜 レッスン表）
export const scheduleEvents: ScheduleEvent[] = [
  // 月曜
  {
    id: 'sch-1',
    dayOfWeek: 'Monday',
    timeStart: '10:00',
    timeEnd: '11:00',
    lessonTitle: '癒しのヨガ',
    category: 'yoga',
    requiresTicket: true,
    instructorName: '中村'
  },
  {
    id: 'sch-2',
    dayOfWeek: 'Monday',
    timeStart: '19:40',
    timeEnd: '20:40',
    lessonTitle: 'HIPHOP 小中',
    instructorName: 'kana',
    category: 'hiphop',
    hiphopType: 'kids',
    requiresTicket: true
  },

  // 水曜
  {
    id: 'sch-3',
    dayOfWeek: 'Wednesday',
    timeStart: '10:00',
    timeEnd: '11:00',
    lessonTitle: 'エアロビクス',
    category: 'aerobics',
    requiresTicket: true,
    instructorName: 'chika'
  },
  {
    id: 'sch-4',
    dayOfWeek: 'Wednesday',
    timeStart: '16:00',
    timeEnd: '16:50',
    lessonTitle: '幼児',
    instructorName: 'chika',
    category: 'kids'
  },
  {
    id: 'sch-5',
    dayOfWeek: 'Wednesday',
    timeStart: '18:30',
    timeEnd: '19:30',
    lessonTitle: '高学年',
    instructorName: 'sayaka',
    category: 'kids'
  },
  {
    id: 'sch-6',
    dayOfWeek: 'Wednesday',
    timeStart: '19:40',
    timeEnd: '20:40',
    lessonTitle: 'HIPHOP 成人',
    instructorName: 'sayaka',
    category: 'hiphop',
    hiphopType: 'adult',
    requiresTicket: true
  },

  // 金曜
  {
    id: 'sch-7',
    dayOfWeek: 'Friday',
    timeStart: '16:00',
    timeEnd: '16:50',
    lessonTitle: '幼児',
    instructorName: 'chika',
    category: 'kids'
  },
  {
    id: 'sch-8',
    dayOfWeek: 'Friday',
    timeStart: '17:00',
    timeEnd: '18:00',
    lessonTitle: '低学年',
    instructorName: 'chika',
    category: 'kids'
  },
  {
    id: 'sch-9',
    dayOfWeek: 'Friday',
    timeStart: '18:30',
    timeEnd: '19:30',
    lessonTitle: '高学年',
    instructorName: 'sayaka',
    category: 'kids'
  },
  {
    id: 'sch-10',
    dayOfWeek: 'Friday',
    timeStart: '19:40',
    timeEnd: '20:40',
    lessonTitle: '中学生',
    instructorName: 'sayaka',
    category: 'kids'
  }
];

// FAQs
export const fqas: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'booking',
    question: 'まったく初めての参加ですが、大丈夫でしょうか？',
    answer:
      'はい、大歓迎です。キッズクラスも大人クラスも、当スタジオは「初めての方」「運動が苦手な方」が安心して一から馴染めるよう配慮してレッスンを進めています。講師がしっかり一人ひとりのペースに合わせたレッスンをおこないます。'
  },
  {
    id: 'faq-2',
    category: 'booking',
    question: '体験レッスンの時、持ち物や服装は何が必要ですか？',
    answer:
      '運動しやすい服装（Tシャツ、スウェットなど）でお越しください。また、水分補給用の飲み物（お水やスポーツドリンク）と、汗ふき用タオルをご持参ください。キッズダンスおよびエアロビクスは室内用のスニーカー、ヨガは裸足で行いますのでシューズは不要です。お持ちの方はヨガマットをご持参ください。'
  },
  {
    id: 'faq-3',
    category: 'price',
    question: '発表会はお金がかかると聞いたのですが…衣装代などの負担が心配です。',
    answer: '当スタジオは「安心の低予算体制」を一番に掲げております。年2回開催する発表会の参加費や衣装代は、ご家族の負担にならないよう必要最小限に抑えています。衣装も手作り義務などは一切ありません。無理なく継続していただけるのがVANZの大きな強みです。'
  },
  {
    id: 'faq-4',
    category: 'booking',
    question: '人見知りがある子なのですが、クラスの雰囲気に馴染めるでしょうか？',
    answer:
      'ご安心ください。指導歴30年の代表のchikaをはじめ、講師陣はお子さま一人ひとりの気持ちに寄り添うことを大切にしています。無理に参加を促すのではなく、まずは見学からでも大丈夫。小さな一歩をたくさん褒めながら、少しずつクラスに馴染めるようサポートします。誰ひとり置き去りにせず、「できた！」という経験を積み重ねることで、自然と笑顔で踊れるようになっていきます。'
  },
  {
    id: 'faq-5',
    category: 'venue',
    question: 'スタジオの見学や、体験レッスンの日に子供と一緒にスタジオ内に入れますか？',
    answer:
      'はい、もちろんです！保護者様にはスタジオ内に用意された観覧スペースにて、お子様が楽しんでいる姿をゆっくり見学していただけます。'
  },
  {
    id: 'faq-6',
    category: 'price',
    question: '月の途中から入会できますか？また、欠席した時の振替レッスンはありますか？',
    answer:
      'はい、月の途中からご入会いただけます。ただ振替レッスンはおこなっておりませんのでご了承ください。'
  },
  {
    id: 'faq-7',
    category: 'price',
    question: '月会費はどのようにお支払いすればよいですか？',
    answer:
      '月会費は、毎月27日にご指定の口座より翌月分をお引き落としさせていただきます。（27日が銀行休業日の場合は、翌営業日）'
  },
  {
    id: 'faq-8',
    category: 'price',
    question: 'キッズダンスは、引き落としではなくレッスンチケット購入で通えますか？',
    answer:
      '申し訳ございません、キッズダンスにつきましては会員制となっております。ただし、会員様が追加でHIPHOPクラスを受講したい場合はレッスンチケットをご購入いただいております。'
  }
];

// Problems (for co-sympathy)
export const problems = [
  {
    id: 'prob-1',
    title: '人見知りで馴染めるか心配',
    description: '経験豊富な講師が、お子さまの性格やペースに合わせて優しくサポートします。'
  },
  {
    id: 'prob-2',
    title: 'ダンス未経験でも大丈夫？',
    description: 'ストレッチや簡単なステップから始めるので、初めてのお子さまでも安心です。'
  },
  {
    id: 'prob-3',
    title: '発表会や衣装代が心配',
    description: '衣装代や参加費が大きな負担にならないよう、保護者様目線の費用設計を大切にしています。'
  }
];

// Solutions (Reasons to choose VANZ)
export const solutions = [
  {
    id: 'sol-1',
    tag: '理由 01',
    title: '指導歴30年以上。初めての子にも寄り添う安心の個別フィードバック',
    description:
      '初めての習い事で緊張してしまう幼児期から、多感な小・中学生まで、一人ひとりの性格やペースに合わせて丁寧に指導します。大人数に埋もれさせず、その子の『できた！』を見逃さない個別フィードバックで、楽しみながら少しずつ自信を育てていきます。',
    bulletPoints: [
      '初めてのお子さまにも丁寧にサポート',
      '褒めて伸ばす、安心感のある指導',
      'リズム感・表現力・自信を育てるレッスン'
    ],
    badge: '指導歴30年以上',
    imageKey: 'butai1' as const,
    accent: 'amber' as const
  },
  {
    id: 'sol-2',
    tag: '理由 02',
    title: '人見知りのお子さまも馴染みやすい、ウェルカム＆フレンドリーな教室',
    description:
      '新しい場所が苦手なお子さまや、人見知りのお子さまでも安心して参加できるよう、明るくあたたかい雰囲気づくりを大切にしています。通われている保護者様も温かい方ばかりで、親御さん同士のトラブルや揉め事もありません。無理に急がせず、お子さまのペースに合わせて少しずつ慣れていける環境です。',
    bulletPoints: [
      'お子さまのペースを大切にした雰囲気',
      '初めてでも緊張しにくいアットホームな空間',
      '保護者様同士も安心（面倒な当番や人間関係のストレスなし）'
    ],
    badge: 'アットホームな教室',
    imageKey: 'ibent0' as const,
    accent: 'teal' as const
  },
  {
    id: 'sol-3',
    tag: '理由 03',
    title: '保護者様の負担を抑えた、続けやすい費用設計',
    description:
      '発表会や衣装代が大きな負担にならないよう、無理なく長く続けられる費用設計を大切にしています。高額な衣装の強制購入や、過度な舞台演出負担をできるだけ抑え、保護者様にも安心していただける運営を心がけています。',
    bulletPoints: [
      '衣装代や発表会費の負担を抑えた設計',
      '無理なく長く続けやすい月謝設定',
      '保護者様目線の安心サポート'
    ],
    badge: '続けやすい費用設計',
    imageKey: 'zenntai' as const,
    accent: 'rose' as const
  }
];
