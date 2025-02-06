# Hair Porosity Quiz

A Reddit-based interactive quiz application that helps users understand their hair porosity type. This app guides users through a series of questions about their hair characteristics and provides personalized results and care recommendations.

This is a port of the CurlsBot hair porosity quiz, by the same developer who made CurlsBot.

## App Overview

The Hair Porosity Quiz is designed to help users:

- Determine their hair's porosity level (high, low, normal, or mixed)
- Understand how their hair interacts with moisture and products
- Get personalized hair care recommendations
- Share their results with the community

The quiz uses a scoring system based on common hair characteristics and behaviors to accurately assess porosity levels. Results include both an explanation of the porosity type and specific care tips tailored to the user's hair needs.

## Features

- Interactive quiz with multiple-choice questions
- Beautiful UI with a responsive design
- Results showing hair porosity type (high, low, normal, or mixed)
- Detailed description of your hair porosity type
- Personalized tips for hair care
- Ability to share results as a comment
- Progress saving throughout the quiz

## How to Use

### For Subreddit Moderators

1. Install the app in your subreddit through Reddit's app directory
2. Use the "Create Hair Porosity Quiz" option in the subreddit menu to create a new quiz post
3. The quiz will automatically appear as an interactive post in your subreddit

### For Users

1. Find a Hair Porosity Quiz post in participating subreddits
2. Click "Start Quiz" to begin
3. Answer each question honestly based on your hair's characteristics
4. View your results, which include:
   - Your hair porosity type
   - A detailed explanation of what this means
   - Personalized care tips
5. Optionally share your results in the comments
6. Use the "Start Over" button if you want to retake the quiz

## Development

### Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd porosity-quiz
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

### Tech Stack

- Devvit (Reddit's app platform)
- TypeScript
- React-like components

## Changelog

### Version 0.0.6 (Current)

- Making quiz text more responsive

### Version 0.0.5

- Fixing clipping text on mobile

### Version 0.0.4

- Updated the version since I initially didn't understand how versioning worked 🤦‍♀️

### Version 0.0.3

- Initial release
- Basic quiz functionality with 11 questions
- Results page with porosity type, description, and tips
- Share results feature
- Subreddit menu integration for creating new quizzes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
