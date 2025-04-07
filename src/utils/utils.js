// src/utils/utils.js
export const getRandomQuestions = (questions, count = 3) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  export const getRandomMiniProject = (tasks) => {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    return tasks[randomIndex];
  };