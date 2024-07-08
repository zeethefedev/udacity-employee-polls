export const questionHasVote = (question, user) => {
  return (
    question.optionOne.votes.includes(user.id) ||
    question.optionTwo.votes.includes(user.id)
  );
};

export const sortByTimestamp = (array) => {
  return array.sort((a, b) => b.timestamp - a.timestamp);
};

export const getAnswerStatistics = (question) => {
  const textOne = question.optionOne.text;
  const textTwo = question.optionTwo.text;
  const votesOne = question.optionOne.votes.length;
  const votesTwo = question.optionTwo.votes.length;
  const answerPercentOne = (votesOne / (votesOne + votesTwo)).toFixed(2);
  const answerPercentTwo = (votesTwo / (votesOne + votesTwo)).toFixed(2);
  return `${votesOne} (${answerPercentOne}%) employees vote for ${textOne} and ${votesTwo} (${answerPercentTwo}%) employees vote for ${textTwo}.`;
};

export const getAnswerText = (question, user) => {
  const one = question.optionOne;
  const two = question.optionTwo;
  if (one.votes.includes(user.id)) return one.text;
  else return two.text;
};
