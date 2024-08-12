export const ERROR = {
  GET_QUESTIONS: "Cannot get questions",
  GET_QUESTION: "Cannot get question",
  ADD_QUESTION: "Cannot add question. Please try again.",
  UPDATE_ANSWER: "Cannot update answer. Please try again.",
};
export const MESSAGES = {
  ADD_QUESTION_SUCCESS: "Question added successfully",
};

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export const questionHasVote = (question, user) => {
  return (
    question.optionOne.votes.includes(user.id) ||
    question.optionTwo.votes.includes(user.id)
  );
};

export const sortByTimestamp = (array) => {
  return array.sort((a, b) => b.timestamp - a.timestamp);
};

export const sortByQuestionAnswer = (array) => {
  const arrayClone = [...array];
  if (arrayClone.length > 1) {
    return arrayClone.sort((a, b) => {
      const answerLength = (x) => Object.keys(x.answers).length;
      if (answerLength(b) === answerLength(a)) {
        return b.questions.length - a.questions.length;
      } else return answerLength(b) - answerLength(a);
    });
  } else return arrayClone;
};

export const getAnswerStatistics = (question) => {
  const textOne = question.optionOne.text;
  const textTwo = question.optionTwo.text;
  const votesOne = question.optionOne.votes.length;
  const votesTwo = question.optionTwo.votes.length;
  const answerPercentOne = (votesOne / (votesOne + votesTwo)).toFixed(2) * 100;
  const answerPercentTwo = (votesTwo / (votesOne + votesTwo)).toFixed(2) * 100;
  return `${votesOne} (${answerPercentOne}%) employees vote for ${textOne} and ${votesTwo} (${answerPercentTwo}%) employees vote for ${textTwo}.`;
};

export const getAnswer = (question, user) => {
  const one = question.optionOne;
  const two = question.optionTwo;
  if (one.votes.includes(user.id))
    return { answer: "optionOne", text: one.text };
  else return { answer: "optionTwo", text: two.text };
};

export const updateVotes = (question, authedUser, answer) => {
  const votes = [...question[answer].votes, authedUser];
  const otherAnswer = answer === "optionOne" ? "optionTwo" : "optionOne";
  const otherVotes = question[otherAnswer].votes.filter(
    (user) => user !== authedUser
  );
  const votesObject = {
    [answer]: {
      ...question[answer],
      votes: [...new Set(votes)], // each user can only vote once
    },
    [otherAnswer]: {
      ...question[otherAnswer],
      votes: otherVotes, // remove user from other vote if already voted
    },
  };
  return votesObject;
};
