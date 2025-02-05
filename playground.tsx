import { Devvit } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
});

const porosityDescription = {
  high: 'High porosity hair readily absorbs and loses moisture due to a raised or damaged cuticle layer.',
  low: 'Low porosity hair, with its tightly bound cuticle, resists moisture penetration and is prone to product buildup.',
  normal: 'Normal porosity hair has a healthy cuticle, allowing balanced moisture absorption and retention, making it easier to maintain and style.',
  mixed: 'Mixed porosity hair, often with porous ends and healthier roots due to damage or length, requires a balanced hair care approach.',
};

// Tips for each porosity type
const porosityTips = {
  high: [
    'Use leave-in conditioners and oils to seal in moisture',
    'Deep condition regularly',
    'Look for products with moisturizing ingredients',
  ],
  low: [
    'Focus on lightweight, easily absorbed products',
    'Regular clarifying treatments to remove buildup',
    'Apply products to damp hair to improve absorption',
  ],
  normal: [
    'Maintain balance with regular conditioning',
    'Choose products that are balanced, not too heavy or too light',
    'Deep condition occasionally for maintenance',
  ],
  mixed: [
    'Use lighter products near roots and heavier ones on ends',
    'Protect the ends with a pre-poo when shampooing or clarifying',
    'Deep condition focusing on the ends',
  ],
};

// Simplified quiz data
const questions = [
  {
    question: 'How long does it take your hair to get fully wet in the shower?',
    answers: [
      'Immediately - water soaks right in',
      'Takes a few minutes',
      'Takes forever - water beads up on my hair',
    ],
  },
  {
    question: 'How does your hair feel after using conditioner?',
    answers: [
      'Still dry and rough',
      'Soft and moisturized',
      'Heavy and coated',
    ],
  },
];

type PageProps = {
  setPage: (page: string) => void;
  currentQuestion: number;
};

const QuestionPage = ({ setPage, currentQuestion }: PageProps) => {
  const question = questions[currentQuestion];

  return (
    <vstack
      width="100%"
      height="100%"
      alignment="middle center"
      gap="large"
      backgroundColor="#008565"
    >
      <text size="xlarge" width="80%" wrap>
        {question.question}
      </text>
      <vstack gap="medium" width="80%">
        {question.answers.map((answer, index) => (
          <hstack gap="small" alignment="middle center">
            <button
              icon="checkmark"
              appearance="primary"
              key={index.toString()}
              onPress={() => {
                if (currentQuestion < questions.length - 1) {
                  setPage(`q${currentQuestion + 1}`);
                } else {
                  setPage('results');
                }
              }}
            ></button>
            <text width="80%" wrap>
              {answer}
            </text>
          </hstack>
        ))}
      </vstack>
    </vstack>
  );
};

const IntroPage = ({ setPage }: PageProps) => (
  <vstack
    width="100%"
    height="100%"
    alignment="middle center"
    gap="large"
    backgroundColor="#afb7dd"
  >
    <text size="xxlarge" color="black">
      💧 Hair Porosity Quiz
    </text>
    <text color="black" width="80%" wrap>
      Hair porosity refers to how easily your hair absorbs moisture. Knowing
      your hair's porosity helps you choose the right products.
    </text>
    <button appearance="primary" onPress={() => setPage('q0')}>
      Start Quiz
    </button>
  </vstack>
);

const ResultsPage = ({ setPage }: PageProps) => {
  // For playground, we'll just show high porosity tips
  const porosity = 'high';
  const tips = porosityTips[porosity];

  return (
    <vstack
      width="100%"
      height="100%"
      alignment="middle center"
      gap="small"
      backgroundColor="#ac245a"
    >
      <text size="xxlarge">Your Results</text>
      <text size="xlarge">You have {porosity} porosity hair!</text>
      <vstack gap="medium" width="80%">
        <text size="large">Tips for your hair type:</text>
        {tips.map((tip, index) => (
          <hstack gap="small" alignment="middle center" key={index.toString()}>
            <text>💧</text>
            <text width="80%" wrap>{tip}</text>
          </hstack>
        ))}
      </vstack>
      <button onPress={() => setPage('intro')}>Start Over</button>
    </vstack>
  );
};

Devvit.addCustomPostType({
  name: 'Simple Quiz',
  height: 'tall',
  render: (context) => {
    const [page, setPage] = context.useState('intro');

    let currentPage;
    if (page === 'intro') {
      currentPage = <IntroPage setPage={setPage} currentQuestion={0} />;
    } else if (page === 'results') {
      currentPage = <ResultsPage setPage={setPage} currentQuestion={0} />;
    } else {
      const questionNumber = parseInt(page.substring(1));
      currentPage = (
        <QuestionPage setPage={setPage} currentQuestion={questionNumber} />
      );
    }

    return <blocks>{currentPage}</blocks>;
  },
});

export default Devvit;
