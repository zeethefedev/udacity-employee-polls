import { updateVotes } from "../utils/utils.question";
import { formatUser } from "../utils/utils.user";

const URL = "http://localhost:3001";

const fetchAPI = async (url, method, body) => {
  const request = method && {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${URL}/${url}`, request);
  return response.json();
};

const post = async (url, body) => {
  const postRes = await fetchAPI(url, "POST", body);
  return postRes;
};

const patch = async (url, body) => {
  const patchRes = fetchAPI(url, "PATCH", body);
  return patchRes;
};

// user API
export async function _getUsers() {
  return await fetchAPI("users");
}

export async function _getUserById(userId) {
  return await fetchAPI(`users/${userId}`);
}

export async function _saveUser(user) {
  const formattedUser = formatUser(user);
  return await post("users", formattedUser);
}

export async function _updateUserQuestion(question) {
  const userId = question.author;
  const questionId = question.id;

  // fetch the question first
  const currentUser = await _getUserById(userId);
  const questions = await currentUser.questions;
  const newQuestions = await { questions: [...questions, questionId] };

  // add the existing question array
  return await patch(`users/${userId}`, newQuestions);
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
  return await patch(`users/${userId}`, newAnswers);
}

// questions API
export async function _getQuestions() {
  return await fetchAPI("questions");
}

export async function _getQuestionById(questionId) {
  return await fetchAPI(`questions/${questionId}`);
}

export async function _saveQuestion(question) {
  return await post("questions", question);
}

export async function _updateQuestionAnswer({ userId, questionId, answer }) {
  // fetch the votes first
  const question = await _getQuestionById(questionId);
  const newVotes = updateVotes(question, userId, answer);

  return await patch(`questions/${questionId}`, newVotes);
}
