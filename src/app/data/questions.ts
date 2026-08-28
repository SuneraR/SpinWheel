export interface LocalizedText {
  en: string;
  si: string;
}

export type Question = {
  id: number;
  question: LocalizedText;
  answers: LocalizedText[];
  correctAnswer: number;
};

type SinhalaQuestion = {
  question: string;
  answers: string[];
  correct: number;
};

const SINHALA_QUESTIONS_BY_SEGMENT: Record<number, SinhalaQuestion[]> = {
  1: [
    {
      question: "ඔබ නිවසින් පිටව යන විට ප්‍රධාන දොරටුවේ යතුර තබා යා යුත්තේ කොහේද?",
      answers: [
        "පාපිස්ස යට",
        "මල් පෝච්චිය යට",
        "විශ්වාසවන්ත ඥාතියකු/ හිතවතකු භාරයේ",
        "පුටුවක් මත",
      ],
      correct: 2,
    },
    {
      question: "පවුලේ සාමාජිකයින් විනෝද ගමනක් ගිය පසු ලබාගත් පවුලේ ඡායාරූප සමාජ මාධ්‍යට එක් කරන්නේ නම් එය කළ යුතු වේලාව කුමක්ද?",
      answers: [
        "එවෙලේම",
        "පසු දින",
        "නිවසට පැමිණි පසු",
        "පැමිණෙන අතරතුර",
      ],
      correct: 2,
    },
    {
      question: "ඔබගේ වාහනයේ යතුර තැබිය යුතු සුදුසුම ස්ථානය  කුමක්ද?",
      answers: [
        "නිවැසියන්  පමණක් දන්නා ස්ථානයක",
        "නිවසේ යතුරු  රඳවනයේ",
        "යතුරු කටේ",
        "කලිසම් සාක්කුව තුළ",
      ],
      correct: 0,
    },
  ],
  2: [
    {
      question: "නිවසේ ඇති අලවංගු/ ගල්ඉනි/ ඉනිමං ආදිය තැබිය යුතු සුදුසුම ස්ථානය කුමක්ද?",
      answers: [
        "කෑම කාමරයේ",
        "ගබඩා කාමරයේ",
        "එළිමහනේ",
        "සාලයේ",
      ],
      correct: 1,
    },
    {
      question: "CCTV සවිකිරීමේදී සැලකිලිමත් විය යුතු මූලිකම කරුණ කුමක්ද?",
      answers: [
        "මිල",
        "හැඩය",
        "වීඩියෝවල ගුණාත්මකභාවය",
        "අලෙවියෙන් පසු සේවාව",
      ],
      correct: 2,
    },
    {
      question: "කුලී ගමනක් යාම සඳහා රථයක් වෙන්කර ගැනීමේදී වඩාත් ආරක්ෂිත වන්නේ කුමක්ද?",
      answers: [
        "ඕනෑම ත්‍රිරෝද රථයක්",
        "මීටර් ත්‍රිරෝද රථයක්",
        "දන්නා  හඳුනන හෝ ලියාපදිංචි ආයතනයක ත්‍රිරෝද රථයක්",
        "සුඛෝපභෝගී රථයක්",
      ],
      correct: 2,
    },
  ],
  3: [
    {
      question: "කුලී රථයක් Online වෙන්කර ගත් පසු ජංගම දුරකථනයට ලැබෙන කෙටි  පණිවුඩය අනුව  රථයේ ලියාපදිංචි අංකය සනාථ කරගත යුතු අවස්ථාව කුමක්ද?",
      answers: [
        "කුලී රථයට නැගීමට පෙර",
        "කුලී රථයේ ගමන් කරන විට",
        "ගමන අවසානයේ දී",
        "සනාථ කරගත යුතු නොවේ",
      ],
      correct: 0,
    },
    {
      question: "කුලී රථයක යන ගමනකදී රැගෙන යන වටිනා දෑ  පිළිබඳ අවධානයෙන් සිටිය යුත්තේ  කවුද?",
      answers: [
        "රථයේ රියදුරු",
        "රථයේ හිමිකරු/ සමාගම",
        "භාණ්ඩවල හිමිකරු",
        "පොලිසිය",
      ],
      correct: 2,
    },
    {
      question: "ප්‍රජා පොලිස් සංකල්පයේ පියා කවුද?",
      answers: [
        "සර් රොබට් පීල්",
        "එඩ්වර්ඩ් බාන්ස්",
        "රිචර්ඩ් අලුවිහාරේ",
        "ෂර්ලොක් හෝම්ස්",
      ],
      correct: 0,
    },
  ],
  4: [
    {
      question: "2026-09-03 දිනට යෙදී ඇත්තේ ශ්‍රී ලංකා පොලීසියේ කීවෙනි සංවත්සරයද?",
      answers: [
        "150 වන සංවත්සරය",
        "160 වන සංවත්සරය",
        "175 වන සංවත්සරය",
        "200 වන සංවත්සරය",
      ],
      correct: 1,
    },
    {
      question: "රක්ෂණ සහතිකයක් නොමැතිව රිය ධාවනය කිරීමේ වරදට අදාළ දඩය කොපමණද?",
      answers: [
        "රු.25000 කි",
        "රු.20000 කි",
        "රු.2500 කි",
        "රු.15000 කි",
      ],
      correct: 0,
    },
    {
      question: "ආරක්ෂිත හිස්වැසුමක් මිලදී ගැනීමේදී සැලකිය යුතු  මූලික කරුණ කුමක්ද?",
      answers: [
        "වර්ණය",
        "මිල",
        "SLS සහතිකය ඇතිද යන වග",
        "හැඩය",
      ],
      correct: 2,
    },
  ],
  5: [
    {
      question: "රියදුරු බලපත්‍රයක් නොමැතිව වාහනයක් ධාවනය කිරීමේ වරදට අදාළ දඩය කොපමණද?",
      answers: [
        "රිය පැදවූ අයට රු. 25000 කි",
        "රථයේ හිමිකරුට රු. 25000 කි",
        "රිය පැදවූ අයට රු.25000 ක් සහ රථයේ හිමිකරුට රු.25000 ක් ලෙස රු. 50000",
        "රිය පැදවූ අයට රු.20000 ක් සහ රථයේ හිමිකරුට රු.25000 ක් ලෙස රු. 45000",
      ],
      correct: 2,
    },
    {
      question: "අපරාධ පිළිබඳ විද්‍යාත්මකව හදාරන විෂය කුමක්ද?",
      answers: [
        "අපරාධ නීතිය",
        "සාක්ෂි විද්‍යාව",
        "අපරාධ විද්‍යාව",
        "පොලිස් විද්‍යාව",
      ],
      correct: 2,
    },
    {
      question: "ප්‍රජා පොලිස්කරණයේ මූලික වගකීම පැවරෙන්නේ කවුරුන් කෙරෙහිද?",
      answers: [
        "මහජනතාවට",
        "පොලිසියට",
        "රජයට",
        "මහජනතාවට හා පොලිසියට",
      ],
      correct: 3,
    },
  ],
  6: [
    {
      question: "අපරාධ වැළැක්වීම යනු කුමක්ද?",
      answers: [
        "අපරාධයක් වූ පසු එය වාර්තා කිරීම",
        "අපරාධයක් සිදු නොවීමට පූර්වයෙන් ගන්නා ක්‍රියාමාර්ග",
        "මහජන සහයෝගය ගොඩනැගීම",
        "අපරාධ විමර්ශන ක්‍රියාවලිය",
      ],
      correct: 1,
    },
    {
      question: "මාර්ගයක ධාවනය වන වාහනයක් නතර කිරීමට නිල ඇඳුමෙන් සිටිය යුතු අවම පොලිස් නිලධාරීන් සංඛ්‍යාව කොපමණද?",
      answers: [
        "රථවාහන පොලිසියේ දෙදෙනකු සිටිය යුතුය",
        "ඕනෑම පොලිස් නිලධාරීන් දෙදෙනකු සිටිය යුතුය",
        "එක් පොලිස් නිලධාරියකුට වුවද හැකිය",
        "රථවාහන පොලිස් ස්ථානාධිපතිවරයා සිටිය යුතුය",
      ],
      correct: 2,
    },
    {
      question: "රාත්‍රී කාලයේදී පාපැදියක් ධාවනයට වඩාත්ම සුදුසු ඇඳුම කුමක්ද?",
      answers: [
        "සුදු හෝ පරාවර්තන ඇඳුමක්",
        "කළු ඇඳුමක්",
        "සුදු කළු මිශ්‍ර  ඇඳුමක්",
        "වර්ණ කිහිපයක ඇඳුමක්",
      ],
      correct: 0,
    },
  ],
  7: [
    {
      question: "යතුරුපැදියක ගමන් කරන විට ආරක්ෂිත හිස්වැසුමක් පැළඳිය යුත්තේ ඇයි?",
      answers: [
        "පොලීසිය දඩ ගසන නිසා",
        "අනතුරකදී හිසේ ආරක්ෂාව සඳහා",
        "හිසට දූවිලි වදින නිසා",
        "අලංකාරය සඳහා",
      ],
      correct: 1,
    },
    {
      question: "මූලික අයිතිවාසිකම් පිළිබඳ සඳහන් ලියවිල්ල කුමක්ද?",
      answers: [
        "ආණ්ඩුක්‍රම ව්‍යවස්ථාව",
        "අපරාධ නඩු විධාන සංග්‍රහය",
        "දණ්ඩ නීති සංග්‍රහය",
        "සාක්ෂි ආඥා පනත",
      ],
      correct: 0,
    },
    {
      question: "ශ්‍රී ලංකාවේ  උත්තරීතරම අධිකරණය කුමක්ද?",
      answers: [
        "ශ්‍රේෂ්ඨාධිකරණය",
        "මහාධිකරණය",
        "අභියාචනාධිකරණය",
        "මහේස්ත්‍රාත් අධිකරණය",
      ],
      correct: 0,
    },
  ],
  8: [
    {
      question: "වයස අවුරුදු 16 ට අඩු ගැහැණු දරුවෙකු සමග සිදු කරන ලිංගික සංසර්ගය හැඳින්වෙන වරද කුමක්ද?",
      answers: [
        "ලිංගික අපචාර",
        "ලිංගික අපයෝජන",
        "ව්‍යවස්ථාපිත ස්ත්‍රි දූෂණය",
        "අස්වාභාවික වැරදි",
      ],
      correct: 2,
    },
    {
      question: "ශ්‍රී ලංකාවේ නීතිය අනුව මනුෂ්‍ය ඝාතනයක් සිදුකළ පුද්ගලයකුට ලබාදිය හැකි දඬුවම කුමක්ද?",
      answers: [
        "ජීවිතාන්තය දක්වා සිර දඬුවම්",
        "වසර 20 ක සිර දඬුවම්",
        "මරණීය දණ්ඩනය",
        "ප්‍රජා සේවය",
      ],
      correct: 2,
    },
    {
      question: "පුද්ගල ඝාතනයක් සිදුව ඇති ස්ථානයක  සිටින මහජනතාව සතු මූලික වගකීම කුමක්ද?",
      answers: [
        "අපරාධ ස්ථානය සෝදා හැරීම",
        "අපරාධ ස්ථානය අසලටම ගොස් බලා සිටිම",
        "ආරක්ෂක අංශ පැමිනෙන තුරු කිසිවකුට අපරාධ ස්ථානයට ඇතුල්වීමට ඉඩ නොදී ආරක්ෂා කිරීම",
        "අපරාධ ස්ථානයේ ඡායාරූප ගැනීම",
      ],
      correct: 2,
    },
  ],
  9: [
    {
      question: "පොලිස් හදිසි ඇමතුම්  අංකය කුමක්ද?",
      answers: [
        "119",
        "1990",
        "110",
        "1929",
      ],
      correct: 0,
    },
    {
      question: "සාමාන්‍ය පුද්ගලයකු විසින් යම් පුද්ගලයකු භාරයට ගත් විගස කළ යුතු කාර්ය කුමක්ද?",
      answers: [
        "ළඟම පොලිසියට භාර දීම",
        "ආසන්නයේම සිටින පොලිස් නිලධාරියාට භාර දීම",
        "සහකාර පොලිස් අධිකාරීවරයාට බාර දීම",
        "ඔහුව මෙල්ල කර ගැනීම සඳහා පහරදීම",
      ],
      correct: 1,
    },
    {
      question: "පොලිස් ආඥා පනතේ 76 වගන්තිය අනුව තොරතුරු ඉල්ලා සිටින අවස්ථාවකදි පදිංචිකරුවන්  පිළිබඳ තොරතුරු ලබාදිය යුත්තේ කා හටද?",
      answers: [
        "ග්‍රාම නිලධාරිවරයාට",
        "සමෘද්ධි නිලධාරියාට",
        "පොලිස් නිලධාරියාට",
        "විහාරාධිපති හිමියන්ට",
      ],
      correct: 2,
    },
  ],
  10: [
    {
      question: "වසා දමා තිබූ නිවසක ජනේලයෙන් ඇතුළු වූ සොරෙකු එහි තිබූ භාණ්ඩ රැගෙනයාම හඳුන්වන වරද කුමක්ද?",
      answers: [
        "සොරකම",
        "ගෙවල් බිඳීම",
        "කොල්ලකෑම",
        "මහජන සාමය කඩ කිරීම",
      ],
      correct: 1,
    },
    {
      question: "පලායන සැකකරුවෙකු අත්අඩංගුවට ගැනීම සඳහා පොලිසිය සහාය ඉල්ලා සිටින විට කළ යුත්තේ කුමක් ද?",
      answers: [
        "ප්‍රතික්ෂේප කල යුතුය",
        "සහය දිය යුතුය",
        "මගහැර යා යුතුය",
        "පහර දිය යුතුය",
      ],
      correct: 1,
    },
    {
      question: "කාන්තාවක් අත්අඩංගුවට ගැනීම සඳහා සිටිය යුතු අවම පොලිස් නිලධාරීන් කොපමණද?",
      answers: [
        "කාන්තා නිලධාරිනියක් අනිවාර්යයෙන් සිටිය යුතුය",
        "කාන්තා සහ පිරිමි නිලධාරියකු සිටිය යුතුය",
        "පිරිමි නිලධාරියකුට හැකිය",
        "පොලිස් ස්ථානාධිපතිවරයා සිටිය යුතුය",
      ],
      correct: 2,
    },
  ],
};

const ENGLISH_QUESTIONS_BY_SEGMENT: Record<number, SinhalaQuestion[]> = {
  1: [
    {
      question: "Where should you leave the key to the main door when leaving home?",
      answers: [
        "Under the doormat",
        "Under a flower pot",
        "With a trusted relative or friend",
        "On a chair",
      ],
      correct: 2,
    },
    {
      question: "If family photographs taken during a recreational trip are posted on social media, when should they be posted?",
      answers: [
        "Immediately",
        "The next day",
        "After returning home",
        "While returning home",
      ],
      correct: 2,
    },
    {
      question: "What is the most suitable place to keep your vehicle key?",
      answers: [
        "In a place known only to household members",
        "On the key holder at home",
        "In the ignition",
        "Inside a trouser pocket",
      ],
      correct: 0,
    },
  ],
  2: [
    {
      question: "Where is the most suitable place to keep crowbars, pickaxes, ladders and similar items at home?",
      answers: [
        "In the dining room",
        "In the storage room",
        "Outdoors",
        "In the living room",
      ],
      correct: 1,
    },
    {
      question: "What is the most important consideration when installing CCTV?",
      answers: [
        "Price",
        "Shape",
        "Video quality",
        "After-sales service",
      ],
      correct: 2,
    },
    {
      question: "What is the safest option when booking a vehicle for a hired journey?",
      answers: [
        "Any three-wheeler",
        "A metered three-wheeler",
        "A three-wheeler from a known or registered service",
        "A luxury vehicle",
      ],
      correct: 2,
    },
  ],
  3: [
    {
      question: "After booking a hired vehicle online, when should you verify the vehicle registration number using the SMS received on your mobile phone?",
      answers: [
        "Before getting into the hired vehicle",
        "While travelling in the hired vehicle",
        "At the end of the journey",
        "There is no need to verify it",
      ],
      correct: 0,
    },
    {
      question: "Who should be responsible for paying attention to valuables carried during a hired vehicle journey?",
      answers: [
        "The driver",
        "The vehicle owner/company",
        "The owner of the items",
        "The police",
      ],
      correct: 2,
    },
    {
      question: "Who is the father of the community policing concept?",
      answers: [
        "Sir Robert Peel",
        "Edward Barnes",
        "Richard Aluvihare",
        "Sherlock Holmes",
      ],
      correct: 0,
    },
  ],
  4: [
    {
      question: "Which anniversary of the Sri Lanka Police falls on 2026-09-03?",
      answers: [
        "150th anniversary",
        "160th anniversary",
        "175th anniversary",
        "200th anniversary",
      ],
      correct: 1,
    },
    {
      question: "What is the fine for driving without an insurance certificate?",
      answers: [
        "Rs. 25,000",
        "Rs. 20,000",
        "Rs. 2,500",
        "Rs. 15,000",
      ],
      correct: 0,
    },
    {
      question: "What is the primary factor to consider when buying a safety helmet?",
      answers: [
        "Colour",
        "Price",
        "Whether it has an SLS certification",
        "Shape",
      ],
      correct: 2,
    },
  ],
  5: [
    {
      question: "What is the fine for driving a vehicle without a driving licence?",
      answers: [
        "Rs. 25,000 for the driver",
        "Rs. 25,000 for the vehicle owner",
        "Rs. 25,000 for the driver and Rs. 25,000 for the vehicle owner, totalling Rs. 50,000",
        "Rs. 20,000 for the driver and Rs. 25,000 for the vehicle owner, totalling Rs. 45,000",
      ],
      correct: 2,
    },
    {
      question: "Which field scientifically studies crime?",
      answers: [
        "Criminal law",
        "Forensic science",
        "Criminology",
        "Police science",
      ],
      correct: 2,
    },
    {
      question: "On whom does the primary responsibility for community policing rest?",
      answers: [
        "The public",
        "The police",
        "The government",
        "The public and the police",
      ],
      correct: 3,
    },
  ],
  6: [
    {
      question: "What is crime prevention?",
      answers: [
        "Reporting a crime after it occurs",
        "Measures taken in advance to prevent a crime",
        "Building public support",
        "The criminal investigation process",
      ],
      correct: 1,
    },
    {
      question: "What is the minimum number of uniformed police officers required to stop a vehicle travelling on a road?",
      answers: [
        "Two traffic police officers",
        "Any two police officers",
        "Even one police officer can do so",
        "The Traffic Police OIC must be present",
      ],
      correct: 2,
    },
    {
      question: "What is the most suitable clothing for riding a bicycle at night?",
      answers: [
        "White or reflective clothing",
        "Black clothing",
        "Black-and-white clothing",
        "Clothing with several colours",
      ],
      correct: 0,
    },
  ],
  7: [
    {
      question: "Why should you wear a safety helmet when travelling on a motorcycle?",
      answers: [
        "Because the police issue fines",
        "To protect the head in an accident",
        "Because dust can get on the head",
        "For appearance",
      ],
      correct: 1,
    },
    {
      question: "Which document mentions fundamental rights?",
      answers: [
        "The Constitution",
        "The Code of Criminal Procedure",
        "The Penal Code",
        "The Evidence Ordinance",
      ],
      correct: 0,
    },
    {
      question: "What is the highest court in Sri Lanka?",
      answers: [
        "The Supreme Court",
        "The High Court",
        "The Court of Appeal",
        "The Magistrate's Court",
      ],
      correct: 0,
    },
  ],
  8: [
    {
      question: "What offence is sexual intercourse with a girl under 16 years of age called?",
      answers: [
        "Sexual misconduct",
        "Sexual abuse",
        "Statutory rape",
        "Unnatural offences",
      ],
      correct: 2,
    },
    {
      question: "According to Sri Lankan law, what punishment may be given to a person who commits murder?",
      answers: [
        "Life imprisonment",
        "Twenty years' imprisonment",
        "The death penalty",
        "Community service",
      ],
      correct: 2,
    },
    {
      question: "What is the main responsibility of the public at a location where a person has been killed?",
      answers: [
        "Wash the crime scene",
        "Go close to the crime scene and watch",
        "Protect the crime scene by preventing anyone from entering until security personnel arrive",
        "Take photographs of the crime scene",
      ],
      correct: 2,
    },
  ],
  9: [
    {
      question: "What is the police emergency telephone number?",
      answers: [
        "119",
        "1990",
        "110",
        "1929",
      ],
      correct: 0,
    },
    {
      question: "What should an ordinary person do immediately after taking someone into custody?",
      answers: [
        "Hand the person over to the nearest police station",
        "Hand the person over to the nearest police officer",
        "Hand the person over to the Assistant Superintendent of Police",
        "Strike the person in order to restrain them",
      ],
      correct: 1,
    },
    {
      question: "Under Section 76 of the Police Ordinance, to whom should information about residents be provided when it is requested?",
      answers: [
        "The Grama Niladhari",
        "The Samurdhi officer",
        "The police officer",
        "The chief monk of the temple",
      ],
      correct: 2,
    },
  ],
  10: [
    {
      question: "What is the offence called when a thief enters a closed house through a window and takes away the goods inside?",
      answers: [
        "Theft",
        "Housebreaking",
        "Robbery",
        "Breach of public peace",
      ],
      correct: 1,
    },
    {
      question: "What should you do when the police ask for assistance to arrest a fleeing suspect?",
      answers: [
        "Refuse",
        "Provide assistance",
        "Avoid the situation",
        "Assault the suspect",
      ],
      correct: 1,
    },
    {
      question: "What is the minimum police-officer requirement for arresting a woman?",
      answers: [
        "A female officer must be present",
        "A female and a male officer must be present",
        "A male officer can do so",
        "The Officer-in-Charge of the police station must be present",
      ],
      correct: 2,
    },
  ],
};

let questionId = 1;
export const QUESTIONS_BY_SEGMENT: Record<number, Question[]> =
  Object.fromEntries(
    Object.entries(SINHALA_QUESTIONS_BY_SEGMENT).map(([segment, questions]) => [
      Number(segment),
      questions.map((sinhalaQuestion, index) => {
        const englishQuestion =
          ENGLISH_QUESTIONS_BY_SEGMENT[Number(segment)][index];

        return {
          id: questionId++,
          question: {
            en: englishQuestion.question,
            si: sinhalaQuestion.question,
          },
          answers: sinhalaQuestion.answers.map((answer, answerIndex) => ({
            en: englishQuestion.answers[answerIndex],
            si: answer,
          })),
          correctAnswer: sinhalaQuestion.correct,
        };
      }),
    ]),
  );