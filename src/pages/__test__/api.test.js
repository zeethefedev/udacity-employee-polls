import { waitFor } from "@testing-library/react";
import { ANSWER, QUESTION } from "./data/data";
import { _saveQuestion, _saveQuestionAnswer } from "../../api/_DATA";

describe("_saveQuestion", () => {
  it("should return the saved question with correctly formatted data", async () => {
    const questionData = await _saveQuestion(QUESTION);

    await waitFor(() => {
      expect(questionData).toBeDefined();
    });
    await waitFor(() => {
      expect(questionData.id).toEqual(expect.stringMatching(/.*/));
    });
    await waitFor(() => {
      expect(questionData.author).toBe(QUESTION.author);
    });
    await waitFor(() => {
      expect(questionData.optionOne.votes).toHaveLength(0);
    });
    await waitFor(() => {
      expect(questionData.optionOne.text).toBe(QUESTION.optionOneText);
    });
    await waitFor(() => {
      expect(questionData.optionTwo.votes).toHaveLength(0);
    });
    await waitFor(() => {
      expect(questionData.optionTwo.text).toBe(QUESTION.optionTwoText);
    });
  });

  it("should return the error with incorrectly formatted data", async () => {
    const questionData = await _saveQuestion({ ...QUESTION, author: "" }).catch(
      (error) => {
        expect(error).toBe(
          "Please provide optionOneText, optionTwoText, and author"
        );
      }
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return true with correctly formatted data", async () => {
    const answer = ANSWER;
    const questionData = await _saveQuestionAnswer(answer);

    await waitFor(() => {
      expect(questionData).toBeDefined();
    });
  });

  it("should return the error with incorrectly formatted data", async () => {
    const questionData = await _saveQuestionAnswer({
      ...ANSWER,
      authedUser: "",
    }).catch((error) => {
      expect(error).toBe("Please provide authedUser, qid, and answer");
    });
  });
});
