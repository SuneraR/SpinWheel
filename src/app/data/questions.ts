export type Question = {
  question: string;
  answers: string[];
  correct: number;
};

// Questions database — replaced with World Environment Day question segments
export const QUESTIONS_BY_SEGMENT: Record<number, Question[]> = {
  1: [
    {
      question: 'What is the most preferred option in the waste management hierarchy?',
      answers: ['Reduce', 'Recycling', 'Reuse', 'Land Filling'],
      correct: 0,
    },
    {
      question: 'Which greenhouse gas contributes the most to human-induced global warming?',
      answers: ['Oxygen', 'Carbon dioxide (CO₂)', 'Nitrogen', 'Helium'],
      correct: 1,
    },
    {
      question: 'Biodiversity refers to:',
      answers: ['Variety of rocks in an area', 'Variety of living organisms and ecosystems', 'Types of pollution in a region', 'Number of people in a country'],
      correct: 1,
    },
    {
      question: 'Which pollutant is commonly produced by motor vehicle exhausts?',
      answers: ['Carbon monoxide', 'Oxygen', 'Hydrogen', 'Neon'],
      correct: 0,
    },
  ],
  2: [
    {
      question: 'Which of the following is a major cause of water pollution?',
      answers: ['Tree planting', 'Rainfall', 'Industrial effluent discharge', 'Solar energy use'],
      correct: 2,
    },
    {
      question: 'World Environment Day is celebrated annually on:',
      answers: ['March 22', 'April 22', 'June 5', 'July 11'],
      correct: 2,
    },
    {
      question: 'What is the role of decomposers in an ecosystem?',
      answers: ['Produce food using sunlight', 'Pollinate flowers', 'Break down dead organic matter', 'Consume only plants'],
      correct: 2,
    },
    {
      question: 'An Environmental Impact Assessment (EIA) is mainly conducted to:',
      answers: ['Increase taxes', 'Predict environmental effects of proposed projects', 'Promote tourism', 'Measure population growth'],
      correct: 1,
    },
  ],
  3: [
    {
      question: 'The continuous movement of water on, above, and below Earth\'s surface is called the:',
      answers: ['Carbon cycle', 'Nitrogen cycle', 'Water cycle', 'Rock cycle'],
      correct: 2,
    },
    {
      question: 'Which of the following is a renewable energy source?',
      answers: ['Coal', 'Natural gas', 'Solar energy', 'Diesel'],
      correct: 2,
    },
    {
      question: 'Which type of rock is formed by the cooling and solidification of magma?',
      answers: ['Sedimentary rock', 'Metamorphic rock', 'Igneous rock', 'Limestone'],
      correct: 2,
    },
    {
      question: 'Which sector contributes significantly to methane emissions globally?',
      answers: ['Agriculture', 'Libraries', 'Telecommunications', 'Tourism'],
      correct: 0,
    },
  ],
  4: [
    {
      question: 'Which ecosystem is known for having the highest biodiversity on Earth?',
      answers: ['Desert', 'Tropical rainforest', 'Tundra', 'Grassland'],
      correct: 1,
    },
    {
      question: 'What does PM2.5 refer to?',
      answers: ['Carbon particles larger than 25 mm', 'Fine particulate matter with diameter less than 2.5 μm', 'Sulfur dioxide gas', 'Ozone concentration'],
      correct: 1,
    },
    {
      question: 'Excessive nutrient enrichment of water bodies leading to algal blooms is called:',
      answers: ['Evaporation', 'Eutrophication', 'Infiltration', 'Sedimentation'],
      correct: 1,
    },
    {
      question: 'Which of the following is a microplastic?',
      answers: ['A plastic bottle cap', 'A plastic bag', 'Plastic particles smaller than 5 mm', 'A fishing net'],
      correct: 2,
    },
  ],
  5: [
    {
      question: 'The kinetic energy of wind is converted into electricity by:',
      answers: ['Solar panels', 'Wind turbines', 'Batteries', 'Transformers'],
      correct: 1,
    },
    {
      question: 'What is the process by which water seeps into the soil surface?',
      answers: ['Condensation', 'Runoff', 'Infiltration', 'Evaporation'],
      correct: 2,
    },
    {
      question: 'Which city became the world\'s first accredited Ramsar Wetland City?',
      answers: ['Singapore', 'Colombo', 'Amsterdam', 'Kuala Lumpur'],
      correct: 1,
    },
    {
      question: 'World Biodiversity Day is celebrated annually on:',
      answers: ['March 22', 'May 22', 'June 5', 'July 11'],
      correct: 1,
    },
  ],
  6: [
    {
      question: 'Which of the following acts as a major carbon sink?',
      answers: ['Forests', 'Roads', 'Buildings', 'Factories'],
      correct: 0,
    },
    {
      question: 'Which of these is a sign of polluted air?',
      answers: ['Clear sky and fresh air', 'Thick smoke and bad smell', 'Healthy trees', 'Clean surroundings'],
      correct: 1,
    },
    {
      question: 'What can people do to reduce air pollution from transport?',
      answers: ['Use public transport', 'Use more cars for short trips', 'Leave vehicles idling', 'Burn fuel unnecessarily'],
      correct: 0,
    },
    {
      question: 'What is the main function of the ozone layer in the Earth\'s atmosphere?',
      answers: ['Produce rainfall', 'Trap heat and warm the Earth', 'Block harmful ultraviolet (UV) rays from the sun', 'Create wind patterns'],
      correct: 2,
    },
  ],
  7: [
    {
      question: 'What does ODP stand for?',
      answers: ['Ozone Development Plan', 'Ozone Depletion Potential', 'Oxygen Distribution Point', 'Ozone Density Parameter'],
      correct: 1,
    },
    {
      question: 'Which of the following is a natural refrigerant?',
      answers: ['Chlorofluorocarbon (CFC)', 'Ammonia (NH₃)', 'Hydrochlorofluorocarbon (HCFC)', 'Hydrofluorocarbon (HFC)'],
      correct: 1,
    },
    {
      question: 'More stars on the Energy Efficiency Label mean:',
      answers: ['Higher consumption', 'Lower efficiency', 'More energy efficient', 'Larger unit'],
      correct: 2,
    },
    {
      question: 'Energy-efficient cooling helps reduce:',
      answers: ['Electricity bills', 'Greenhouse gas emissions', 'Power demand', 'All of the above'],
      correct: 3,
    },
  ],
  8: [
    {
      question: 'Natural refrigerants support:',
      answers: ['High GWP', 'Ozone depletion', 'Environmental sustainability', 'Energy waste'],
      correct: 2,
    },
    {
      question: 'How can you reduce energy loss when using a refrigerator?',
      answers: ['Place hot food directly inside', 'Store food properly and minimize door openings', 'Keep the refrigerator in direct sunlight', 'Leave the door slightly open'],
      correct: 1,
    },
    {
      question: 'When is the International Day of Clean Air for Blue Skies celebrated every year?',
      answers: ['September 9', 'September 7', 'September 20', 'September 16'],
      correct: 1,
    },
    {
      question: 'What does "Net Zero" mean?',
      answers: ['Producing no electricity', 'Balancing greenhouse gas emissions with removals from the atmosphere', 'Eliminating all industries', 'Stopping all transportation'],
      correct: 1,
    },
  ],
  9: [
    // {
    //   question: 'What is a carbon footprint?',
    //   answers: ['Land area covered by forests', 'Amount of greenhouse gases emitted by an activity or person', 'Size of an industrial building', 'Air quality index'],
    //   correct: 1,
    // },
    {
      question: 'Climate change is expected to increase the frequency and intensity of:',
      answers: ['Earthquakes', 'Extreme weather events', 'Solar eclipses', 'Volcanic eruptions'],
      correct: 1,
    },
    {
      question: 'Excessive use of fertilizers and pesticides can lead to:',
      answers: ['Improved biodiversity', 'Soil contamination', 'Increased soil fertility forever', 'Reduced pollution'],
      correct: 1,
    },
    {
      question: 'Discarded electronic devices such as computers and mobile phones are known as:',
      answers: ['Green waste', 'Municipal waste', 'E-waste', 'Organic waste'],
      correct: 2,
    },
  ],
  10: [
    {
      question: 'Open dumping of waste may result in:',
      answers: ['Improved sanitation', 'Soil and groundwater contamination', 'Better air quality', 'Increased biodiversity'],
      correct: 1,
    },
    {
      question: 'Which heavy metal commonly contaminates soil near industrial areas?',
      answers: ['Sodium', 'Calcium', 'Lead', 'Potassium'],
      correct: 2,
    },
    {
      question: 'Leachate from landfills refers to:',
      answers: ['Gas released from waste decomposition', 'Liquid that drains through waste and may carry contaminants', 'Recycled plastic material', 'Organic fertilizer'],
      correct: 1,
    },
  ],
};
