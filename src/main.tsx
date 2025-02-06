import { Devvit } from '@devvit/public-api';
import {
  questions,
  Answer,
  PorosityType,
  porosityDescription,
  porosityTips,
} from './quizData.js';

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
  context?: Devvit.Context;
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
      <spacer size="medium" />
      <text color="white" width="90%" wrap={true}>
        {question.question}
      </text>
      <vstack gap="medium" width="90%">
        {question.answers.map((answer, index) => (
          <hstack gap="small" key={index.toString()} alignment="middle center">
            <button
              icon="checkmark"
              appearance="bordered"
              onPress={() => handleAnswerClick(answer)}
            ></button>
            <text
              color="white"
              width="80%"
              wrap={true}
              size="xsmall"
              height={
                answer.content.length > 77
                  ? '48px'
                  : answer.content.length > 36
                  ? '32px'
                  : undefined
              }
            >
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
    <hstack gap="small" alignment="middle center">
      <icon color="white" name="poll-post"></icon>
      <text size="xxlarge" color="white">
        Hair Porosity Quiz
      </text>
    </hstack>
    <text width="80%" wrap color="white">
      Hair porosity refers to how easily your hair absorbs moisture. Knowing
      your hair's porosity helps you choose the right products.
    </text>
    <button appearance="bordered" onPress={() => setPage('q0')}>
      Start Quiz
    </button>
  </vstack>
);

function ShareConfirmation(props: {
  closeConfirmationModal: () => void;
  onConfirmation: () => Promise<void>;
  isLoading: boolean;
}): JSX.Element {
  return (
    <vstack
      width="100%"
      height="100%"
      backgroundColor="#00000099"
      alignment="center middle"
    >
      <vstack
        maxWidth="300px"
        padding="medium"
        backgroundColor="neutral-background-weak"
        cornerRadius="large"
      >
        <hstack alignment="middle start" width="100%" grow>
          <icon name="warning" color="neutral-content-strong" />
          <spacer size="medium" />
          <text grow wrap width="100%">
            Share your hair porosity results as a comment?
          </text>
        </hstack>
        <spacer size="small" />
        <hstack alignment="end middle">
          <button
            appearance="bordered"
            onPress={props.closeConfirmationModal}
            disabled={props.isLoading}
          >
            Cancel
          </button>
          <button
            appearance="bordered"
            onPress={props.onConfirmation}
            disabled={props.isLoading}
          >
            Share
          </button>
        </hstack>
      </vstack>
    </vstack>
  );
}

function ShareSuccess(props: {
  closeSuccess: () => void;
  onViewClick: () => void;
}): JSX.Element {
  return (
    <vstack
      width="100%"
      height="100%"
      backgroundColor="#00000099"
      alignment="center middle"
    >
      <vstack
        maxWidth="300px"
        padding="medium"
        backgroundColor="#0E8A00"
        cornerRadius="large"
      >
        <hstack alignment="middle start" width="100%" grow>
          <icon name="checkmark" color="white" />
          <spacer size="medium" />
          <text grow wrap width="100%" color="white">
            Your results have been shared in the comments!
          </text>
        </hstack>
        <spacer size="small" />
        <hstack alignment="end middle">
          <button appearance="success" onPress={props.closeSuccess}>
            Close
          </button>
          <button appearance="success" onPress={props.onViewClick}>
            View Comment
          </button>
        </hstack>
      </vstack>
    </vstack>
  );
}

const ResultsPage = ({ setPage, scores, context }: PageProps) => {
  if (!context) {
    return (
      <vstack width="100%" height="100%" alignment="middle center">
        <text>Loading...</text>
      </vstack>
    );
  }

  const [isConfirmationVisible, setIsConfirmationVisible] =
    context.useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = context.useState(false);
  const [latestCommentLink, setLatestCommentLink] = context.useState<
    string | null
  >(null);

  // Find the highest score
  const entries = Object.entries(scores) as [PorosityType, number][];
  const [porosity] = entries.reduce((a, b) => (a[1] > b[1] ? a : b));

  const description = porosityDescription[porosity];
  const tips = porosityTips[porosity];

  const shareResults = async () => {
    const comment = await context.reddit.submitComment({
      id: context.postId!,
      text: `My Hair Porosity Quiz Results:

🌟 I have ${porosity} porosity hair!

${description}
`,
    });

    const link = new URL(
      comment.permalink,
      'https://www.reddit.com',
    ).toString();
    setLatestCommentLink(link);
    setIsConfirmationVisible(false);
    setIsSuccessVisible(true);
  };

  const openComment = (): void => {
    if (!latestCommentLink) return;
    context.ui.navigateTo(latestCommentLink);
    setIsSuccessVisible(false);
  };

  const mainContent = (
    <vstack width="100%" height="100%" alignment="middle center" gap="medium">
      <hstack gap="small" alignment="middle center">
        <icon color="white" name="award"></icon>
        <text size="xxlarge" color="white">
          Your Results
        </text>
      </hstack>

      <text size="xlarge" color="white">
        You have {porosity} porosity hair!
      </text>
      <text color="white" width="90%" wrap={true} size="small">
        {description}
      </text>
      <vstack gap="medium" width="90%">
        <text size="large" color="white" weight="bold">
          Tips for your hair type:
        </text>
        {tips.map((tip: string, index: number) => (
          <hstack gap="small" alignment="middle center" key={index.toString()}>
            <icon color="white" name="star"></icon>
            <text color="white" width="90%" wrap={true}>
              {tip}
            </text>
          </hstack>
        ))}
      </vstack>
      <hstack gap="medium">
        <button onPress={() => setPage('intro')} appearance="bordered">
          Start Over
        </button>
        <button
          onPress={() => setIsConfirmationVisible(true)}
          appearance="bordered"
        >
          Share Results
        </button>
      </hstack>
    </vstack>
  );

  return (
    <zstack width="100%" height="100%" alignment="middle center">
      {!isConfirmationVisible && !isSuccessVisible && mainContent}
      {isConfirmationVisible && (
        <ShareConfirmation
          closeConfirmationModal={() => setIsConfirmationVisible(false)}
          onConfirmation={shareResults}
          isLoading={false}
        />
      )}
      {isSuccessVisible && (
        <ShareSuccess
          closeSuccess={() => setIsSuccessVisible(false)}
          onViewClick={openComment}
        />
      )}
    </zstack>
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
          context={context}
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

// Add menu item to create the quiz
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
          <text size="large">Loading Hair Porosity Quiz...</text>
        </vstack>
      ),
    });
    context.ui.showToast('Quiz post created!');
  },
});

export default Devvit;
