import { Devvit } from '@devvit/public-api';
import { questions, Answer, PorosityType, porosityDescription, porosityTips } from './quizData.js';
Devvit.configure({
  redditAPI: true,
});



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
    <vstack width="100%" height="100%" alignment="top center" gap="large">
      <hstack height="10%"></hstack>
      <text size="xlarge" width="90%" wrap>
        {question.question}
      </text>
      <vstack gap="medium" width="90%">
        {question.answers.map((answer, index) => (
          <hstack gap="small" alignment="middle center" key={index.toString()}>
            <button
              icon="checkmark"
              appearance="bordered"
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
  <vstack width="100%" height="100%" alignment="middle center" gap="large">
    <text size="xxlarge">💧 Hair Porosity Quiz</text>
    <text width="80%" wrap>
      Hair porosity refers to how easily your hair absorbs moisture. Knowing
      your hair's porosity helps you choose the right products.
    </text>
    <button appearance="bordered" onPress={() => setPage('q0')}>
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
    <vstack width="100%" height="100%" alignment="middle center" gap="medium">
      <hstack gap="small" alignment="middle center">
        <icon name="beta-latest"></icon>{' '}
        <text size="xxlarge">Your Results</text>
      </hstack>

      <text size="xlarge">You have {porosity} porosity hair!</text>
      <text width="90%" wrap size="small">
        {description}
      </text>
      <vstack gap="medium" width="90%">
        <text size="large" weight="bold">
          Tips for your hair type:
        </text>
        {tips.map((tip: string, index: number) => (
          <hstack gap="small" alignment="middle center" key={index.toString()}>
            <icon name="star"></icon>
            <text width="90%" wrap>
              {tip}
            </text>
          </hstack>
        ))}
      </vstack>
      <button onPress={() => setPage('intro')} appearance="bordered">
        Start Over
      </button>
    </vstack>
  );
};

Devvit.addCustomPostType({
  name: 'Hair Porosity Quiz',
  height: 'tall',
  render: (context) => {
    const [page, setPage] = context.useState('results');
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

    return (
      <zstack
        width="100%"
        height="100%"
        alignment="middle center"
        backgroundColor="#521eb3"
      >
        <image
          url="background.png"
          imageWidth={1344}
          imageHeight={840}
          width={100}
          height={100}
          resizeMode="cover"
          description="quiz background"
        />

        {currentPage}
      </zstack>
    );
  },
});

export default Devvit;
