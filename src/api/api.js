import { updateVotes } from "../utils/utils.question";
import { formatUser } from "../utils/utils.user";

const URL = "http://localhost:3001";
export async function _getUsers() {
  try {
    const response = await fetch(`${URL}/users`);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
}

export async function _getUserById(userId) {
  try {
    const response = await fetch(`${URL}/users/${userId}`);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
}

export async function _saveUser(user) {
  const formattedUser = formatUser(user);
  const response = await fetch(`${URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formattedUser),
  });

  const data = await response.json();
  return data;
}

export async function _updateUserQuestion(question) {
  const userId = question.author;
  const questionId = question.id;

  // fetch the question first
  const currentUser = await _getUserById(userId);
  const questions = await currentUser.questions;
  const newQuestions = await { questions: [...questions, questionId] };

  // add the existing question array
  const response = await fetch(`${URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQuestions),
  });
  const data = await response.json();
  return data;
}

export async function _updateUserAnswer({ userId, questionId, answer }) {
  // fetch the answer first
  const currentUser = await _getUserById(userId);
  const answers = await currentUser.answers;
  const newAnswers = await {
    answers: {
      ...answers,
      [questionId]: answer,
    },
  };

  // add the existing answer object
  const response = await fetch(`${URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAnswers),
  });
  const data = await response.json();
  return data;
}

// questions
export async function _getQuestions() {
  try {
    const response = await fetch(`${URL}/questions`);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
}

export async function _getQuestionById(questionId) {
  try {
    const response = await fetch(`${URL}/questions/${questionId}`);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
}

export async function _saveQuestion(question) {
  const response = await fetch(`${URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  });
  const data = await response.json();
  return data;
}

export async function _updateQuestionAnswer({ userId, questionId, answer }) {
  // fetch the votes first
  const question = await _getQuestionById(questionId);
  const newVotes = updateVotes(question, userId, answer);

  const response = await fetch(`${URL}/questions/${questionId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newVotes),
  });
  const data = await response.json();
  return data;
}
