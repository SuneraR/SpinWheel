export type Language = 'en' | 'si';

type TranslationSet = {
  spinWheel: string;
  bonusSpin: string;
  spin: string;
  continue: string;
  playAgain: string;
  tapToStart: string;
  selectedNumber: string;
  selectLanguage: string;
  gameOver: string;
  niceTry: string;
  youWin: string;
  missionComplete: string;
  loading: string;
  correct: string;
  incorrect: string;
  accuracy: string;
  question: string;
  correctAnswers: string;
  wrongAnswers: string;
  betterLuck: string;
  secondRoundThanks: string;
  officialChallenge: string;
  testKnowledge: string;
  startGame: string;
  preparingNextPlayer: string;
  questions: string;
  finishedAccuracy: (accuracy: number) => string;
  spinProgress: (current: number, total: number) => string;
  questionProgress: (current: number, total: number) => string;
};

export const translations: Record<Language, TranslationSet> = {
  en: {
    spinWheel: 'Spin the Wheel!',
    bonusSpin: 'Bonus Spin!',
    spin: 'SPIN',
    continue: 'Continue',
    playAgain: 'PLAY AGAIN',
    tapToStart: 'Tap to Start',
    selectedNumber: 'Selected Number',
    selectLanguage: 'Select Language',
    gameOver: 'Game Over',
    niceTry: 'Nice Try!',
    youWin: 'You Win!',
    missionComplete: 'Mission Complete!',
    loading: 'Loading...',
    correct: 'Correct',
    incorrect: 'Incorrect',
    accuracy: 'Accuracy',
    question: 'Question',
    correctAnswers: 'Correct Answers',
    wrongAnswers: 'Wrong Answers',
    betterLuck: 'Better luck next time!',
    secondRoundThanks: 'You made it to the second round. Thanks for playing!',
    officialChallenge: 'Official event knowledge challenge',
    testKnowledge: 'Test your knowledge!',
    startGame: 'Start Game',
    preparingNextPlayer: 'Preparing for the next player...',
    questions: 'Questions',
    finishedAccuracy: (value) => `You finished with ${value}% accuracy.`,
    spinProgress: (current, total) => `Spin ${current} of ${total}`,
    questionProgress: (current, total) => `Question ${current} of ${total}`,
  },
  si: {
    spinWheel: 'රෝදය කරකවන්න',
    bonusSpin: 'අමතර වාරය!',
    spin: 'කරකවන්න',
    continue: 'ඉදිරියට',
    playAgain: 'නැවත ක්‍රීඩා කරන්න',
    tapToStart: 'ආරම්භ කිරීමට ස්පර්ශ කරන්න',
    selectedNumber: 'තෝරාගත් අංකය',
    selectLanguage: 'භාෂාව තෝරන්න',
    gameOver: 'ක්‍රීඩාව අවසන්',
    niceTry: 'හොඳ උත්සාහයක්!',
    youWin: 'ඔබ දිනුම්!',
    missionComplete: 'මෙහෙයුම සම්පූර්ණයි!',
    loading: 'පූරණය වෙමින්...',
    correct: 'නිවැරදියි',
    incorrect: 'වැරදියි',
    accuracy: 'නිරවද්‍යතාවය',
    question: 'ප්‍රශ්නය',
    correctAnswers: 'නිවැරදි පිළිතුරු',
    wrongAnswers: 'වැරදි පිළිතුරු',
    betterLuck: 'ඊළඟ වාරයේ වඩා හොඳින් උත්සාහ කරන්න!',
    secondRoundThanks: 'ඔබ දෙවන වටයට පැමිණියා. ක්‍රීඩා කළාට ස්තුතියි!',
    officialChallenge: 'නිල උත්සව දැනුම අභියෝගය',
    testKnowledge: 'ඔබේ දැනුම පරීක්ෂා කරන්න!',
    startGame: 'ක්‍රීඩාව ආරම්භ කරන්න',
    preparingNextPlayer: 'ඊළඟ ක්‍රීඩකයා සඳහා සූදානම් වෙමින්...',
    questions: 'ප්‍රශ්න',
    finishedAccuracy: (value) => `ඔබ ${value}% නිරවද්‍යතාවයකින් අවසන් කළා.`,
    spinProgress: (current, total) => `වාරය ${current} / ${total}`,
    questionProgress: (current, total) => `ප්‍රශ්නය ${current} / ${total}`,
  },
};
