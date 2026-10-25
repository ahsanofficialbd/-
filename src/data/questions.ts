import { Question } from '../types/quiz';

export const GK_QUESTIONS: Question[] = [
  // =========================================================================
  // ১. গণিত ও মানসিক দক্ষতা (Mathematics & Mental Ability - 10 Questions)
  // =========================================================================
  {
    id: 'math_1',
    categoryId: 'math',
    question: {
      bn: 'সবচেয়ে ছোট মৌলিক সংখ্যা (Prime Number) কোনটি?',
      en: 'What is the smallest prime number?',
    },
    options: {
      bn: ['০', '১', '২', '৩'],
      en: ['0', '1', '2', '3'],
    },
    correctIndex: 2,
    explanation: {
      bn: '২ হলো একমাত্র জোড় মৌলিক সংখ্যা এবং সবচেয়ে ছোট মৌলিক সংখ্যা। ১ মৌলিক বা যৌগিক কোনোটিই নয়।',
      en: '2 is the only even prime number and the smallest prime number. 1 is neither prime nor composite.',
    },
    difficulty: 'easy',
    sourceOrExam: 'বিসিএস প্রিলিমিনারি গণিত',
  },
  {
    id: 'math_2',
    categoryId: 'math',
    question: {
      bn: '১ থেকে ১০০ পর্যন্ত মোট কয়টি মৌলিক সংখ্যা রয়েছে?',
      en: 'How many prime numbers are there between 1 and 100?',
    },
    options: {
      bn: ['২১টি', '২৪টি', '২৫টি', '২৬টি'],
      en: ['21', '24', '25', '26'],
    },
    correctIndex: 2,
    explanation: {
      bn: '১ থেকে ১০০ এর মধ্যে মোট ২৫টি মৌলিক সংখ্যা রয়েছে (মনে রাখার শর্টকাট কোড: 44-22-322-321)।',
      en: 'There are 25 prime numbers between 1 and 100 (Formula: 44-22-322-321).',
    },
    difficulty: 'medium',
    sourceOrExam: '৩৮তম বিসিএস',
  },
  {
    id: 'math_3',
    categoryId: 'math',
    question: {
      bn: 'কোনো সংখ্যার ৬০% যদি ৯০ হয়, তবে সংখ্যাটি কত?',
      en: 'If 60% of a number is 90, what is the number?',
    },
    options: {
      bn: ['১২০', '১৪০', '১৫০', '১৮০'],
      en: ['120', '140', '150', '180'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'ধরি সংখ্যাটি x। অতএব, x × ৬০% = ৯০ => x = (৯০ × ১০০) / ৬০ = ১৫০।',
      en: 'Let the number be x. So x * 60% = 90 => x = (90 * 100) / 60 = 150.',
    },
    difficulty: 'easy',
    sourceOrExam: 'প্রাথমিক শিক্ষক নিয়োগ',
  },
  {
    id: 'math_4',
    categoryId: 'math',
    question: {
      bn: 'একটি সমকোণী ত্রিভুজের অতিভুজ ১০ সেমি এবং ভূমি ৮ সেমি হলে লম্ব কত?',
      en: 'In a right-angled triangle, if the hypotenuse is 10 cm and base is 8 cm, what is the perpendicular?',
    },
    options: {
      bn: ['৪ সেমি', '৫ সেমি', '৬ সেমি', '৭ সেমি'],
      en: ['4 cm', '5 cm', '6 cm', '7 cm'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'পিথাগোরাসের উপপাদ্য অনুযায়ী: লম্ব² + ভূমি² = অতিভুজ² => লম্ব² = ১০² - ৮² = ১০০ - ৬৪ = ৩৬ => লম্ব = ৬ সেমি।',
      en: 'By Pythagoras theorem: Perpendicular = √(10² - 8²) = √(100 - 64) = √36 = 6 cm.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪১তম বিসিএস',
  },
  {
    id: 'math_5',
    categoryId: 'math',
    question: {
      bn: 'ধারাটির পরবর্তী সংখ্যাটি কত: ৩, ৫, ৯, ১৭, ৩৩, ...?',
      en: 'What is the next number in the series: 3, 5, 9, 17, 33, ...?',
    },
    options: {
      bn: ['৪৯', '৫৫', '৬৫', '৬৬'],
      en: ['49', '55', '65', '66'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'ব্যবধানগুলো লক্ষ্য করুন: ২, ৪, ৮, ১৬, ৩২ (প্রতিবার দ্বিগুণ হচ্ছে)। সুতরাং পরবর্তী সংখ্যা = ৩৩ + ৩২ = ৬৫।',
      en: 'The differences double each time: +2, +4, +8, +16, +32. Thus 33 + 32 = 65.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪৪তম বিসিএস মানসিক দক্ষতা',
  },
  {
    id: 'math_6',
    categoryId: 'math',
    question: {
      bn: 'দুটি সংখ্যার গ.সা.গু ১২ এবং ল.সা.গু ৩৩৬। একটি সংখ্যা ৪৮ হলে অপরটি কত?',
      en: 'The HCF of two numbers is 12 and LCM is 336. If one number is 48, what is the other?',
    },
    options: {
      bn: ['৭২', '৮৪', '৯৬', '১০৮'],
      en: ['72', '84', '96', '108'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'আমরা জানি, সংখ্যা দুটির গুণফল = গ.সা.গু × ল.সা.গু। সুতরাং অপর সংখ্যা = (১২ × ৩৩৬) / ৪৮ = ৮৪।',
      en: 'Product of numbers = HCF * LCM. Other number = (12 * 336) / 48 = 84.',
    },
    difficulty: 'medium',
    sourceOrExam: 'কম্বাইন্ড ব্যাংক অফিসার',
  },
  {
    id: 'math_7',
    categoryId: 'math',
    question: {
      bn: 'একটি বৃত্তের ব্যাসার্ধ দ্বিগুণ করা হলে ক্ষেত্রফল কতগুণ বৃদ্ধি পাবে?',
      en: 'If the radius of a circle is doubled, how many times will its area increase?',
    },
    options: {
      bn: ['২ গুণ', '৩ গুণ', '৪ গুণ', '৮ গুণ'],
      en: ['2 times', '3 times', '4 times', '8 times'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'ক্ষেত্রফল = πr²। ব্যাসার্ধ 2r হলে ক্ষেত্রফল = π(2r)² = 4πr²। অর্থাৎ ক্ষেত্রফল ৪ গুণ হবে।',
      en: 'Area = πr². If radius becomes 2r, new Area = π(2r)² = 4πr², which is 4 times the original.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৯তম বিসিএস',
  },
  {
    id: 'math_8',
    categoryId: 'math',
    question: {
      bn: 'একটি ঘড়িতে যখন ৩টা বেজে ১৫ মিনিট বাজে, তখন ঘণ্টার ও মিনিটের কাঁটার মধ্যবর্তী কোণ কত?',
      en: 'At 3:15, what is the angle between the hour hand and minute hand of a clock?',
    },
    options: {
      bn: ['০°', '৭.৫°', '১৫°', '২২.৫°'],
      en: ['0°', '7.5°', '15°', '22.5°'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'কোণের সূত্র: |(৬০ × H - ১১ × M) / ২| = |(৬০ × ৩ - ১১ × ১৫) / ২| = |(১৮০ - ১৬৫) / ২| = ১৫ / ২ = ৭.৫°।',
      en: 'Formula: |(60*H - 11*M) / 2| = |(60*3 - 11*15) / 2| = 15 / 2 = 7.5 degrees.',
    },
    difficulty: 'hard',
    sourceOrExam: 'বিসিএস মানসিক দক্ষতা',
  },
  {
    id: 'math_9',
    categoryId: 'math',
    question: {
      bn: '১০ জন ব্যক্তি পরস্পরের সাথে করমর্দন (হ্যান্ডশেক) করলে মোট কতটি হ্যান্ডশেক হবে?',
      en: 'If 10 people shake hands with each other once, how many handshakes take place?',
    },
    options: {
      bn: ['৪৫টি', '৫০টি', '৯০টি', '১০০টি'],
      en: ['45', '50', '90', '100'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'সূত্র: n(n - ১) / ২ = ১০(৯) / ২ = ৪৫টি হ্যান্ডশেক হবে।',
      en: 'Handshake formula: n(n - 1) / 2 = 10 * 9 / 2 = 45 handshakes.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪৩তম বিসিএস',
  },
  {
    id: 'math_10',
    categoryId: 'math',
    question: {
      bn: 'টাকায় ৩টি করে লেবু কিনে টাকায় ২টি করে বিক্রি করলে শতকরা কত লাভ হবে?',
      en: 'If lemons bought at 3 for a taka are sold at 2 for a taka, what is the profit percentage?',
    },
    options: {
      bn: ['৩৩.৩৩%', '৫০%', '৬০%', '১০০%'],
      en: ['33.33%', '50%', '60%', '100%'],
    },
    correctIndex: 1,
    explanation: {
      bn: '১টির ক্রয়মূল্য ১/৩ টাকা, বিক্রয়মূল্য ১/২ টাকা। লাভ = ১/২ - ১/৩ = ১/৬ টাকা। শতকরা লাভ = ((১/৬) / (১/৩)) × ১০০ = ৫০%।',
      en: 'CP = 1/3, SP = 1/2. Profit = 1/6. Profit % = (1/6) / (1/3) * 100% = 50%.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৬তম বিসিএস',
  },

  // =========================================================================
  // ২. সাধারণ বিজ্ঞান ও প্রযুক্তি (Science & Tech - 10 Questions)
  // =========================================================================
  {
    id: 'sci_1',
    categoryId: 'science',
    question: {
      bn: 'সূর্যের আলো থেকে আমরা মূলত কোন ভিটামিন পাই?',
      en: 'Which vitamin do humans primarily synthesize from exposure to sunlight?',
    },
    options: {
      bn: ['ভিটামিন এ', 'ভিটামিন বি', 'ভিটামিন সি', 'ভিটামিন ডি'],
      en: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
    },
    correctIndex: 3,
    explanation: {
      bn: 'সূর্যের অতিবেগুনি রশ্মির (UVB) উপস্থিতিতে ত্বকে ভিটামিন ডি সংশ্লেষিত হয়। এটি হাড় মজবুত রাখতে অত্যন্ত জরুরি।',
      en: 'Human skin synthesizes Vitamin D when exposed to ultraviolet B (UVB) rays from sunlight.',
    },
    difficulty: 'easy',
    sourceOrExam: 'প্রাথমিক সহকারী শিক্ষক নিয়োগ',
  },
  {
    id: 'sci_2',
    categoryId: 'science',
    question: {
      bn: 'কম্পিউটারের মস্তিষ্ক (Brain of Computer) কাকে বলা হয়?',
      en: 'Which component is known as the "Brain of the Computer"?',
    },
    options: {
      bn: ['RAM', 'CPU (Central Processing Unit)', 'Hard Disk', 'Motherboard'],
      en: ['RAM', 'CPU (Central Processing Unit)', 'Hard Disk', 'Motherboard'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'সিপিইউ (CPU) সমস্ত গাণিতিক, যৌক্তিক হিসাব-নিকাশ ও নির্দেশাবলী পরিচালনা করে বলে একে কম্পিউটারের মস্তিষ্ক বলা হয়।',
      en: 'The CPU processes arithmetic calculations, logical comparisons, and control commands.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪০তম বিসিএস',
  },
  {
    id: 'sci_3',
    categoryId: 'science',
    question: {
      bn: 'মানবদেহে স্বাভাবিক অবস্থায় রক্তের চাপ (Blood Pressure) কত ধরা হয়?',
      en: 'What is considered normal resting blood pressure for a healthy human adult?',
    },
    options: {
      bn: ['৮০/১২০ mmHg', '১২০/৮০ mmHg', '১০০/৭০ mmHg', '১৪০/৯০ mmHg'],
      en: ['80/120 mmHg', '120/80 mmHg', '100/70 mmHg', '140/90 mmHg'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'স্বাভাবিক পূর্ণবয়স্ক মানুষের রক্তচাপ হলো ১২০/৮০ মিলিমিটার পারদ (১২০ সিস্টোলিক এবং ৮০ ডায়াস্টোলিক চাপ)।',
      en: 'Normal resting blood pressure is approx 120/80 mmHg (120 systolic, 80 diastolic).',
    },
    difficulty: 'easy',
    sourceOrExam: '৪২তম বিসিএস বিশেষ',
  },
  {
    id: 'sci_4',
    categoryId: 'science',
    question: {
      bn: 'বায়ুমণ্ডলে কোন গ্যাসের পরিমাণ সবচেয়ে বেশি?',
      en: 'Which gas is most abundant in the Earth\'s atmosphere?',
    },
    options: {
      bn: ['অক্সিজেন', 'নাইট্রোজেন', 'কার্বন ডাই অক্সাইড', 'আর্গন'],
      en: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'বায়ুমণ্ডলে নাইট্রোজেনের পরিমাণ প্রায় ৭৮.০৯%, অক্সিজেনের পরিমাণ প্রায় ২০.৯৫% এবং আর্গন প্রায় ০.৯৩%।',
      en: 'Nitrogen makes up approx 78.09% of Earth\'s atmosphere, followed by Oxygen at ~20.95%.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪৪তম বিসিএস',
  },
  {
    id: 'sci_5',
    categoryId: 'science',
    question: {
      bn: 'কোন বিজ্ঞানী মহাকর্ষ বল (Gravitation) ও গতির সূত্র আবিষ্কার করেন?',
      en: 'Which scientist formulated the laws of motion and universal gravitation?',
    },
    options: {
      bn: ['আলবার্ট আইনস্টাইন', 'স্যার আইজ্যাক নিউটন', 'গ্যালিলিও গ্যালিলি', 'নিকোলা টেসলা'],
      en: ['Albert Einstein', 'Sir Isaac Newton', 'Galileo Galilei', 'Nikola Tesla'],
    },
    correctIndex: 1,
    explanation: {
      bn: '১৬৮৭ সালে স্যার আইজ্যাক নিউটন তাঁর বিখ্যাত গ্রন্থ "ফিলোসফিয়া ন্যাচুরালিস প্রিন্সিপিয়া ম্যাথমেটিকা"য় মহাকর্ষ ও গতির ৩টি সূত্র প্রকাশ করেন।',
      en: 'Sir Isaac Newton published the laws of motion and universal gravitation in 1687.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৭তম বিসিএস',
  },
  {
    id: 'sci_6',
    categoryId: 'science',
    question: {
      bn: 'রক্তে হিমোগ্লোবিনের প্রধান কাজ কী?',
      en: 'What is the primary function of hemoglobin in blood?',
    },
    options: {
      bn: ['অক্সিজেন পরিবহন করা', 'রোগ প্রতিরোধ করা', 'রক্ত জমাট বাঁধতে সাহায্য করা', 'হজম বাড়ানো'],
      en: ['Transporting oxygen', 'Fighting infections', 'Clotting blood', 'Aiding digestion'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'লোহিত রক্তকণিকায় অবস্থিত আয়রনযুক্ত প্রোটিন হিমোগ্লোবিন ফুসফুস থেকে সারা দেহে অক্সিজেন পরিবহন করে।',
      en: 'Hemoglobin in red blood cells binds and carries oxygen from lungs throughout the body.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪১তম বিসিএস',
  },
  {
    id: 'sci_7',
    categoryId: 'science',
    question: {
      bn: 'শব্দ কোন মাধ্যমের ভেতর দিয়ে ভ্রমণ করতে পারে না?',
      en: 'Through which medium can sound waves NOT travel?',
    },
    options: {
      bn: ['কঠিন', 'তরল', 'বায়বীয়', 'শূন্য মাধ্যম (Vacuum)'],
      en: ['Solid', 'Liquid', 'Gas', 'Vacuum'],
    },
    correctIndex: 3,
    explanation: {
      bn: 'শব্দ একটি যান্ত্রিক তরঙ্গ হওয়ায় সঞ্চালনের জন্য মাধ্যম প্রয়োজন। তাই মহাশূন্য বা শূন্য মাধ্যমে শব্দ শোনা যায় না।',
      en: 'Sound is a mechanical wave requiring a material medium; it cannot propagate in a vacuum.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৯তম বিসিএস',
  },
  {
    id: 'sci_8',
    categoryId: 'science',
    question: {
      bn: 'পানির রাসায়নিক সংকেত H2O। এতে হাইড্রোজেন ও অক্সিজেনের ভরের অনুপাত কত?',
      en: 'In water (H2O), what is the mass ratio of hydrogen to oxygen?',
    },
    options: {
      bn: ['১ : ২', '১ : ৮', '২ : ১', '১ : ১৬'],
      en: ['1 : 2', '1 : 8', '2 : 1', '1 : 16'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'পানির আণবিক ভর ১৮ (হাইড্রোজেন ২ × ১ = ২, অক্সিজেন ১৬)। ভরের অনুপাত = ২ : ১৬ = ১ : ৮।',
      en: 'Mass of H = 2, Mass of O = 16. Mass ratio = 2 : 16 = 1 : 8.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪৫তম বিসিএস',
  },
  {
    id: 'sci_9',
    categoryId: 'science',
    question: {
      bn: 'কম্পিউটারে ১ গিগাবাইট (1 GB) সমান কত মেগাবাইট (MB)?',
      en: 'In computer storage, 1 Gigabyte (1 GB) equals how many Megabytes (MB)?',
    },
    options: {
      bn: ['১০০০ MB', '১০২৪ MB', '১০৪৮ MB', '৫১২ MB'],
      en: ['1000 MB', '1024 MB', '1048 MB', '512 MB'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'বাইনারি হিসাব অনুযায়ী ১ গিগাবাইট (GB) = ১০২৪ মেগাবাইট (MB) এবং ১ মেগাবাইট = ১০২৪ কিলোবাইট (KB)।',
      en: 'In binary storage convention, 1 GB = 1024 MB and 1 MB = 1024 KB.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪৩তম বিসিএস আইসিটি',
  },
  {
    id: 'sci_10',
    categoryId: 'science',
    question: {
      bn: 'সৌরজগতের সবচেয়ে উত্তপ্ত গ্রহ কোনটি?',
      en: 'Which is the hottest planet in our solar system?',
    },
    options: {
      bn: ['বুধ (Mercury)', 'শুক্র (Venus)', 'মঙ্গল (Mars)', 'বৃহস্পতি (Jupiter)'],
      en: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'ঘন কার্বন ডাই অক্সাইডের বায়ুমণ্ডল ও তীব্র গ্রিনহাউস প্রতিক্রিয়ার কারণে শুক্র (Venus) সৌরজগতের সবচেয়ে উত্তপ্ত গ্রহ (তাপমাত্রা প্রায় ৪৬৫° সেলসিয়াস)।',
      en: 'Due to thick CO2 atmosphere and runaway greenhouse effect, Venus is the hottest planet (~465°C).',
    },
    difficulty: 'medium',
    sourceOrExam: '৩৬তম বিসিএস',
  },

  // =========================================================================
  // ৩. ইতিহাস ও ঐতিহ্য (History & Heritage - 10 Questions)
  // =========================================================================
  {
    id: 'hist_1',
    categoryId: 'history',
    question: {
      bn: '১৯৭১ সালে মুক্তিযুদ্ধের সময় সমগ্র বাংলাদেশকে কতটি সেক্টরে ভাগ করা হয়?',
      en: 'Into how many operational sectors was Bangladesh divided during the 1971 Liberation War?',
    },
    options: {
      bn: ['৭টি', '১০টি', '১১টি', '৬৪টি'],
      en: ['7', '10', '11', '64'],
    },
    correctIndex: 2,
    explanation: {
      bn: '১৯৭১ সালের জুলাইয়ে সমগ্র বাংলাদেশকে ১১টি সামরিক সেক্টরে এবং ৬৪টি সাব-সেক্টরে বিভক্ত করা হয়।',
      en: 'In July 1971, Bangladesh was divided into 11 operational sectors and 64 sub-sectors.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪১তম বিসিএস',
  },
  {
    id: 'hist_2',
    categoryId: 'history',
    question: {
      bn: 'ঐতিহাসিক পলাশীর যুদ্ধ কত সালে অনুষ্ঠিত হয়েছিল?',
      en: 'In which year did the historic Battle of Plassey take place?',
    },
    options: {
      bn: ['১৭৫৭ সালের ২৩ জুন', '১৭৬৪ সালের ২২ অক্টোবর', '১৭৬১ সালের ১৪ জানুয়ারি', '১৭৭২ সালের ১২ আগস্ট'],
      en: ['23 June 1757', '22 October 1764', '14 January 1761', '12 August 1772'],
    },
    correctIndex: 0,
    explanation: {
      bn: '১৭৫৭ সালের ২৩ জুন ভাগীরথী নদীর তীরে পলাশীর আম্রকাননে নবাব সিরাজউদ্দৌলা ও রবার্ট ক্লাইভের মধ্যে যুদ্ধ হয় এবং মীর জাফরের বিশ্বাসঘাতকতায় নবাব পরাজিত হন।',
      en: 'The Battle of Plassey took place on 23 June 1757, leading to British East India Company control over Bengal.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৮তম বিসিএস',
  },
  {
    id: 'hist_3',
    categoryId: 'history',
    question: {
      bn: '১৯৫২ সালের ২১ ফেব্রুয়ারি বাংলা কোন সনের কোন তারিখ ছিল?',
      en: 'What was the date in the Bengali calendar on 21 February 1952?',
    },
    options: {
      bn: ['৭ ফাল্গুন ১৩৫৮', '৮ ফাল্গুন ১৩৫৮', '২১ ফাল্গুন ১৩৫৮', '১ চৈত্র ১৩৫৮'],
      en: ['7 Falgun 1358', '8 Falgun 1358', '21 Falgun 1358', '1 Choitro 1358'],
    },
    correctIndex: 1,
    explanation: {
      bn: '১৯৫২ সালের ২১ ফেব্রুয়ারি বাংলা সনের তারিখ ছিল ৮ ফাল্গুন ১৩৫৮ বঙ্গাব্দ, রোজ বৃহস্পতিবার।',
      en: '21 February 1952 corresponded to 8 Falgun 1358 in the Bengali calendar.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪৪তম বিসিএস',
  },
  {
    id: 'hist_4',
    categoryId: 'history',
    question: {
      bn: 'মুঘল সাম্রাজ্যের প্রতিষ্ঠাতা কে ছিলেন?',
      en: 'Who was the founder of the Mughal Empire?',
    },
    options: {
      bn: ['সম্রাট আকবর', 'সম্রাট বাবর', 'সম্রাট হুমায়ুন', 'সম্রাট জাহাঙ্গীর'],
      en: ['Emperor Akbar', 'Emperor Babur', 'Emperor Humayun', 'Emperor Jahangir'],
    },
    correctIndex: 1,
    explanation: {
      bn: '১৫২৬ সালে পানিপথের প্রথম যুদ্ধে ইব্রাহিম লোদিকে পরাজিত করে জহিরউদ্দিন মুহাম্মদ বাবর ভারতে মুঘল সাম্রাজ্য প্রতিষ্ঠা করেন।',
      en: 'Zahir-ud-din Muhammad Babur founded the Mughal Empire in 1526 after winning the First Battle of Panipat.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৯তম বিসিএস',
  },
  {
    id: 'hist_5',
    categoryId: 'history',
    question: {
      bn: 'বাঙালি জাতির মুক্তির সনদ "ছয় দফা" কত সালে প্রথম ঘোষণা করা হয়?',
      en: 'In which year was the historic 6-Point Charter of Demands announced?',
    },
    options: {
      bn: ['১৯৫২', '১৯৬৬', '১৯৬৯', '১৯৭০'],
      en: ['1952', '1966', '1969', '1970'],
    },
    correctIndex: 1,
    explanation: {
      bn: '১৯৬৬ সালের ৫-৬ ফেব্রুয়ারি লাহোরে বিরোধী দলসমূহের এক সম্মেলনে বঙ্গবন্ধু শেখ মুজিবুর রহমান ঐতিহাসিক ছয় দফা দাবি পেশ করেন।',
      en: 'Bangabandhu Sheikh Mujibur Rahman formally presented the 6-Point Movement in Lahore in February 1966.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪০তম বিসিএস',
  },
  {
    id: 'hist_6',
    categoryId: 'history',
    question: {
      bn: 'প্রাচীন বাংলার প্রথম স্বাধীন ও সার্বভৌম রাজা কে ছিলেন?',
      en: 'Who was the first sovereign king of ancient Bengal?',
    },
    options: {
      bn: ['ধর্মপাল', 'গোপাল', 'রাজা শশাঙ্ক', 'লক্ষণ সেন'],
      en: ['Dharmapala', 'Gopala', 'King Shashanka', 'Lakshmana Sena'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'সপ্তম শতকে গৌড়ের শাসক রাজা শশাঙ্ক ছিলেন প্রাচীন বাংলার প্রথম স্বাধীন ও সার্বভৌম নৃপতি। তাঁর রাজধানী ছিল কর্ণসুবর্ণ।',
      en: 'King Shashanka of Gauda (7th century) was the first independent ruler of unified Bengal with capital at Karnasuvarna.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪৩তম বিসিএস',
  },
  {
    id: 'hist_7',
    categoryId: 'history',
    question: {
      bn: 'প্রথম বিশ্বযুদ্ধ কত সালে শুরু হয় এবং কত সালে সমাপ্ত হয়?',
      en: 'What were the start and end years of World War I?',
    },
    options: {
      bn: ['১৯১২ - ১৯১৬', '১৯১৪ - ১৯১৮', '১৯৩৯ - ১৯৪৫', '১৯০৫ - ১৯১১'],
      en: ['1912 - 1916', '1914 - 1918', '1939 - 1945', '1905 - 1911'],
    },
    correctIndex: 1,
    explanation: {
      bn: '২৮ জুলাই ১৯১৪ সালে প্রথম বিশ্বযুদ্ধ শুরু হয় এবং ১১ নভেম্বর ১৯১৮ সালে যুদ্ধবিরতি চুক্তির মাধ্যমে সমাপ্ত হয়।',
      en: 'World War I began on 28 July 1914 and concluded on 11 November 1918.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৬তম বিসিএস',
  },
  {
    id: 'hist_8',
    categoryId: 'history',
    question: {
      bn: '১৯৭১ সালের ১৬ ডিসেম্বর পাকিস্তানি হানাদার বাহিনীর আত্মসমর্পণের দলিল কোথায় স্বাক্ষরিত হয়?',
      en: 'Where was the Instrument of Surrender signed on 16 December 1971?',
    },
    options: {
      bn: ['রেসকোর্স ময়দান (সোহরাওয়ার্দী উদ্যান)', 'ঢাকা সেনানিবাস', 'বঙ্গভবন', 'লালবাগ কেল্লা'],
      en: ['Race Course Maidan (Suhrawardy Udyan)', 'Dhaka Cantonment', 'Bangabhaban', 'Lalbagh Fort'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'তৎকালীন রেসকোর্স ময়দানে (বর্তমান সোহরাওয়ার্দী উদ্যান) জেনারেল এ কে নিয়াজী যৌথবাহিনীর লেফটেন্যান্ট জেনারেল জগজিৎ সিং অরোরার কাছে আত্মসমর্পণ দলিলে স্বাক্ষর করেন।',
      en: 'Signed at Race Course Maidan (now Suhrawardy Udyan) by Gen. Niazi to Lt. Gen. Jagjit Singh Aurora.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪২তম বিসিএস',
  },
  {
    id: 'hist_9',
    categoryId: 'history',
    question: {
      bn: 'ফরাসি বিপ্লব (French Revolution) কত সালে সংঘটিত হয়েছিল?',
      en: 'In which year did the French Revolution break out?',
    },
    options: {
      bn: ['১৭৭৬ সালে', '১৭৮৯ সালে', '১৮০৪ সালে', '১৮১৫ সালে'],
      en: ['1776', '1789', '1804', '1815'],
    },
    correctIndex: 1,
    explanation: {
      bn: '১৪ জুলাই ১৭৮৯ সালে বাস্তিল দুর্গের পতনের মধ্য দিয়ে ফরাসি বিপ্লব শুরু হয়। এর মূল বাণী ছিল "সাম্য, মৈত্রী ও স্বাধীনতা" (Liberty, Equality, Fraternity)।',
      en: 'The French Revolution commenced in 1789 with the storming of the Bastille, promoting Liberty, Equality, Fraternity.',
    },
    difficulty: 'medium',
    sourceOrExam: '৩৭তম বিসিএস',
  },
  {
    id: 'hist_10',
    categoryId: 'history',
    question: {
      bn: 'ঐতিহাসিক লাহোর প্রস্তাব কে উত্থাপন করেছিলেন?',
      en: 'Who moved the historic Lahore Resolution in 1940?',
    },
    options: {
      bn: ['মুহাম্মদ আলী জিন্নাহ', 'শেরে বাংলা এ কে ফজলুল হক', 'হোসেন শহীদ সোহরাওয়ার্দী', 'নবাব সলিমুল্লাহ'],
      en: ['Muhammad Ali Jinnah', 'Sher-e-Bangla A. K. Fazlul Huq', 'Huseyn Shaheed Suhrawardy', 'Nawab Salimullah'],
    },
    correctIndex: 1,
    explanation: {
      bn: '২৩ মার্চ ১৯৪০ সালে নিখিল ভারত মুসলিম লীগের লাহোর অধিবেশনে বাংলার তৎকালীন প্রধানমন্ত্রী শেরে বাংলা এ কে ফজলুল হক লাহোর প্রস্তাব পেশ করেন।',
      en: 'Sher-e-Bangla A. K. Fazlul Huq presented the historic Lahore Resolution on 23 March 1940.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪৫তম বিসিএস',
  },

  // =========================================================================
  // ৪. ভূগোল ও পরিবেশ (Geography & Environment - 10 Questions)
  // =========================================================================
  {
    id: 'geo_1',
    categoryId: 'geography',
    question: {
      bn: 'বিশ্বের বৃহত্তম ম্যানগ্রোভ বন কোনটি?',
      en: 'Which is the largest mangrove forest in the world?',
    },
    options: {
      bn: ['আমাজন রেইনফরেস্ট', 'সুন্দরবন', 'কঙ্গো অববাহিকা', 'ব্ল্যাক ফরেস্ট'],
      en: ['Amazon Rainforest', 'Sundarbans', 'Congo Basin', 'Black Forest'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'সুন্দরবন বিশ্বের বৃহত্তম অবিচ্ছিন্ন ম্যানগ্রোভ বন। এর প্রায় ৬০% বাংলাদেশে এবং ৪০% ভারতে অবস্থিত। ১৯৯৭ সালে ইউনেস্কো এটিকে বিশ্ব ঐতিহ্য ঘোষণা করে।',
      en: 'The Sundarbans is the world\'s largest mangrove forest (60% in Bangladesh, 40% in India).',
    },
    difficulty: 'easy',
    sourceOrExam: '৪৪তম বিসিএস',
  },
  {
    id: 'geo_2',
    categoryId: 'geography',
    question: {
      bn: 'বিশ্বের সবচেয়ে দীর্ঘতম নদী কোনটি?',
      en: 'Which is the longest river in the world?',
    },
    options: {
      bn: ['আমাজন নদী', 'নীলনদ (Nile)', 'ইয়াংসিকিয়াং', 'মিসিসিপি নদী'],
      en: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'আফ্রিকা মহাদেশের নীলনদ (প্রায় ৬,৬৫০ কিমি) বিশ্বের দীর্ঘতম নদী। তবে পানির প্রবাহ ও অববাহিকার দিক থেকে আমাজন বিশ্বের বৃহত্তম নদী।',
      en: 'The Nile in Africa (~6,650 km) is the longest river. The Amazon is the largest by water volume.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৮তম বিসিএস',
  },
  {
    id: 'geo_3',
    categoryId: 'geography',
    question: {
      bn: 'বাংলাদেশের সর্বউত্তরের উপজেলা কোনটি?',
      en: 'Which is the northernmost upazila of Bangladesh?',
    },
    options: {
      bn: ['তেঁতুলিয়া', 'রুমা', 'টেকনাফ', 'শ্যামনগর'],
      en: ['Tetulia', 'Ruma', 'Teknaf', 'Shyamnagar'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'পঞ্চগড় জেলার তেঁতুলিয়া হলো বাংলাদেশের সর্বউত্তরের উপজেলা এবং তেঁতুলিয়ার বাংলাবান্ধা সর্বউত্তরের স্থান।',
      en: 'Tetulia in Panchagarh district is the northernmost upazila of Bangladesh.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪১তম বিসিএস',
  },
  {
    id: 'geo_4',
    categoryId: 'geography',
    question: {
      bn: 'পৃথিবীর সর্বোচ্চ মালভূমির নাম কী?',
      en: 'What is the highest plateau in the world, often called the "Roof of the World"?',
    },
    options: {
      bn: ['পামির মালভূমি / তিব্বত মালভূমি', 'দাক্ষিণাত্যের মালভূমি', 'কলোরাডো মালভূমি', 'আনাতোলিয়া মালভূমি'],
      en: ['Pamir / Tibetan Plateau', 'Deccan Plateau', 'Colorado Plateau', 'Anatolian Plateau'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'পামির মালভূমি ও তিব্বত মালভূমিকে পৃথিবীর ছাদ (Roof of the World) বলা হয়। এর গড় উচ্চতা সমুদ্রপৃষ্ঠ থেকে ৪,৫০০ মিটারের বেশি।',
      en: 'The Tibetan/Pamir Plateau is known as the "Roof of the World" due to its extreme altitude (~4,500m).',
    },
    difficulty: 'medium',
    sourceOrExam: '৪০তম বিসিএস',
  },
  {
    id: 'geo_5',
    categoryId: 'geography',
    question: {
      bn: 'কোন কাল্পনিক অক্ষাংশ রেখাটি বাংলাদেশের প্রায় মাঝ বরাবর অতিক্রম করেছে?',
      en: 'Which latitude line passes through the central part of Bangladesh?',
    },
    options: {
      bn: ['বিষুবরেখা', 'কর্কটক্রান্তি রেখা (Tropic of Cancer)', 'মকরক্রান্তি রেখা', 'আন্তর্জাতিক তারিখ রেখা'],
      en: ['Equator (0°)', 'Tropic of Cancer (23.5° N)', 'Tropic of Capricorn (23.5° S)', 'International Date Line'],
    },
    correctIndex: 1,
    explanation: {
      bn: '২৩.৫° উত্তর অক্ষাংশ অর্থাৎ কর্কটক্রান্তি রেখা বাংলাদেশের প্রায় মধ্য দিয়ে (চুয়াডাঙ্গা, ঝিনাইদহ, মাগুরা, ফরিদপুর, ঢাকা, কুমিল্লা) অতিক্রম করেছে।',
      en: 'The Tropic of Cancer (23.5° N) crosses right through the middle of Bangladesh.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪৩তম বিসিএস',
  },
  {
    id: 'geo_6',
    categoryId: 'geography',
    question: {
      bn: 'বিশ্বের বৃহত্তম মরুভূমি কোনটি?',
      en: 'Which is the largest desert in the world?',
    },
    options: {
      bn: ['সাহারা মরুভূমি', 'অ্যান্টার্কটিকা মরুভূমি', 'গোবি মরুভূমি', 'কালাহারি মরুভূমি'],
      en: ['Sahara Desert', 'Antarctic Desert', 'Gobi Desert', 'Kalahari Desert'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'সামগ্রিকভাবে অ্যান্টার্কটিকা মেরু মরুভূমি বিশ্বের বৃহত্তম মরুভূমি (শীতল মরুভূমি)। আর উষ্ণ মরুভূমির মধ্যে আফ্রিকার সাহারা মরুভূমি বৃহত্তম।',
      en: 'The Antarctic Desert is the largest overall desert (polar desert). Sahara is the largest hot desert.',
    },
    difficulty: 'medium',
    sourceOrExam: '৩৯তম বিসিএস',
  },
  {
    id: 'geo_7',
    categoryId: 'geography',
    question: {
      bn: 'বাংলাদেশের একমাত্র প্রবাল দ্বীপ কোনটি?',
      en: 'Which is the only coral island of Bangladesh?',
    },
    options: {
      bn: ['স্যান্ডউইপ', 'হাতিয়া', 'সেন্টমার্টিন দ্বীপ', 'নিঝুম দ্বীপ'],
      en: ['Sandwip', 'Hatiya', 'Saint Martin\'s Island', 'Nijhum Dwip'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'কক্সবাজার জেলার টেকনাফ থেকে প্রায় ৯ কিলোমিটার দক্ষিণে বঙ্গোপসাগরে অবস্থিত সেন্টমার্টিন দ্বীপ বাংলাদেশের একমাত্র প্রবাল দ্বীপ। স্থানীয় নাম নারিকেল জিঞ্জিরা।',
      en: 'Saint Martin\'s Island in the Bay of Bengal is the only coral island in Bangladesh.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৭তম বিসিএস',
  },
  {
    id: 'geo_8',
    categoryId: 'geography',
    question: {
      bn: 'ওজোন স্তর (Ozone Layer) বায়ুমণ্ডলের কোন স্তরে অবস্থান করে?',
      en: 'In which atmospheric layer is the protective ozone layer predominantly found?',
    },
    options: {
      bn: ['ট্রপোস্ফিয়ার', 'স্ট্র্যাটোস্ফিয়ার (Stratosphere)', 'মেসোস্ফিয়ার', 'থার্মোস্ফিয়ার'],
      en: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'স্ট্র্যাটোস্ফিয়ারে ওজোন গ্যাসের স্তর থাকে, যা সূর্যের ক্ষতিকর অতিবেগুনি রশ্মি (UV radiation) শোষণ করে পৃথিবীকে রক্ষা করে।',
      en: 'The ozone layer is concentrated in the stratosphere, shielding Earth from harmful ultraviolet radiation.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪২তম বিসিএস',
  },
  {
    id: 'geo_9',
    categoryId: 'geography',
    question: {
      bn: 'বাংলাদেশ ও ভারতকে বিভক্তকারী সীমান্ত নদী কোনটি?',
      en: 'Which border river divides Bangladesh and India in the southwest (Sundarbans area)?',
    },
    options: {
      bn: ['পদ্মা নদী', 'হাঁড়িভাঙ্গা নদী', 'মেঘনা নদী', 'নাফ নদী'],
      en: ['Padma River', 'Haribhanga River', 'Meghna River', 'Naf River'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'হাঁড়িভাঙ্গা নদী বাংলাদেশ ও ভারতের সীমান্ত নির্দেশ করে (দক্ষিণ তালপট্টি দ্বীপের সন্নিকটে)। আর নাফ নদী বাংলাদেশ ও মিয়ানমারকে বিভক্ত করেছে।',
      en: 'The Haribhanga River delineates the border between Bangladesh and India. Naf River borders Myanmar.',
    },
    difficulty: 'medium',
    sourceOrExam: '৩৬তম বিসিএস',
  },
  {
    id: 'geo_10',
    categoryId: 'geography',
    question: {
      bn: 'হিমালয়ের রানী (Queen of the Hills) বলা হয় কোন পাহাড়ি শহরকে?',
      en: 'Which hill station is traditionally referred to as the "Queen of the Hills"?',
    },
    options: {
      bn: ['দার্জিলিং', 'শিলং', 'মানালি', 'কাশ্মীর'],
      en: ['Darjeeling', 'Shillong', 'Manali', 'Kashmir'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'ভারতের পশ্চিমবঙ্গ রাজ্যের কাঞ্চনজঙ্ঘার মনোরম পাদদেশে অবস্থিত দার্জিলিংকে হিমালয়ের রানী বা কুইন অব দ্য হিলস বলা হয়।',
      en: 'Darjeeling in West Bengal, renowned for tea and Kanchenjunga views, is titled Queen of the Hills.',
    },
    difficulty: 'easy',
    sourceOrExam: 'সাধারণ জ্ঞান আন্তর্জাতিক',
  },

  // =========================================================================
  // ৫. সাহিত্য ও সংস্কৃতি (Literature & Culture - 10 Questions)
  // =========================================================================
  {
    id: 'lit_1',
    categoryId: 'literature',
    question: {
      bn: 'রবীন্দ্রনাথ ঠাকুর কত সালে গীতাঞ্জলি কাব্যের জন্য সাহিত্যে নোবেল পুরস্কার লাভ করেন?',
      en: 'In which year was Rabindranath Tagore awarded the Nobel Prize in Literature?',
    },
    options: {
      bn: ['১৯১১ সালে', '১৯১৩ সালে', '১৯১৫ সালে', '১৯২১ সালে'],
      en: ['1911', '1913', '1915', '1921'],
    },
    correctIndex: 1,
    explanation: {
      bn: '১৯১৩ সালে রবীন্দ্রনাথ ঠাকুর "Song Offerings" (গীতাঞ্জলির ইংরেজি সংস্করণ) কাব্যের জন্য প্রথম অ-ইউরোপীয় ও এশীয় হিসেবে সাহিত্যে নোবেল পান।',
      en: 'Rabindranath Tagore won the Nobel Prize in Literature in 1913 for Song Offerings (Gitanjali).',
    },
    difficulty: 'easy',
    sourceOrExam: '৪০তম বিসিএস',
  },
  {
    id: 'lit_2',
    categoryId: 'literature',
    question: {
      bn: 'কাজী নজরুল ইসলামের বিখ্যাত "বিদ্রোহী" কবিতাটি কোন কাব্যগ্রন্থের অন্তর্ভুক্ত?',
      en: 'Kazi Nazrul Islam\'s famous poem "Bidrohi" (The Rebel) is part of which poetry book?',
    },
    options: {
      bn: ['অগ্নিবীণা', 'বিষের বাঁশী', 'প্রলয়শিখা', 'সর্বহারা'],
      en: ['Agni-Bina', 'Bisher Bashi', 'Pralayshikha', 'Sarbahara'],
    },
    correctIndex: 0,
    explanation: {
      bn: '১৯২২ সালে প্রকাশিত নজরুলের প্রথম কাব্যগ্রন্থ "অগ্নিবীণা"-র দ্বিতীয় কবিতা হলো "বিদ্রোহী"। প্রথম কবিতা ছিল "প্রলয়োল্লাস"।',
      en: '"Bidrohi" was included in Nazrul\'s debut poetry collection "Agni-Bina" published in 1922.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৮তম বিসিএস',
  },
  {
    id: 'lit_3',
    categoryId: 'literature',
    question: {
      bn: 'বাংলা সাহিত্যের প্রাচীনতম নিদর্শন "চর্যাপদ" কোন ছন্দে রচিত?',
      en: 'In which poetic meter is the ancient Bengali literature "Charyapada" composed?',
    },
    options: {
      bn: ['অক্ষরবৃত্ত ছন্দ', 'মাত্রাবৃত্ত ছন্দ', 'পয়ার ছন্দ', 'গদ্য ছন্দ'],
      en: ['Aksharbritto', 'Matrabritto', 'Poyar', 'Prose'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'চর্যাপদের পদগুলো মূলত প্রাচীন মাত্রাবৃত্ত বা পাদাকুলক ছন্দে রচিত বৌদ্ধ সহজিয়া সাধকদের আধ্যাত্মিক সাধনগীত।',
      en: 'Charyapada songs were composed in early Matrabritto meter by Buddhist tantric poets.',
    },
    difficulty: 'hard',
    sourceOrExam: '৪৩তম বিসিএস বাংলা সাহিত্য',
  },
  {
    id: 'lit_4',
    categoryId: 'literature',
    question: {
      bn: 'বাংলা সাহিত্যের প্রথম সার্থক উপন্যাস কোনটি?',
      en: 'Which is recognized as the first successful novel in Bengali literature?',
    },
    options: {
      bn: ['আলালের ঘরের দুলাল', 'পদ্মার পলিদ্বীপ', 'দুর্গেশনন্দিনী', 'চোখের বালি'],
      en: ['Alaler Ghorer Dulal', 'Padmar Polidwip', 'Durgeshnandini', 'Chokher Bali'],
    },
    correctIndex: 2,
    explanation: {
      bn: '১৮৬৫ সালে বঙ্কিমচন্দ্র চট্টোপাধ্যায় রচিত "দুর্গেশনন্দিনী" বাংলা সাহিত্যের প্রথম পূর্ণাঙ্গ ও সার্থক উপন্যাস।',
      en: '"Durgeshnandini" written by Bankim Chandra Chattopadhyay in 1865 is the first successful Bengali novel.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪১তম বিসিএস',
  },
  {
    id: 'lit_5',
    categoryId: 'literature',
    question: {
      bn: 'বাংলা ভাষার প্রথম মহাকাব্য "মেঘনাদবধ কাব্য" কার রচনা?',
      en: 'Who composed the first modern epic poem in Bengali, "Meghnad Badh Kavya"?',
    },
    options: {
      bn: ['মাইকেল মধুসূদন দত্ত', 'হেমচন্দ্র বন্দ্যোপাধ্যায়', 'নবীনচন্দ্র সেন', 'কায়কোবাদ'],
      en: ['Michael Madhusudan Dutt', 'Hemchandra Bandyopadhyay', 'Nabinchandra Sen', 'Kaikobad'],
    },
    correctIndex: 0,
    explanation: {
      bn: '১৮৬১ সালে অমিত্রাক্ষর ছন্দে রচিত ৯টি সর্গে বিভক্ত "মেঘনাদবধ কাব্য" মাইকেল মধুসূদন দত্তের শ্রেষ্ঠ অমর সৃষ্টি।',
      en: 'Written in blank verse in 1861, "Meghnad Badh Kavya" is Michael Madhusudan Dutt\'s magnum opus.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪৪তম বিসিএস',
  },
  {
    id: 'lit_6',
    categoryId: 'literature',
    question: {
      bn: 'মুক্তিযুদ্ধভিত্তিক বিখ্যাত উপন্যাস "রাইফেল রোটি আওরাত" এর লেখক কে?',
      en: 'Who wrote the prominent 1971 Liberation War novel "Rifle Roti Aurat"?',
    },
    options: {
      bn: ['শওকত ওসমান', 'আনোয়ার পাশা', 'সেলিনা হোসেন', 'সৈয়দ শামসুল হক'],
      en: ['Shawkat Osman', 'Anwar Pasha', 'Selina Hossain', 'Syed Shamsul Haq'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'ঢাকা বিশ্ববিদ্যালয়ের শহীদ বুদ্ধিজীবী আনোয়ার পাশা ১৯৭১ সালের এপ্রিল-জুনের মুক্তিযুদ্ধের বিভীষিকার প্রত্যক্ষ অভিজ্ঞতায় উপন্যাসটি লিখেছিলেন।',
      en: 'Martyred intellectual Anwar Pasha wrote "Rifle Roti Aurat" inside occupied Dhaka in 1971.',
    },
    difficulty: 'medium',
    sourceOrExam: '৩৯তম বিসিএস',
  },
  {
    id: 'lit_7',
    categoryId: 'literature',
    question: {
      bn: 'বাংলা একাডেমি কত সালে প্রতিষ্ঠিত হয়?',
      en: 'In which year was Bangla Academy established?',
    },
    options: {
      bn: ['১৯৫২ সালের ২১ ফেব্রুয়ারি', '১৯৫৫ সালের ৩ ডিসেম্বর', '১৯৭১ সালের ১৬ ডিসেম্বর', '১৯৬০ সালের ১ জানুয়ারি'],
      en: ['21 February 1952', '3 December 1955', '16 December 1971', '1 January 1960'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'ভাষা আন্দোলনের প্রত্যক্ষ ফসল হিসেবে ১৯৫৫ সালের ৩ ডিসেম্বর বর্ধমান হাউসে বাংলা একাডেমি প্রতিষ্ঠিত হয়।',
      en: 'Bangla Academy was established on 3 December 1955 at Burdwan House as a fruition of the Language Movement.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪২তম বিসিএস',
  },
  {
    id: 'lit_8',
    categoryId: 'literature',
    question: {
      bn: '"লালসালু" উপন্যাসের প্রধান চরিত্র কোনটি?',
      en: 'Who is the central character of Syed Waliullah\'s classic novel "Lalsalu"?',
    },
    options: {
      bn: ['মজিদ', 'রহিমা', 'জমিলা', 'খালেক ব্যাপারী'],
      en: ['Majeed', 'Rahima', 'Jamila', 'Khaleque Bepari'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'সৈয়দ ওয়ালীউল্লাহর ১৯৪৮ সালে রচিত "লালসালু" উপন্যাসের কেন্দ্রীয় চরিত্র ভণ্ড পীর রূপী "মজিদ", যে মাজারকে কেন্দ্র করে মানুষের অন্ধ বিশ্বাসকে শোষণ করে।',
      en: 'Majeed is the cunning opportunist protagonist of Syed Waliullah\'s famous 1948 existentialist novel Lalsalu.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৭তম বিসিএস',
  },
  {
    id: 'lit_9',
    categoryId: 'literature',
    question: {
      bn: 'আন্তর্জাতিক সাহিত্যের অমর বিয়োগান্ত নাটক "হ্যামলেট" (Hamlet) এর রচয়িতা কে?',
      en: 'Who wrote the legendary tragedy play "Hamlet"?',
    },
    options: {
      bn: ['উইলিয়াম শেক্সপিয়র', 'জর্জ বার্নার্ড শ', 'জন মিল্টন', 'চার্লস ডিকেন্স'],
      en: ['William Shakespeare', 'George Bernard Shaw', 'John Milton', 'Charles Dickens'],
    },
    correctIndex: 0,
    explanation: {
      bn: '১৬০০ সালের দিকে রচিত ডেনমার্কের যুবরাজ হ্যামলেটের ট্র্যাজেডি উইলিয়াম শেক্সপিয়রের সর্বশ্রেষ্ঠ নাট্যকর্মের অন্যতম।',
      en: 'William Shakespeare wrote the timeless tragedy "The Tragedy of Hamlet, Prince of Denmark".',
    },
    difficulty: 'easy',
    sourceOrExam: 'বিসিএস ইংরেজি সাহিত্য',
  },
  {
    id: 'lit_10',
    categoryId: 'literature',
    question: {
      bn: '"একাত্তরের দিনগুলি" কার লেখা স্মৃতিচারণমূলক মুক্তিযুদ্ধভিত্তিক গ্রন্থ?',
      en: 'Who is the author of the poignant 1971 Liberation War diary "Ekattorer Dinguli"?',
    },
    options: {
      bn: ['সুফিয়া কামাল', 'জাহানারা ইমাম (শহীদ জননী)', 'নীলিমা ইব্রাহিম', 'বেগম রোকেয়া'],
      en: ['Sufia Kamal', 'Jahanara Imam (Shaheed Janani)', 'Nilima Ibrahim', 'Begum Rokeya'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'শহীদ শাফী ইমাম রুমীর মাতা জাহানারা ইমাম (শহীদ জননী) ১৯৭১ সালের অবরুদ্ধ ঢাকার দিনলিপি নিয়ে "একাত্তরের দিনগুলি" রচনা করেন।',
      en: 'Jahanara Imam recorded the gripping day-to-day accounts of occupied Dhaka during the 1971 Liberation War.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪৫তম বিসিএস',
  },

  // =========================================================================
  // ৬. সাম্প্রতিক ঘটনাবলী (Current Affairs 2024-2026 - 10 Questions)
  // =========================================================================
  {
    id: 'ca_1',
    categoryId: 'current_affairs',
    question: {
      bn: 'পদ্মা সেতু আনুষ্ঠানিকভাবে যানবাহন চলাচলের জন্য কত তারিখে উদ্বোধন করা হয়?',
      en: 'On which date was the Padma Multipurpose Bridge officially inaugurated?',
    },
    options: {
      bn: ['২৫ জুন ২০২২', '২৬ মার্চ ২০২৩', '১৬ ডিসেম্বর ২০২১', '১ জুলাই ২০২২'],
      en: ['25 June 2022', '26 March 2023', '16 December 2021', '1 July 2022'],
    },
    correctIndex: 0,
    explanation: {
      bn: '২৫ জুন ২০২২ পদ্মা সেতু উদ্বোধন করা হয় এবং ২৬ জুন ২০২২ ভোর থেকে সাধারণের জন্য উন্মুক্ত করা হয়। এর দৈর্ঘ্য ৬.১৫ কিমি।',
      en: 'Padma Bridge was inaugurated on 25 June 2022 and opened to traffic on 26 June 2022.',
    },
    difficulty: 'easy',
    sourceOrExam: 'সাম্প্রতিক বাংলাদেশ বিষয়াবলী',
  },
  {
    id: 'ca_2',
    categoryId: 'current_affairs',
    question: {
      bn: 'দক্ষিণ এশিয়ার নদীর তলদেশে প্রথম আন্ডারওয়াটার রোড টানেল "বঙ্গবন্ধু টানেল" এর দৈর্ঘ্য কত?',
      en: 'What is the length of the Bangabandhu Tunnel under the Karnaphuli river in Chittagong?',
    },
    options: {
      bn: ['২.৮৫ কিমি', '৩.৩২ কিমি', '৩.৪০ কিমি', '৪.১২ কিমি'],
      en: ['2.85 km', '3.32 km', '3.40 km', '4.12 km'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'কর্ণফুলী নদীর তলদেশে নির্মিত বঙ্গবন্ধু টানেলের মূল সুড়ঙ্গের দৈর্ঘ্য ৩.৪০ কিলোমিটার (টিউব দৈর্ঘ্য ২.৪৫ কিমি)। এটি ২৮ অক্টোবর ২০২৩ উদ্বোধন হয়।',
      en: 'The Bangabandhu Karnaphuli Tunnel is 3.40 km in total length, connecting Patenga and Anwara.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪৫তম বিসিএস',
  },
  {
    id: 'ca_3',
    categoryId: 'current_affairs',
    question: {
      bn: '২০২৪ সালের অলিম্পিক গেমস বিশ্বের কোন শহরে অনুষ্ঠিত হয়েছিল?',
      en: 'In which city were the 2024 Summer Olympic Games hosted?',
    },
    options: {
      bn: ['টোকিও, জাপান', 'প্যারিস, ফ্রান্স', 'লস অ্যাঞ্জেলেস, যুক্তরাষ্ট্র', 'লন্ডন, যুক্তরাজ্য'],
      en: ['Tokyo, Japan', 'Paris, France', 'Los Angeles, USA', 'London, UK'],
    },
    correctIndex: 1,
    explanation: {
      bn: '৩৩তম গ্রীষ্মকালীন অলিম্পিক গেমস ২০২৪ সালের ২৬ জুলাই থেকে ১১ আগস্ট পর্যন্ত ফ্রান্সের রাজধানী প্যারিসে অনুষ্ঠিত হয়।',
      en: 'The 2024 Summer Olympics (XXXIII Olympiad) was held in Paris, France from July to August 2024.',
    },
    difficulty: 'easy',
    sourceOrExam: 'আন্তর্জাতিক ক্রীড়া সাধারণ জ্ঞান',
  },
  {
    id: 'ca_4',
    categoryId: 'current_affairs',
    question: {
      bn: '২০২৬ সালের ফিফা বিশ্বকাপ যৌথভাবে কয়টি দেশের মোট কয়টি ভেন্যুতে আয়োজিত হবে?',
      en: 'The 2026 FIFA World Cup will be co-hosted by which nations?',
    },
    options: {
      bn: ['যুক্তরাষ্ট্র, কানাডা ও মেক্সিকো (১৬টি শহর)', 'স্পেন, পর্তুগাল ও মরক্কো', 'আর্জেন্টিনা ও উরুগুয়ে', 'সৌদি আরব ও কাতার'],
      en: ['USA, Canada & Mexico (16 cities)', 'Spain, Portugal & Morocco', 'Argentina & Uruguay', 'Saudi Arabia & Qatar'],
    },
    correctIndex: 0,
    explanation: {
      bn: '২০২৬ ফিফা বিশ্বকাপ যুক্তরাষ্ট্র, কানাডা ও মেক্সিকোর ১৬টি শহরে অনুষ্ঠিত হবে এবং প্রথমবারের মতো এতে ৪৮টি দেশ অংশগ্রহণ করবে।',
      en: 'Co-hosted by USA, Canada, and Mexico across 16 cities, featuring a record 48 teams.',
    },
    difficulty: 'easy',
    sourceOrExam: 'বিশ্বকাপ ফুটবল ও সমসাময়িক সাধারণ জ্ঞান',
  },
  {
    id: 'ca_5',
    categoryId: 'current_affairs',
    question: {
      bn: 'ন্যাটো (NATO) সামরিক জোটে সর্বশেষ ৩২তম সদস্য হিসেবে কোন দেশ যোগদান করেছে?',
      en: 'Which country recently joined as the 32nd member of the NATO alliance in 2024?',
    },
    options: {
      bn: ['ফিনল্যান্ড', 'সুইডেন', 'ইউক্রেন', 'জর্জিয়া'],
      en: ['Finland', 'Sweden', 'Ukraine', 'Georgia'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'সুইডেন ২০২৪ সালের ৭ মার্চ আনুষ্ঠানিকভাবে ন্যাটোর ৩২তম সদস্য রাষ্ট্র হিসেবে অন্তর্ভুক্ত হয় (ফিনল্যান্ড ২০২৩ সালে ৩১তম সদস্য হয়েছিল)।',
      en: 'Sweden officially became the 32nd member state of NATO on 7 March 2024, following Finland in 2023.',
    },
    difficulty: 'medium',
    sourceOrExam: 'আন্তর্জাতিক সাম্প্রতিক ২০২৪-২০২৬',
  },
  {
    id: 'ca_6',
    categoryId: 'current_affairs',
    question: {
      bn: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরের দৃষ্টিনন্দন "থার্ড টার্মিনাল" (Third Terminal) এর নকশাকার কে?',
      en: 'Who is the lead architect of the Third Terminal of Hazrat Shahjalal International Airport?',
    },
    options: {
      bn: ['রোহানি বাহারিন (Rohani Baharin)', 'ফজলুর রহমান খান', 'সৈয়দ মাইনুল হোসেন', 'নরম্যান ফস্টার'],
      en: ['Rohani Baharin', 'Fazlur Rahman Khan', 'Syed Mainul Hossain', 'Norman Foster'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'বিশ্বখ্যাত সিপিজি কর্পোরেশন সিঙ্গাপুরের স্থপতি রোহানি বাহারিন (Rohani Baharin) শাহজালাল বিমানবন্দরের আধুনিক ৩য় টার্মিনালের মূল নকশা করেন।',
      en: 'Rohani Baharin, principal architect of CPG Consultants Singapore, designed Terminal 3.',
    },
    difficulty: 'hard',
    sourceOrExam: 'বিসিএস সাম্প্রতিক মেগা প্রজেক্ট',
  },
  {
    id: 'ca_7',
    categoryId: 'current_affairs',
    question: {
      bn: 'ভারতের চন্দ্রাভিযান "চন্দ্রযান-৩" চাঁদের কোন অংশে সফল অবতরণ করে ইতিহাস সৃষ্টি করেছিল?',
      en: 'On which region of the Moon did India\'s Chandrayaan-3 achieve a historic landing?',
    },
    options: {
      bn: ['চাঁদের উত্তর মেরু', 'চাঁদের দক্ষিণ মেরু (South Pole)', 'প্রশান্ত মহাসাগর সমভূমি', 'চাঁদের কেন্দ্রভাগ'],
      en: ['Lunar North Pole', 'Lunar South Pole', 'Mare Tranquillitatis', 'Lunar Equator'],
    },
    correctIndex: 1,
    explanation: {
      bn: '২৩ আগস্ট ২০২৩ সালে ভারতের চন্দ্রযান-৩ চাঁদের দক্ষিণ মেরুতে অবতরণকারী বিশ্বের প্রথম মহাকাশযান হিসেবে ইতিহাস সৃষ্টি করে।',
      en: 'On 23 August 2023, Chandrayaan-3 became the first spacecraft to land near the lunar south pole.',
    },
    difficulty: 'medium',
    sourceOrExam: 'আন্তর্জাতিক বিজ্ঞান ও মহাকাশ',
  },
  {
    id: 'ca_8',
    categoryId: 'current_affairs',
    question: {
      bn: 'বিশ্ব জনসংখ্যায় বর্তমানে শীর্ষে রয়েছে কোন দেশ?',
      en: 'Which country is currently the most populous in the world?',
    },
    options: {
      bn: ['চীন', 'ভারত', 'যুক্তরাষ্ট্র', 'ইন্দোনেশিয়া'],
      en: ['China', 'India', 'USA', 'Indonesia'],
    },
    correctIndex: 1,
    explanation: {
      bn: '২০২৩ সালের এপ্রিলে জাতিসংঘের জনসংখ্যা তহবিলের (UNFPA) প্রতিবেদন অনুযায়ী চীনকে পেছনে ফেলে ভারত ১৪২.৮ কোটির বেশি জনসংখ্যা নিয়ে বিশ্বের শীর্ষ স্থানে উঠে আসে।',
      en: 'According to UN data in 2023, India surpassed China to become the world\'s most populous country.',
    },
    difficulty: 'easy',
    sourceOrExam: 'জাতিসংঘ জনসংখ্যা প্রতিবেদন',
  },
  {
    id: 'ca_9',
    categoryId: 'current_affairs',
    question: {
      bn: 'ঢাকা মেট্রোরেলের উত্তরা থেকে মতিঝিল পর্যন্ত সার্বিক এমআরটি লাইন-৬ এ মোট কয়টি স্টেশন রয়েছে?',
      en: 'How many stations are there in total on Dhaka Metro Rail MRT Line-6 from Uttara to Motijheel?',
    },
    options: {
      bn: ['১৪টি', '১৬টি', '১৭টি', '২০টি'],
      en: ['14', '16', '17', '20'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'উত্তরা উত্তর থেকে মতিঝিল পর্যন্ত ২০.১ কিলোমিটার দীর্ঘ এমআরটি লাইন-৬ এ মোট ১৬টি আধুনিক এলিভেটেড স্টেশন রয়েছে। পরবর্তীতে কমলাপুর পর্যন্ত বর্ধিত হলে মোট ১৭টি হবে।',
      en: 'Dhaka MRT Line-6 currently operates 16 stations from Uttara North to Motijheel (17 when Kamalapur opens).',
    },
    difficulty: 'medium',
    sourceOrExam: '৪৪তম ও ৪৫তম বিসিএস',
  },
  {
    id: 'ca_10',
    categoryId: 'current_affairs',
    question: {
      bn: 'বিশ্ব স্বাস্থ্য সংস্থা (WHO) এর বর্তমান মহাপরিচালক (Director-General) কে?',
      en: 'Who is the current Director-General of the World Health Organization (WHO)?',
    },
    options: {
      bn: ['আন্তোনিও গুতেরেস', 'ড. টেড্রোস আধানম গ্যাব্রিয়েসুস', 'ক্রিস্টালিনা জর্জিয়েভা', 'অড্রে আজোলে'],
      en: ['António Guterres', 'Dr. Tedros Adhanom Ghebreyesus', 'Kristalina Georgieva', 'Audrey Azoulay'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'ইথিওপিয়ার নাগরিক ড. টেড্রোস আধানম গ্যাব্রিয়েসুস ২০১৭ সাল থেকে বিশ্ব স্বাস্থ্য সংস্থার মহাপরিচালক হিসেবে দায়িত্ব পালন করছেন এবং পুনরায় নির্বাচিত হন।',
      en: 'Dr. Tedros Adhanom Ghebreyesus of Ethiopia has been the Director-General of WHO since 2017.',
    },
    difficulty: 'medium',
    sourceOrExam: 'আন্তর্জাতিক সংস্থা সাম্প্রতিক',
  },

  // =========================================================================
  // ৭. বাংলাদেশ বিষয়াবলী (Bangladesh Affairs - 10 Questions)
  // =========================================================================
  {
    id: 'bd_1',
    categoryId: 'bangladesh',
    question: {
      bn: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান কত তারিখে কার্যকর হয়?',
      en: 'On which date did the Constitution of Bangladesh take effect?',
    },
    options: {
      bn: ['৪ নভেম্বর ১৯৭২', '১৬ ডিসেম্বর ১৯৭২', '২৬ মার্চ ১৯৭২', '১০ জানুয়ারি ১৯৭২'],
      en: ['4 November 1972', '16 December 1972', '26 March 1972', '10 January 1972'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'সংবিধান গণপরিষদে গৃহীত হয় ৪ নভেম্বর ১৯৭২ এবং কার্যকর হয় ১৬ ডিসেম্বর ১৯৭২ (প্রথম বিজয় দিবসে)। এতে মোট ১৫৩টি অনুচ্ছেদ রয়েছে।',
      en: 'The Constitution was adopted on 4 November 1972 and took effect on 16 December 1972.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪৪তম বিসিএস প্রিলিমিনারি',
  },
  {
    id: 'bd_2',
    categoryId: 'bangladesh',
    question: {
      bn: 'বাংলাদেশের জাতীয় প্রতীকে কয়টি তারকা চিহ্ন রয়েছে?',
      en: 'How many stars are displayed on the National Emblem of Bangladesh?',
    },
    options: {
      bn: ['২টি', '৩টি', '৪টি', '৫টি'],
      en: ['2', '3', '4', '5'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'জাতীয় প্রতীকে ৪টি তারকা চিহ্ন রয়েছে, যা সংবিধানের মূল চারটি রাষ্ট্রীয় মূলনীতি (জাতীয়তাবাদ, সমাজতন্ত্র, গণতন্ত্র ও ধর্মনিরপেক্ষতা) নির্দেশ করে।',
      en: 'The 4 stars symbolize the four founding state principles: Nationalism, Socialism, Democracy, Secularism.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪১তম বিসিএস',
  },
  {
    id: 'bd_3',
    categoryId: 'bangladesh',
    question: {
      bn: 'বাংলাদেশের বৃহত্তম স্থলবন্দর কোনটি?',
      en: 'Which is the largest land port of Bangladesh?',
    },
    options: {
      bn: ['হিলি স্থলবন্দর', 'বেনাপোল স্থলবন্দর', 'বুড়িমারী স্থলবন্দর', 'বাংলাবান্ধা স্থলবন্দর'],
      en: ['Hili Land Port', 'Benapole Land Port', 'Burimari Land Port', 'Banglabandha Land Port'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'যশোরের শার্শা উপজেলায় অবস্থিত বেনাপোল স্থলবন্দর দেশের বৃহত্তম স্থলবন্দর। ভারতের পেট্রাপোলের সাথে এটি সংযুক্ত।',
      en: 'Benapole Land Port in Jashore is the largest land customs station in Bangladesh, connected to Petrapole.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৮তম বিসিএস',
  },
  {
    id: 'bd_4',
    categoryId: 'bangladesh',
    question: {
      bn: 'জাতীয় সংসদ ভবনের প্রধান স্থপতি কে?',
      en: 'Who is the chief architect of the National Parliament Building (Jatiya Sangsad Bhaban)?',
    },
    options: {
      bn: ['লুই আই কান (Louis I. Kahn)', 'মাজহারুল ইসলাম', 'হামিদুর রহমান', 'এফ আর খান'],
      en: ['Louis I. Kahn', 'Mazharul Islam', 'Hamidur Rahman', 'F. R. Khan'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'শেরেবাংলা নগরে অবস্থিত দৃষ্টিনন্দন জাতীয় সংসদ ভবনের স্থপতি হলেন প্রখ্যাত আমেরিকান আর্কিটেক্ট লুই আই কান।',
      en: 'American architect Louis I. Kahn designed the iconic Jatiya Sangsad Bhaban at Sher-e-Bangla Nagar.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪০তম বিসিএস',
  },
  {
    id: 'bd_5',
    categoryId: 'bangladesh',
    question: {
      bn: 'বাংলাদেশের সাথে কয়টি দেশের আন্তর্জাতিক স্থলসীমান্ত রয়েছে?',
      en: 'With how many countries does Bangladesh share international terrestrial land borders?',
    },
    options: {
      bn: ['১টি', '২টি (ভারত ও মিয়ানমার)', '৩টি', '৪টি'],
      en: ['1', '2 (India and Myanmar)', '3', '4'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'বাংলাদেশের সাথে দুটি দেশের আন্তর্জাতিক সীমান্ত রয়েছে: ভারত এবং মিয়ানমার। ভারতের সাথে প্রায় ৪,১৫৬ কিমি এবং মিয়ানমারের সাথে প্রায় ২৭১ কিমি।',
      en: 'Bangladesh shares borders with only 2 countries: India (~4,156 km) and Myanmar (~271 km).',
    },
    difficulty: 'easy',
    sourceOrExam: '৪৩তম বিসিএস',
  },
  {
    id: 'bd_6',
    categoryId: 'bangladesh',
    question: {
      bn: 'রূপপুর পারমাণবিক বিদ্যুৎ কেন্দ্র কোন জেলায় অবস্থিত?',
      en: 'In which district is the Rooppur Nuclear Power Plant located?',
    },
    options: {
      bn: ['পাবনা জেলা', 'কুষ্টিয়া জেলা', 'সিরাজগঞ্জ জেলা', 'বগুড়া জেলা'],
      en: ['Pabna', 'Kushtia', 'Sirajganj', 'Bogra'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'পাবনা জেলার ঈশ্বরদী উপজেলার রূপপুরে পদ্মা নদীর তীরে রাশিয়ার কারিগরি ও আর্থিক সহায়তায় ২,৪০০ মেগাওয়াটের পরমাণু বিদ্যুৎ কেন্দ্রটি নির্মিত হয়েছে।',
      en: 'The Rooppur Nuclear Power Plant is in Ishwardi, Pabna, built in collaboration with Rosatom Russia.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪২তম বিসিএস',
  },
  {
    id: 'bd_7',
    categoryId: 'bangladesh',
    question: {
      bn: 'বাংলাদেশের প্রথম রাষ্ট্রপতির নাম কী?',
      en: 'Who was the first President of Bangladesh?',
    },
    options: {
      bn: ['বঙ্গবন্ধু শেখ মুজিবুর রহমান', 'সৈয়দ নজরুল ইসলাম', 'তাজউদ্দীন আহমদ', 'বিচারপতি আবু সাঈদ চৌধুরী'],
      en: ['Bangabandhu Sheikh Mujibur Rahman', 'Syed Nazrul Islam', 'Tajuddin Ahmad', 'Justice Abu Sayeed Chowdhury'],
    },
    correctIndex: 0,
    explanation: {
      bn: '১০ এপ্রিল ১৯৭১ গঠিত মুজিবনগর সরকারে বঙ্গবন্ধু শেখ মুজিবুর রহমান রাষ্ট্রপতি নিযুক্ত হন এবং তাঁর অনুপস্থিতিতে সৈয়দ নজরুল ইসলাম অস্থায়ী রাষ্ট্রপতির দায়িত্ব পালন করেন।',
      en: 'Bangabandhu was declared the 1st President in the Proclamation of Independence; Syed Nazrul Islam was Acting President.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৭তম বিসিএস',
  },
  {
    id: 'bd_8',
    categoryId: 'bangladesh',
    question: {
      bn: 'বাংলাদেশের সর্বোচ্চ বেসামরিক সম্মাননা বা রাষ্ট্রীয় পুরস্কার কোনটি?',
      en: 'Which is the highest civilian state award of the People\'s Republic of Bangladesh?',
    },
    options: {
      bn: ['একুশে পদক', 'স্বাধীনতা পুরস্কার (স্বাধীনতা পদক)', 'বাংলা একাডেমি সাহিত্য পুরস্কার', 'বীরশ্রেষ্ঠ'],
      en: ['Ekushey Padak', 'Independence Award (Swadhinata Padak)', 'Bangla Academy Award', 'Bir Sreshtho'],
    },
    correctIndex: 1,
    explanation: {
      bn: '১৯৭৭ সাল থেকে প্রবর্তিত "স্বাধীনতা পুরস্কার" হলো বাংলাদেশের সর্বোচ্চ রাষ্ট্রীয় বেসামরিক সম্মাননা। এরপর দ্বিতীয় সর্বোচ্চ হলো "একুশে পদক"। বীরশ্রেষ্ঠ হলো সর্বোচ্চ সামরিক খেতাব।',
      en: 'Independence Award is the highest civilian honor. Ekushey Padak is the second highest.',
    },
    difficulty: 'medium',
    sourceOrExam: '৩৯তম বিসিএস',
  },
  {
    id: 'bd_9',
    categoryId: 'bangladesh',
    question: {
      bn: 'জাতীয় স্মৃতিসৌধের ফলক বা দেয়ালের সংখ্যা কয়টি?',
      en: 'How many pairs of wall planes are there in the National Martyrs\' Memorial at Savar?',
    },
    options: {
      bn: ['৫ জোড়া', '৬ জোড়া', '৭ জোড়া (১৪টি ফলক)', '১১ জোড়া'],
      en: ['5 pairs', '6 pairs', '7 pairs (14 planes)', '11 pairs'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'সাভারের স্মৃতিসৌধে সাত জোড়া দেয়াল রয়েছে যা ১৯৫২ ভাষা আন্দোলন থেকে শুরু করে ১৯৭১ সালের মুক্তিযুদ্ধ পর্যন্ত ৭টি ঐতিহাসিক পর্যায়কে নির্দেশ করে।',
      en: 'The memorial consists of 7 pairs of triangular wall planes representing 7 milestone movements.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪৫তম বিসিএস',
  },
  {
    id: 'bd_10',
    categoryId: 'bangladesh',
    question: {
      bn: 'বাংলাদেশের সমুদ্রসীমা নিয়ে মিয়ানমারের সাথে বিরোধে আন্তর্জাতিক ট্রাইব্যুনাল (ITLOS) কত সালে রায় দেয়?',
      en: 'In which year did ITLOS deliver its historic maritime boundary verdict between Bangladesh and Myanmar?',
    },
    options: {
      bn: ['২০১০ সালে', '২০১২ সালের ১৪ মার্চ', '২০১৪ সালের ৭ জুলাই', '২০১৬ সালে'],
      en: ['2010', '14 March 2012', '7 July 2014', '2016'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'জার্মানির হামবুর্গে অবস্থিত আন্তর্জাতিক সমুদ্র আইন ট্রাইব্যুনাল (ITLOS) ২০১২ সালের ১৪ মার্চ বাংলাদেশ ও মিয়ানমারের সমুদ্রসীমা নির্ধারণে ঐতিহাসিক রায় প্রদান করে। ভারতের সাথে রায় আসে ২০১৪ সালে।',
      en: 'ITLOS delivered the judgment on 14 March 2012 in Hamburg, followed by the India maritime verdict in 2014.',
    },
    difficulty: 'hard',
    sourceOrExam: '৩৫তম বিসিএস',
  },

  // =========================================================================
  // ৮. আন্তর্জাতিক বিষয়াবলী (International Affairs - 10 Questions)
  // =========================================================================
  {
    id: 'intl_1',
    categoryId: 'international',
    question: {
      bn: 'জাতিসংঘের প্রধান সদর দফতর কোন শহরে অবস্থিত?',
      en: 'Where is the main headquarters of the United Nations located?',
    },
    options: {
      bn: ['জেনেভা, সুইজারল্যান্ড', 'নিউইয়র্ক, যুক্তরাষ্ট্র', 'প্যারিস, ফ্রান্স', 'লন্ডন, যুক্তরাজ্য'],
      en: ['Geneva, Switzerland', 'New York, USA', 'Paris, France', 'London, UK'],
    },
    correctIndex: 1,
    explanation: {
      bn: '১৯৪৫ সালের ২৪ অক্টোবর প্রতিষ্ঠিত জাতিসংঘের প্রধান সদর দপ্তর যুক্তরাষ্ট্রের নিউইয়র্ক শহরের ম্যানহাটনে অবস্থিত।',
      en: 'The UN Headquarters has been situated in Midtown Manhattan, New York City since 1952.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪৪তম বিসিএস',
  },
  {
    id: 'intl_2',
    categoryId: 'international',
    question: {
      bn: 'শান্তিতে নোবেল পুরস্কার কোন শহর থেকে প্রদান করা হয়?',
      en: 'The Nobel Peace Prize is presented in which city?',
    },
    options: {
      bn: ['স্টকহোম, সুইডেন', 'অসলো, নরওয়ে', 'জেনেভা, সুইজারল্যান্ড', 'কোপেনহেগেন, ডেনমার্ক'],
      en: ['Stockholm, Sweden', 'Oslo, Norway', 'Geneva, Switzerland', 'Copenhagen, Denmark'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'অন্যান্য সব নোবেল পুরস্কার সুইডেনের স্টকহোম থেকে দেওয়া হলেও শান্তিতে নোবেল পুরস্কার একমাত্র নরওয়ের অসলো থেকে প্রদান করা হয়।',
      en: 'Unlike all other categories awarded in Stockholm, the Nobel Peace Prize is awarded in Oslo, Norway.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪১তম বিসিএস',
  },
  {
    id: 'intl_3',
    categoryId: 'international',
    question: {
      bn: 'কোন দেশকে "ইউরোপের ককপিট" (Cockpit of Europe) বলা হয়?',
      en: 'Which country is historically termed the "Cockpit of Europe"?',
    },
    options: {
      bn: ['বেলজিয়াম', 'সুইজারল্যান্ড', 'পোল্যান্ড', 'জার্মানি'],
      en: ['Belgium', 'Switzerland', 'Poland', 'Germany'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'ইউরোপের বহু রক্তক্ষয়ী যুদ্ধ (যেমন ওয়াটারলু যুদ্ধ) বেলজিয়ামের মাটিতে সংঘটিত হওয়ার কারণে বেলজিয়ামকে "ইউরোপের ককপিট" বা যুদ্ধক্ষেত্র বলা হয়। সুইজারল্যান্ডকে বলা হয় ইউরোপের খেলার মাঠ।',
      en: 'Belgium earned the name Cockpit of Europe because of the numerous battles fought on its soil (e.g. Waterloo).',
    },
    difficulty: 'medium',
    sourceOrExam: '৩৮তম বিসিএস',
  },
  {
    id: 'intl_4',
    categoryId: 'international',
    question: {
      bn: 'বিশ্বের বৃহত্তম দ্বীপ গ্রিনল্যান্ড কোন দেশের প্রশাসনিক নিয়ন্ত্রণে রয়েছে?',
      en: 'Greenland, the largest island in the world, is an autonomous territory of which nation?',
    },
    options: {
      bn: ['যুক্তরাষ্ট্র', 'কানাডা', 'ডেনমার্ক', 'নরওয়ে'],
      en: ['USA', 'Canada', 'Denmark', 'Norway'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'গ্রিনল্যান্ড ভৌগোলিকভাবে উত্তর আমেরিকায় অবস্থিত হলেও রাজনৈতিক ও ঐতিহাসিকভাবে এটি ডেনমার্ক রাজ্যের একটি স্বায়ত্তশাসিত অঞ্চল।',
      en: 'Greenland is an autonomous territory belonging geographically to North America but politically to Denmark.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪০তম বিসিএস',
  },
  {
    id: 'intl_5',
    categoryId: 'international',
    question: {
      bn: 'আন্তর্জাতিক মুদ্রা তহবিল (IMF) এবং বিশ্বব্যাংক এর সদর দপ্তর কোথায়?',
      en: 'Where are the headquarters of the IMF and the World Bank situated?',
    },
    options: {
      bn: ['নিউইয়র্ক', 'ওয়াশিংটন ডিসি', 'জেনেভা', 'লন্ডন'],
      en: ['New York', 'Washington D.C.', 'Geneva', 'London'],
    },
    correctIndex: 1,
    explanation: {
      bn: '১৯৪৪ সালে ব্রেটন উডস সম্মেলনের মাধ্যমে প্রতিষ্ঠিত ব্রাদারহুড সংস্থা আইএমএফ এবং বিশ্বব্যাংক উভয়েরই সদর দপ্তর যুক্তরাষ্ট্রের ওয়াশিংটন ডিসিতে অবস্থিত।',
      en: 'Both Bretton Woods institutions (IMF and World Bank) are headquartered in Washington D.C.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৯তম বিসিএস',
  },
  {
    id: 'intl_6',
    categoryId: 'international',
    question: {
      bn: 'আন্তর্জাতিক বিচার আদালত (ICJ) এর বিচারকের সংখ্যা কতজন এবং মেয়াদ কত বছর?',
      en: 'How many judges serve on the International Court of Justice (ICJ), and what is their term?',
    },
    options: {
      bn: ['১০ জন, ৫ বছর', '১৫ জন, ৯ বছর', '২১ জন, ৬ বছর', '৯ জন, ৪ বছর'],
      en: ['10 judges, 5 years', '15 judges, 9 years', '21 judges, 6 years', '9 judges, 4 years'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'নেদারল্যান্ডসের হেগে অবস্থিত আন্তর্জাতিক বিচার আদালতে ১৫ জন বিচারপতি ৯ বছর মেয়াদের জন্য সাধারণ পরিষদ ও নিরাপত্তা পরিষদ দ্বারা নির্বাচিত হন।',
      en: 'The ICJ has 15 judges elected to nine-year terms by the UN General Assembly and Security Council.',
    },
    difficulty: 'hard',
    sourceOrExam: '৪৩তম বিসিএস',
  },
  {
    id: 'intl_7',
    categoryId: 'international',
    question: {
      bn: 'কোন প্রণালী এশিয়া ও আমেরিকা মহাদেশকে পৃথক করেছে?',
      en: 'Which strait separates the continents of Asia and North America?',
    },
    options: {
      bn: ['জিব্রাল্টার প্রণালী', 'বেরিং প্রণালী (Bering Strait)', 'হরমুজ প্রণালী', 'বসফরাস প্রণালী'],
      en: ['Strait of Gibraltar', 'Bering Strait', 'Strait of Hormuz', 'Bosphorus Strait'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'বেরিং প্রণালী রাশিয়ার চুকচি উপদ্বীপ (এশিয়া) এবং মার্কিন যুক্তরাষ্ট্রের আলাস্কা (উত্তর আমেরিকা) কে পৃথক করেছে এবং আর্কটিক ও বেরিং সাগরকে যুক্ত করেছে।',
      en: 'The Bering Strait separates Asia (Russia) and North America (Alaska, USA).',
    },
    difficulty: 'medium',
    sourceOrExam: '৩৭তম বিসিএস',
  },
  {
    id: 'intl_8',
    categoryId: 'international',
    question: {
      bn: 'বিশ্বের বৃহত্তম অর্থনীতির দেশ (GDP এর ভিত্তিতে) কোনটি?',
      en: 'Which country is the largest economy in the world by nominal GDP?',
    },
    options: {
      bn: ['চীন', 'যুক্তরাষ্ট্র (USA)', 'জার্মানি', 'জাপান'],
      en: ['China', 'USA', 'Germany', 'Japan'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'নামিক জিডিপির ভিত্তিতে মার্কিন যুক্তরাষ্ট্র বিশ্বের বৃহত্তম অর্থনীতি (প্রায় ২৭ ট্রিলিয়ন ডলার)। চীন দ্বিতীয় স্থানে অবস্থান করছে।',
      en: 'The United States is the world\'s largest economy by nominal GDP, followed by China.',
    },
    difficulty: 'easy',
    sourceOrExam: 'বিশ্ব অর্থনৈতিক আউটলুক',
  },
  {
    id: 'intl_9',
    categoryId: 'international',
    question: {
      bn: 'সুয়েজ খাল (Suez Canal) কোন দুটি সাগরকে যুক্ত করেছে?',
      en: 'The Suez Canal connects which two seas?',
    },
    options: {
      bn: ['ভূমধ্যসাগর ও লোহিত সাগর', 'বাল্টিক সাগর ও উত্তর সাগর', 'আরব সাগর ও পারস্য উপসাগর', 'কাস্পিয়ান সাগর ও কৃষ্ণ সাগর'],
      en: ['Mediterranean Sea and Red Sea', 'Baltic Sea and North Sea', 'Arabian Sea and Persian Gulf', 'Caspian Sea and Black Sea'],
    },
    correctIndex: 0,
    explanation: {
      bn: '১৮৬৯ সালে চালু হওয়া মিশরে অবস্থিত সুয়েজ খাল ভূমধ্যসাগর ও লোহিত সাগরকে যুক্ত করে এশিয়া ও ইউরোপের মধ্যে সরাসরি সামুদ্রিক পথ তৈরি করেছে।',
      en: 'Opened in 1869, the Suez Canal connects the Mediterranean Sea to the Red Sea.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪২তম বিসিএস',
  },
  {
    id: 'intl_10',
    categoryId: 'international',
    question: {
      bn: 'বিশ্ব পরিবেশ দিবস (World Environment Day) প্রতি বছর কোন তারিখে পালিত হয়?',
      en: 'On which date is World Environment Day observed globally each year?',
    },
    options: {
      bn: ['২২ এপ্রিল', '৫ জুন', '১৬ সেপ্টেম্বর', '১ ডিসেম্বর'],
      en: ['22 April', '5 June', '16 September', '1 December'],
    },
    correctIndex: 1,
    explanation: {
      bn: '১৯৭২ সালের জাতিসংঘ মানব পরিবেশ সম্মেলনের ধারাবাহিকতায় প্রতি বছর ৫ জুন বিশ্ব পরিবেশ দিবস হিসেবে পালিত হয়ে আসছে। ২২ এপ্রিল হলো বিশ্ব ধরিত্রী দিবস।',
      en: '5 June is observed as World Environment Day. 22 April is Earth Day.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৬তম বিসিএস',
  },

  // =========================================================================
  // ৯. আন্তর্জাতিক ভৌগোলিক উপনাম (International Aliases - 10 Questions)
  // =========================================================================
  {
    id: 'alias_1',
    categoryId: 'international',
    question: {
      bn: 'নিশীথ সূর্যের দেশ (Land of the Midnight Sun) বলা হয় কোন দেশকে?',
      en: 'Which country is known as the Land of the Midnight Sun?',
    },
    options: {
      bn: ['নরওয়ে', 'সুইডেন', 'জাপান', 'আইসল্যান্ড'],
      en: ['Norway', 'Sweden', 'Japan', 'Iceland'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'নরওয়ের উত্তরাঞ্চলের হ্যামারফেস্ট শহরে মে থেকে জুলাই পর্যন্ত রাতের বেলাতেও সূর্যের আলো দেখা যায়, তাই নরওয়েকে নিশীথ সূর্যের দেশ বলা হয়।',
      en: 'Northern Norway (especially Hammerfest) experiences the midnight sun where the sun does not set between May and July.',
    },
    difficulty: 'easy',
    sourceOrExam: 'বিসিএস প্রিলিমিনারি',
  },
  {
    id: 'alias_2',
    categoryId: 'international',
    question: {
      bn: 'সূর্যোদয়ের দেশ (Land of the Rising Sun) বা ভূমিকম্পের দেশ কোনটি?',
      en: 'Which country is known as the Land of the Rising Sun?',
    },
    options: {
      bn: ['চীন', 'দক্ষিণ কোরিয়া', 'জাপান', 'ইন্দোনেশিয়া'],
      en: ['China', 'South Korea', 'Japan', 'Indonesia'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'জাপানের স্থানীয় নাম "নিহোন" বা "নিপ্পন", যার অর্থ সূর্যের উৎপত্তি বা সূর্যোদয়ের দেশ। ভূতাত্ত্বিক অবস্থানের কারণে একে ভূমিকম্পের দেশও বলা হয়।',
      en: 'The Japanese name Nihon/Nippon means "origin of the sun", hence Land of the Rising Sun.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪১তম বিসিএস',
  },
  {
    id: 'alias_3',
    categoryId: 'international',
    question: {
      bn: 'বজ্রপাতের দেশ (Land of the Thunder Dragon) কাকে বলা হয়?',
      en: 'Which country is known as the Land of the Thunder Dragon?',
    },
    options: {
      bn: ['নেপাল', 'ভুটান', 'মিয়ানমার', 'শ্রীলঙ্কা'],
      en: ['Nepal', 'Bhutan', 'Myanmar', 'Sri Lanka'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'ভুটানকে স্থানীয় জংখা ভাষায় "ড্রুক ইউল" (Druk Yul) বলা হয়, যার বাংলা অর্থ বজ্র ড্রাগন বা বজ্রপাতের দেশ।',
      en: 'In Dzongkha, Bhutan is called Druk Yul, meaning "Land of the Thunder Dragon".',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৯তম বিসিএস',
  },
  {
    id: 'alias_4',
    categoryId: 'international',
    question: {
      bn: 'কোন দেশকে "হাজার হ্রদের দেশ" (Land of a Thousand Lakes) বলা হয়?',
      en: 'Which country is known as the Land of a Thousand Lakes?',
    },
    options: {
      bn: ['ফিনল্যান্ড', 'সুইজারল্যান্ড', 'কানাডা', 'নিউজিল্যান্ড'],
      en: ['Finland', 'Switzerland', 'Canada', 'New Zealand'],
    },
    correctIndex: 0,
    explanation: {
      bn: 'ফিনল্যান্ডে প্রায় ১,৮৭,৮৮৮টি হ্রদ রয়েছে, যার কারণে দেশটিকে আনুষ্ঠানিকভাবে হাজার হ্রদের দেশ বলা হয়।',
      en: 'Finland contains over 187,000 lakes, earning it the title Land of a Thousand Lakes.',
    },
    difficulty: 'medium',
    sourceOrExam: '৩৮তম বিসিএস',
  },
  {
    id: 'alias_5',
    categoryId: 'international',
    question: {
      bn: '"সাত পাহাড়ের শহর" এবং "অমর শহর" (Eternal City) কোন শহরকে বলা হয়?',
      en: 'Which city is known as the City of Seven Hills and the Eternal City?',
    },
    options: {
      bn: ['প্যারিস', 'রোম', 'লন্ডন', 'এথেন্স'],
      en: ['Paris', 'Rome', 'London', 'Athens'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'ইতালির রাজধানী রোম প্রাচীনকালে সাতটি পাহাড়ের ওপর গড়ে ওঠার কারণে একে সাত পাহাড়ের শহর এবং অমর শহর (Eternal City) বলা হয়।',
      en: 'Rome was founded on seven historic hills and has been nicknamed the Eternal City for millennia.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪৪তম বিসিএস',
  },
  {
    id: 'alias_6',
    categoryId: 'international',
    question: {
      bn: 'বিশ্বের "চিনির পাত্র" (Sugar Bowl of the World) নামে পরিচিত কোন দেশ?',
      en: 'Which country has historically been known as the Sugar Bowl of the World?',
    },
    options: {
      bn: ['ব্রাজিল', 'কিউবা', 'ভারত', 'মেক্সিকো'],
      en: ['Brazil', 'Cuba', 'India', 'Mexico'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'বিপুল পরিমাণ আখ ও চিনি উৎপাদনের ঐতিহাসিক ঐতিহ্যের কারণে ক্যারিবীয় দ্বীপরাষ্ট্র কিউবাকে বিশ্বের চিনির পাত্র বলা হয়।',
      en: 'Cuba was traditionally known as the Sugar Bowl of the World due to its vast sugar cane production.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৫তম বিসিএস',
  },
  {
    id: 'alias_7',
    categoryId: 'international',
    question: {
      bn: 'পারস্য উপসাগরের কোন দ্বীপরাষ্ট্রকে "মুক্তার দ্বীপ" (Island of Pearls) বলা হয়?',
      en: 'Which island nation in the Persian Gulf is known as the Island of Pearls?',
    },
    options: {
      bn: ['কাতার', 'কুয়েত', 'বাহরাইন', 'সংযুক্ত আরব আমিরাত'],
      en: ['Qatar', 'Kuwait', 'Bahrain', 'UAE'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'বাহরাইনের সমুদ্র উপকূল প্রাচীনকাল থেকেই বিশ্বখ্যাত প্রাকৃতিক মুক্তা আহরণের জন্য প্রসিদ্ধ হওয়ায় একে মুক্তার দ্বীপ বলা হয়।',
      en: 'Bahrain is historically famous for natural pearl fisheries, earning the title Island of Pearls.',
    },
    difficulty: 'medium',
    sourceOrExam: '৩৭তম বিসিএস',
  },
  {
    id: 'alias_8',
    categoryId: 'international',
    question: {
      bn: '"সাদা হাতির দেশ" (Land of White Elephants) নামে কোন দেশটি পরিচিত?',
      en: 'Which country is known as the Land of White Elephants?',
    },
    options: {
      bn: ['লাওস', 'থাইল্যান্ড', 'ভিয়েতনাম', 'কম্বোডিয়া'],
      en: ['Laos', 'Thailand', 'Vietnam', 'Cambodia'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'থাইল্যান্ডে শ্বেতহস্তী রাজকীয় ক্ষমতা, পবিত্রতা ও সমৃদ্ধির প্রতীক হওয়ায় দেশটিকে সাদা হাতির দেশ বলা হয়।',
      en: 'Thailand is famous as the Land of White Elephants, where royal white elephants symbolize power and prosperity.',
    },
    difficulty: 'easy',
    sourceOrExam: '৪০তম বিসিএস',
  },
  {
    id: 'alias_9',
    categoryId: 'international',
    question: {
      bn: 'যুক্তরাষ্ট্রের কোন মহানগরী "বিগ অ্যাপল" (The Big Apple) ও "গগনচুম্বী অট্টালিকার শহর" নামে পরিচিত?',
      en: 'Which US metropolis is famously nicknamed "The Big Apple" and "City of Skyscrapers"?',
    },
    options: {
      bn: ['লস অ্যাঞ্জেলেস', 'শিকাগো', 'নিউইয়র্ক সিটি', 'সান ফ্রান্সিসকো'],
      en: ['Los Angeles', 'Chicago', 'New York City', 'San Francisco'],
    },
    correctIndex: 2,
    explanation: {
      bn: 'নিউইয়র্ক সিটিকে ১৯২০-এর দশক থেকে আদর করে "বিগ অ্যাপল" বলা হয়। এর ম্যানহাটন অঞ্চলে বিশ্বের সবচেয়ে বিখ্যাত আকাশচুম্বী ভবন অবস্থিত।',
      en: 'New York City was popularized as The Big Apple in the 1920s and is famous for its iconic skyline.',
    },
    difficulty: 'easy',
    sourceOrExam: '৩৬তম বিসিএস',
  },
  {
    id: 'alias_10',
    categoryId: 'international',
    question: {
      bn: '"পৃথিবীর ছাদ" (Roof of the World) বলা হয় কোন ভৌগোলিক স্থানটিকে?',
      en: 'Which geographical plateau is known as the "Roof of the World"?',
    },
    options: {
      bn: ['তিব্বত মালভূমি', 'পামির মালভূমি', 'ডেকান মালভূমি', 'আনাতোলিয়া মালভূমি'],
      en: ['Tibetan Plateau', 'Pamir Plateau', 'Deccan Plateau', 'Anatolian Plateau'],
    },
    correctIndex: 1,
    explanation: {
      bn: 'মধ্য এশিয়ার তাজিকিস্তানে অবস্থিত অত্যন্ত উচ্চ ও বিশাল পামির মালভূমিকে ঐতিহাসিকভাবে "পৃথিবীর ছাদ" বলা হয়।',
      en: 'The Pamir Mountains/Plateau in Central Asia is historically referred to as the Roof of the World.',
    },
    difficulty: 'medium',
    sourceOrExam: '৪২তম বিসিএস',
  },
];
