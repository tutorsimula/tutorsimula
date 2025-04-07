// src/data/lessonData.js
export const lessons = [
  {
    id: 1,
    title: 'History of Python & Its Importance',
    topic: 'intro',
    stages: {
      explanation: {
        text: `Introduction:\nPython is a powerful, easy-to-learn programming language used in web development, data science, AI, and more.\nLet's explore its history and why it's so important today.\nThe Birth of Python: Created by Guido van Rossum in 1991.\nNamed after Monty Python's Flying Circus (a comedy show).\nPython was designed to be readable, simple, and fun.\nKey Milestones:\n1991: First version (Python 0.9.0) released.\n2000: Python 2.0 introduced (better features).\n2008: Python 3.0 released (major improvements).\n2020: Python 2 officially discontinued.\nWhy Python is Important?\nEasy to Learn: Simple syntax, great for beginners.\nVersatile: Used in web dev, AI, data science, automation.\nLarge Community: Many free libraries (like NumPy, Django).\nHigh Demand: Top language for jobs in tech.\nPython Today Used by\nGoogle,\nNASA,\nNetflix,\nInstagram,\nChatGPT,\nYouTube,\nSpotify\nAnd so many`,
        rightScreenContent: [
          { image: '/images/intro.png' }, // Introduction:
          { 
            postSpeech: [
              { text: "Easy to Learn: Python's design emphasizes readability, meaning its code resembles simple English, making it relatively straightforward for newcomers to grasp.", image: '/images/easytolearn.png' },
              { text: "Powerful and Versatile: Despite its simplicity, Python is a robust language capable of handling complex tasks, making it suitable for a wide range of applications.", image: '/images/powerfulandversatile.png' },
              { text: "Wide Range of Applications: It's used extensively in web development for building websites and applications, in data science for analyzing and visualizing data, and in artificial intelligence (AI) for creating intelligent systems.", image: '/images/widerangeofapplications.png' },
              { text: "Growing Popularity: Because of its ease of use, and versatility, it is one of the most popular programming languages in the world, and has a very large community of users that help create libraries that expand pythons capability.", image: '/images/growingpopularity.png' }
            ]
          }, // Python is a powerful...
          { image: '/images/historyofpython.png' }, // Let's explore its history...
          { image: '/images/guidovanrossum.png' }, // The Birth of Python...
          { postSpeech: { text: "Guido van Rossum was a big fan of the British comedy group Monty Python. Specifically he was a fan of their television show 'Monty Python's Flying Circus'. Because of his fondness for the show, he chose the name 'Python' for his new programming language. So, the name has no relation to the snake, but is instead a tribute to a popular comedy show.", image: '/images/montypython.png' } }, // Named after Monty Python's...
          { image: '/images/funpython.png' }, // Python was designed...
          { image: '/images/keymilestones.png' }, // Key Milestones:
          { postSpeech: { text: "Early Days: Back in 1991, Python started as a simple tool, its first version was released.", image: '/images/earlydayspy.png' } }, // 1991: First version...
          { postSpeech: { text: "Growing Up: Around 2000, Python got a big upgrade, Python 2.0, making it much more powerful.", image: '/images/growingpuppy.png' } }, // 2000: Python 2.0...
          { postSpeech: { text: "A Fresh Start: In 2008, Python 3.0 was launched, a completely new version with many improvements.", image: '/images/afreshstartpy.png' } }, // 2008: Python 3.0...
          { postSpeech: { text: "Moving On: By 2020, Python 2 was no longer updated, so everyone started using Python 3.", image: '/images/movingonpy.png' } }, // 2020: Python 2...
          { image: '/images/whypyimp.png' }, // Why Python is Important?
          { image: '/images/easytolearn.png' }, // Easy to Learn...
          { postSpeech: { text: "Python is like a Swiss Army knife for programming, it can be used for many different things. You can use it to build websites and web applications, which is called web development. It's also great for creating smart programs that learn and make decisions, which is called artificial intelligence (AI). Furthermore, Python is used to analyze large amounts of information in data science, and to make repetitive tasks automatic, called automation.", image: '/images/versatile.png' } }, // Versatile...
          { postSpeech: { text: "Python has a huge and helpful community of programmers all around the world. This community creates and shares many free tools, called 'libraries', that make programming easier. Think of libraries like pre-built Lego blocks; for example, NumPy helps with math, and Django helps build websites. Because of this large community and the many libraries, you can find help and resources for almost any programming task.", image: '/images/largecommunity.png' } }, // Large Community...
          { postSpeech: { text: "Python is one of the most popular programming languages that companies are looking for right now. This means that knowing Python can open up many job opportunities in the tech industry. Companies in fields like data science, web development, and AI are actively seeking people with Python skills. Learning Python can be a valuable investment for anyone interested in a career in technology.", image: '/images/highdemand.png' } }, // High Demand...
          { image: '/images/goo.png' }, // Google,
          { image: '/images/nasa.png' }, // NASA,
          { image: '/images/netflix.png' }, // Netflix,
          { image: '/images/insta.png' }, // Instagram,
          { image: '/images/chatgpt.png' }, // ChatGPT,
          { image: '/images/utube.png' }, // YouTube,
          { image: '/images/spotify.png' }, // Spotify
          { image: '/images/andsomany.png' } // And so many
        ],
        example: 'Key milestones: Python 0.9.0 (1991), Python 2.0 (2000)...',
        media: { text: 'Python’s journey.', image: '/images/python-logo.png', video: '/videos/python-intro.mp4' }
      },
      questions: {
        questions: [
          { question: 'Who created Python?', options: ['Bill Gates', 'Guido van Rossum', 'Mark Zuckerberg', 'Elon Musk'], correctAnswer: 'Guido van Rossum' },
          // ... other questions
        ],
        media: { text: 'Test your Python history knowledge!' }
      },
      codingPractice: {
        task: 'Print Python’s birth year.',
        starterCode: 'print("Python was created in 1991")',
        criteria: {
          mustInclude: ['1991'],
          mustNotInclude: ['1990', '2000', '2008'],
          negativeWords: ['not', 'wrong', 'incorrect'],
          maxLength: 50
        }
      },
      liveTest: {
        task: 'Print "Python is fun!"',
        starterCode: '',
        expectedOutput: 'Python is fun!'
      },
      miniProject: {
        tasks: [
          { task: 'Print a 3-line story about Python’s creation.', starterCode: 'print("In 1991, Guido had an idea...")\n', expectedOutput: 'In 1991, Guido had an idea...\n[anything]\n[anything]' },
          // ... other tasks
        ]
      }
    }
  },
  { id: 2, title: 'Basic Operators', topic: 'operators', stages: {} },
  { id: 3, title: 'Conditionals', topic: 'conditionals', stages: {} },
  { id: 4, title: 'Loops', topic: 'loops', stages: {} },
  { id: 5, title: 'Simple Functions', topic: 'functions', stages: {} },
];

export const badges = [
  { id: 1, name: 'First Lesson Complete', description: 'Completed your first lesson!', condition: (completedLessons) => completedLessons.length >= 1 },
  { id: 2, name: 'Python Novice', description: 'Completed 3 lessons!', condition: (completedLessons) => completedLessons.length >= 3 },
];

export const onboardingSteps = [
  { id: 1, title: 'Welcome to TutorSimula!', description: 'This is your Python learning environment...', target: null },
  { id: 2, title: 'Select a Lesson', description: 'Use the lesson selector...', target: '.lesson-selector' },
  { id: 3, title: 'Write and Run Code', description: 'Write your Python code here...', target: '.code-editor' },
  { id: 4, title: 'Get Help', description: 'Need assistance? Click the "Hint"...', target: '.help-button' },
];