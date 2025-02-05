import { Devvit } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
});

type PorosityType = 'high' | 'low' | 'normal' | 'mixed';

const porosityDescription: Record<PorosityType, string> = {
  high: 'High porosity hair readily absorbs and loses moisture due to a raised or damaged cuticle layer.',
  low: 'Low porosity hair, with its tightly bound cuticle, resists moisture penetration and is prone to product buildup.',
  normal:
    'Normal porosity hair has a healthy cuticle, allowing balanced moisture absorption and retention, making it easier to maintain and style.',
  mixed:
    'Mixed porosity hair, often with porous ends and healthier roots due to damage or length, requires a balanced hair care approach.',
};

// Tips for each porosity type
const porosityTips: Record<PorosityType, string[]> = {
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

interface Answer {
  content: string;
  high?: number;
  low?: number;
  normal?: number;
  mixed?: number;
}

interface Question {
  question: string;
  answers: Answer[];
}

const questions: Question[] = [
  {
    question: 'Which sounds more like your experience with products:',
    answers: [
      {
        content:
          'Products sit on my hair and end up looking like grease or buildup',
        low: 4,
      },
      {
        content:
          'My hair absorbs products like a sponge, so I have to use a lot of product',
        high: 4,
      },
      {
        content:
          'My scalp tends to be oily but the ends of my hair absorb products like a sponge',
        mixed: 4,
      },
      {
        content: "I don't really have either of these issues",
        normal: 4,
      },
    ],
  },
  {
    question: 'I do not absorb hair color or treatments easily',
    answers: [
      {
        content: 'Yes',
        low: 2,
      },
      {
        content: 'No, they absorb just fine',
        normal: 2,
      },
      {
        content: "I don't color so this doesn't apply to me",
      },
      {
        content: "The ends of my hair absorb well but the scalp doesn't",
        mixed: 2,
      },
    ],
  },
  {
    question:
      'My hair takes a long time to dry compared to other people with similar hair density',
    answers: [
      {
        content: 'Yes, ugh it takes forever to dry',
        low: 2,
      },
      {
        content: 'No, it seems to take a pretty normal amount of time to dry',
        normal: 2,
      },
      {
        content: 'My hair dries quickly',
        high: 2,
      },
      {
        content:
          'The ends of my hair dry quickly but the scalp takes a long time to dry',
        mixed: 2,
      },
    ],
  },
  {
    question: 'Which describes your hair better?',
    answers: [
      {
        content: 'My hair looks dull and dry',
        high: 2,
      },
      {
        content: 'My hair appears healthy and shiny, but has little volume',
        low: 2,
      },
      {
        content: 'My hair has a good amount of volume and looks pretty healthy',
        normal: 0,
      },
      {
        content:
          'My hair appears healthy and shiny at the roots, but the ends are dry and dull',
        mixed: 2,
      },
    ],
  },
  {
    question:
      'My hair was previously bleached, colored, or permed or otherwise heavily processed/heat damaged within the past year',
    answers: [
      {
        content: 'Yes',
        high: 2,
        mixed: 2,
      },
      {
        content: 'Nope',
        normal: 0,
      },
    ],
  },
  {
    question: 'Have you tried oils in your hair?',
    answers: [
      {
        content: 'Yes, and they made my hair look limp and greasy',
        low: 2,
      },
      {
        content: 'Oils make my hair look healthy and shiny',
        high: 2,
      },
      {
        content:
          'Some oils work well in my hair but I have to be careful and use only some types and/or in small amounts',
        normal: 1,
      },
      {
        content: "Hmm I've never tried oil on my hair before",
      },
      {
        content:
          'I can oil the ends of my hair but if I use oil near my scalp it makes it look greasy',
        mixed: 2,
      },
    ],
  },
  {
    question: 'Which do you need more of?',
    answers: [
      {
        content: 'Clarifying treatments',
        low: 2,
      },
      {
        content: 'Deep conditioning',
        high: 2,
      },
      {
        content: "I don't use either",
        normal: 2,
      },
      {
        content: 'I need both',
        mixed: 2,
        normal: 2,
      },
    ],
  },
  {
    question: 'How often do you need to wash your hair?',
    answers: [
      {
        content: 'I seem to need to wash my hair often or it looks greasy',
        low: 2,
      },
      {
        content:
          'I can go a few days (3-4) without washing and my hair looks great',
        normal: 2,
      },
      {
        content: 'I can go over 4 days without washing and my hair looks great',
        high: 2,
      },
    ],
  },
  {
    question: 'How does your hair respond to sulfate-containing shampoo?',
    answers: [
      {
        content: 'It looks fine or great!',
        low: 2,
      },
      {
        content: 'It seems a little dry',
        normal: 1,
      },
      {
        content:
          'Sulfate-containg shampoos make my hair look very dry and unhealthy',
        high: 2,
      },
      {
        content:
          'I can use sulfate-containing shampoo but I need to protect my ends',
        mixed: 2,
      },
    ],
  },
  {
    question: 'What cleanser works best for your hair?',
    answers: [
      {
        content: 'Low-poo (a very gentle sulfate-free shampoo)',
        low: 1,
      },
      {
        content: 'Regular shampoo',
        low: 2,
      },
      {
        content: "I don't know about this or I haven't tried both",
        normal: 0,
      },
      {
        content: 'I alternate multiple (such as cowash and low poo)',
        normal: 1,
        mixed: 1,
      },
      {
        content: 'Co-wash',
        high: 1,
      },
    ],
  },
  {
    question: 'How long is your hair?',
    answers: [
      {
        content: 'Short',
      },
      {
        content: 'Medium',
      },
      {
        content: 'Long',
        mixed: 2,
      },
      {
        content: 'Super long',
        mixed: 4,
      },
    ],
  },
];

interface Scores {
  high: number;
  low: number;
  normal: number;
  mixed: number;
  [key: string]: number;
}

type PageProps = {
  setPage: (page: string) => void;
  currentQuestion: number;
  scores: Scores;
  setScores: (scores: Scores) => void;
};

const QuestionPage = ({
  setPage,
  currentQuestion,
  scores,
  setScores,
}: PageProps) => {
  const question = questions[currentQuestion];

  const handleAnswerClick = (answer: Answer) => {
    const newScores = { ...scores };
    if (answer.high) newScores.high += answer.high;
    if (answer.low) newScores.low += answer.low;
    if (answer.normal) newScores.normal += answer.normal;
    if (answer.mixed) newScores.mixed += answer.mixed;
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setPage(`q${currentQuestion + 1}`);
    } else {
      setPage('results');
    }
  };

  return (
    <vstack
      width="100%"
      height="100%"
      alignment="middle center"
      gap="large"
      backgroundColor="#008565"
    >
      <text size="xlarge" width="90%" wrap>
        {question.question}
      </text>
      <vstack gap="medium" width="90%">
        {question.answers.map((answer, index) => (
          <hstack gap="small" alignment="middle center" key={index.toString()}>
            <button
              icon="checkmark"
              appearance="primary"
              onPress={() => handleAnswerClick(answer)}
            ></button>
            <text width="80%" wrap>
              {answer.content}
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

const ResultsPage = ({ setPage, scores }: PageProps) => {
  // Find the highest score
  const entries = Object.entries(scores) as [PorosityType, number][];
  const [porosity] = entries.reduce((a, b) => (a[1] > b[1] ? a : b));

  const description = porosityDescription[porosity];
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
      <text width="90%" wrap>
        {description}
      </text>
      <vstack gap="medium" width="90%">
        <text size="large" weight="bold">Tips for your hair type:</text>
        {tips.map((tip: string, index: number) => (
          <hstack gap="small" alignment="middle center" key={index.toString()}>
            <text>💧</text>
            <text width="80%" wrap>
              {tip}
            </text>
          </hstack>
        ))}
      </vstack>
      <button onPress={() => setPage('intro')}>Start Over</button>
    </vstack>
  );
};

Devvit.addCustomPostType({
  name: 'Hair Porosity Quiz',
  height: 'tall',
  render: (context) => {
    const [page, setPage] = context.useState('intro');
    const [scores, setScores] = context.useState<Scores>({
      high: 0,
      low: 0,
      normal: 0,
      mixed: 0,
    });

    let currentPage;
    if (page === 'intro') {
      currentPage = (
        <IntroPage
          setPage={setPage}
          scores={scores}
          setScores={setScores}
          currentQuestion={0}
        />
      );
    } else if (page === 'results') {
      currentPage = (
        <ResultsPage
          setPage={setPage}
          scores={scores}
          setScores={setScores}
          currentQuestion={0}
        />
      );
    } else {
      const questionNumber = parseInt(page.substring(1));
      currentPage = (
        <QuestionPage
          setPage={setPage}
          scores={scores}
          setScores={setScores}
          currentQuestion={questionNumber}
        />
      );
    }

    return <blocks>{currentPage}</blocks>;
  },
});

export default Devvit;
