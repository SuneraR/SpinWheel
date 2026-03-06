export type Question = {
  question: string;
  answers: string[];
  correct: number;
};

// Questions database - 8 segments with 4 questions each
export const QUESTIONS_BY_SEGMENT: Record<number, Question[]> = {
  1: [
    {
      question: 'What is the main function of the ozone layer in the Earth\'s atmosphere?',
      answers: ['Produce rainfall', 'Trap heat and warm the Earth', 'Block harmful ultraviolet (UV) rays from the sun', 'Create wind patterns'],
      correct: 2,
    },
    {
      question: 'Which of the following is a natural refrigerant?',
      answers: ['Chlorofluorocarbon (CFC)', 'Ammonia (NH₃)', 'Hydrochlorofluorocarbon (HCFC)', 'Hydrofluorocarbon (HFC)'],
      correct: 1,
    },
    {
      question: 'Which international agreement helps fight global warming by reducing HFCs (a type of greenhouse gas)?',
      answers: ['Basel Convention', 'Kyoto Protocol', 'Kigali Amendment', 'Stockholm Convention'],
      correct: 2,
    },
    {
      question: 'Which substance has zero Ozone Depletion Potential (ODP) but a high Global Warming Potential (GWP)?',
      answers: ['Chlorofluorocarbon (CFC)', 'Hydrochlorofluorocarbon (HCFC)', 'Hydrofluorocarbon (HFC)', 'Carbon dioxide (CO₂)'],
      correct: 2,
    },
  ],
  2: [
    {
      question: 'In which year did Sri Lanka ratify the Montreal Protocol?',
      answers: ['1990', '1989', '1995', '2003'],
      correct: 1,
    },
    {
      question: 'What does ODP stand for?',
      answers: ['Ozone Development Plan', 'Ozone Depletion Potential', 'Oxygen Distribution Point', 'Ozone Density Parameter'],
      correct: 1,
    },
    {
      question: 'Which refrigerant is being phased out globally and considered obsolete?',
      answers: ['R-290', 'R-32', 'R-22', 'Ammonia'],
      correct: 2,
    },
    {
      question: 'What is the objective of Sri Lanka\'s HCFC Phase-Out Management Plan (HPMP)?',
      answers: ['Increase imports', 'Gradually eliminate HCFC use', 'Promote R-22', 'Ban electricity'],
      correct: 1,
    },
  ],
  3: [
    {
      question: 'Which refrigerant has zero ODP but high GWP?',
      answers: ['CFC', 'HCFC', 'HFC', 'R-290'],
      correct: 2,
    },
    {
      question: 'R-290 is also known as:',
      answers: ['Methane', 'Propane', 'Butane', 'Ethane'],
      correct: 1,
    },
    {
      question: 'R-290 has:',
      answers: ['High ODP', 'High GWP', 'Zero ODP & very low GWP', 'No cooling ability'],
      correct: 2,
    },
    {
      question: 'Which refrigerant is recommended as a lower-GWP alternative?',
      answers: ['R-22', 'R-410A', 'R-32', 'CFC-11'],
      correct: 2,
    },
  ],
  4: [
    {
      question: 'Sustainable cooling means:',
      answers: ['Maximum cooling at any cost', 'Cooling with minimal environmental impact', 'Using old technology', 'High electricity use'],
      correct: 1,
    },
    {
      question: 'Inverter technology helps to:',
      answers: ['Run compressor at full speed always', 'Adjust compressor speed to save energy', 'Increase refrigerant use', 'Reduce lifespan'],
      correct: 1,
    },
    {
      question: 'More stars on the Energy Efficiency Label mean:',
      answers: ['Higher consumption', 'Lower efficiency', 'More energy efficient', 'Larger unit'],
      correct: 2,
    },
    {
      question: 'Cleaning indoor air filters should be done:',
      answers: ['Monthly', 'Every 3–6 months', 'Every 5 years', 'Never'],
      correct: 1,
    },
  ],
  5: [
    {
      question: 'Annual servicing should be done by:',
      answers: ['Homeowner', 'Neighbor', 'Certified technician', 'Electric shop'],
      correct: 2,
    },
    {
      question: 'When refrigerant leaks, the technician must:',
      answers: ['Top-up immediately', 'Replace AC', 'Fix leak before topping up', 'Add different gas'],
      correct: 2,
    },
    {
      question: 'Why should refrigerants not be mixed or retrofitted improperly?',
      answers: ['Saves money', 'Improves cooling', 'Causes safety & performance risks', 'Reduces energy use'],
      correct: 2,
    },
    {
      question: 'Outdoor unit should be installed at least how far from the wall?',
      answers: ['0.1 m from wall', '0.3 m', '0.5 m', '1 m'],
      correct: 2,
    },
  ],
  6: [
    {
      question: 'Vacuuming pipes before installation removes:',
      answers: ['Extra gas', 'Vapor & dirt', 'Oil', 'Pressure'],
      correct: 1,
    },
    {
      question: 'Energy-efficient cooling helps reduce:',
      answers: ['Electricity bills', 'Greenhouse gas emissions', 'Power demand', 'All of the above'],
      correct: 3,
    },
    {
      question: 'Training technicians on flammable refrigerants is important because:',
      answers: ['No risk', 'Safety procedures differ', 'No need for skill', 'Increases cost'],
      correct: 1,
    },
    {
      question: 'Phasing down HFCs contributes to:',
      answers: ['Climate action', 'Sustainable development', 'Environmental protection', 'All of the above'],
      correct: 3,
    },
  ],
  7: [
    {
      question: 'Natural refrigerants support:',
      answers: ['High GWP', 'Ozone depletion', 'Environmental sustainability', 'Energy waste'],
      correct: 2,
    },
    {
      question: 'Sri Lanka\'s transition to low-GWP technologies demonstrates commitment to:',
      answers: ['Global environmental agreements', 'Climate responsibility', 'Sustainable cooling future', 'All of the above'],
      correct: 3,
    },
    {
      question: 'When purchasing a refrigerator for your home, what is the MOST important consideration?',
      answers: ['The color of the refrigerator', 'Choosing the largest available size', 'Selecting the required capacity for your household needs', 'Buying the cheapest model'],
      correct: 2,
    },
    {
      question: 'Which refrigerant is considered environmentally friendly for domestic refrigerators?',
      answers: ['R-22', 'R-600a', 'CFC-12', 'R-410A'],
      correct: 1,
    },
  ],
  8: [
    {
      question: 'Why should refrigerator maintenance be carried out at workshops with refrigerant recovery facilities?',
      answers: ['To increase cooling', 'To reduce electricity use', 'To prevent releasing refrigerant into the atmosphere', 'To change compressor speed'],
      correct: 2,
    },
    {
      question: 'When using a domestic air conditioner, the recommended room temperature setting for energy efficiency is:',
      answers: ['18°C', '20°C', '25–26°C', '30°C'],
      correct: 2,
    },
    {
      question: 'If refrigerant leaks from a mobile (vehicle) air conditioner, what should be done?',
      answers: ['Immediately top-up refrigerant', 'Ignore the leak', 'Fix the leak first, then recharge refrigerant', 'Replace the vehicle'],
      correct: 2,
    },
    {
      question: 'What is the recommended way to install the outdoor unit of a domestic air conditioner?',
      answers: ['In direct sunlight for faster cooling', 'In a well-ventilated area, away from direct sunlight', 'Inside a closed cabinet', 'On top of the roof without shade'],
      correct: 1,
    },
  ],
};
