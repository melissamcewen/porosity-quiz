// Learn more at developers.reddit.com/docs
import { Devvit } from '@devvit/public-api';
import { quizQuestions, Answer } from './quizData.js';

Devvit.configure({
  redditAPI: true,
});

interface Scores {
  high: number;
  low: number;
  normal: number;
  mixed: number;
  [key: string]: number; // Add index signature
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
  const question = quizQuestions[currentQuestion];

  const handleAnswerClick = (answer: Answer) => {
    const newScores = { ...scores };
    if (answer.high) newScores.high += answer.high;
    if (answer.low) newScores.low += answer.low;
    if (answer.normal) newScores.normal += answer.normal;
    if (answer.mixed) newScores.mixed += answer.mixed;
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setPage(`q${currentQuestion + 1}`);
    } else {
      setPage('results');
    }
  };

  return (
    <vstack width="100%" height="100%" alignment="middle center" gap="large">
      <text size="xlarge">{question.question}</text>
      <vstack gap="medium">
        {question.answers.map((answer: Answer, index: number) => (
          <button
            key={index.toString()}
            onPress={() => handleAnswerClick(answer)}
          >
            {answer.content}
          </button>
        ))}
      </vstack>
    </vstack>
  );
};

const IntroPage = ({ setPage }: PageProps) => (
  <vstack width="100%" height="100%" alignment="middle center" gap="large">
    <text size="xxlarge">Hair Porosity Quiz</text>
    <text>
      Beep boop! Confused about hair porosity? 🤖 It's like your hair's
      drinkability! 🥤
    </text>
    <text>
      High porosity hair is thirsty, low porosity hair is picky, normal porosity
      is just right, and mixed porosity is a combination.
    </text>
    <text>Let's figure out your hair's personality and porosity level!</text>
    <button appearance="primary" onPress={() => setPage('q0')}>
      Start Quiz
    </button>
  </vstack>
);

const ResultsPage = ({ scores }: PageProps) => {
  // Find the highest score
  const entries = Object.entries(scores) as [keyof Scores, number][];
  const [highestType] = entries.reduce((a, b) => (a[1] > b[1] ? a : b));

  let resultText = '';
  switch (highestType) {
    case 'high':
      resultText =
        'You have high porosity hair! Your hair readily absorbs moisture but may need extra help retaining it.';
      break;
    case 'low':
      resultText =
        'You have low porosity hair! Your hair is resistant to absorbing moisture but good at retaining it once absorbed.';
      break;
    case 'mixed':
      resultText =
        'You have mixed porosity hair! Different parts of your hair have different porosity levels.';
      break;
    default:
      resultText =
        'You have normal porosity hair! Your hair has a good balance of moisture absorption and retention.';
  }

  return (
    <vstack width="100%" height="100%" alignment="middle center" gap="large">
      <text size="xxlarge">Your Results</text>
      <text size="xlarge">{resultText}</text>
    </vstack>
  );
};

Devvit.addCustomPostType({
  name: 'Hair Porosity Quiz',
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

    return <vstack>{currentPage}</vstack>;
  },
});

// Add a menu item to create the quiz post
Devvit.addMenuItem({
  label: 'Create Hair Porosity Quiz',
  location: 'subreddit',
  onPress: async (_event, context) => {
    const subreddit = await context.reddit.getCurrentSubreddit();
    await context.reddit.submitPost({
      title: 'Hair Porosity Quiz',
      subredditName: subreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading Quiz...</text>
        </vstack>
      ),
    });
    context.ui.showToast('Quiz post created!');
  },
});

export default Devvit;
