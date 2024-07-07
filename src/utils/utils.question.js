export const questionHasVote = (question, user) => {
  return (
    question.optionOne.votes.includes(user.id) ||
    question.optionTwo.votes.includes(user.id)
  );
};

export const sortByTimestamp = (array) => {
  return array.sort((a, b) => b.timestamp - a.timestamp);
};
