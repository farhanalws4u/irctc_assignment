import { setUserLoading } from "./authActions";
import {
  GET_QUESTIONS,
  SET_CURRENT_QUESTION,
  UPDATE_QUESTION,
  SUBMIT_ANSWER,
  GET_ANSWERS,
} from "../../constants/actionTypes";

import * as api from "../../api/questionApi";
import { sendMail } from "../../utils/sendMail";

export const submitQuestion = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));

    const { data } = await api.submitQuestion(formData);
    dispatch(setUserLoading(false));

    alert("question is saved.");
    navigate("/");
  } catch (error) {
    alert(error.message);
    dispatch(setUserLoading(false));
  }
};

export const getQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getQuestions();

    dispatch({ type: GET_QUESTIONS, payload: data });
  } catch (error) {
    alert(error.message);
  }
};

export const setCurrentQuestion = (id) => (dispatch) => {
  dispatch(setUserLoading(true));
  try {
    dispatch({ type: SET_CURRENT_QUESTION, payload: id });
  } catch (error) {
    console.log(error);
  }

  dispatch(setUserLoading(false));
};

export const submitAnswer = (ansData, question) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));
    const { data } = await api.submitAnswer(ansData);
    console.log(question);

    dispatch({ type: SUBMIT_ANSWER, payload: data });
    // send mail for the ans.
    sendMail(
      ansData.user.name,
      question.user.email,
      ansData.answer,
      question.title
    );

    dispatch(setUserLoading(false));
  } catch (error) {
    alert(error.message);
    dispatch(setUserLoading(false));
  }
};

export const getAnswers = () => async (dispatch) => {
  setUserLoading(true);
  try {
    const { data } = await api.getAnswers();

    dispatch({ type: GET_ANSWERS, payload: data });

    setUserLoading(false);
  } catch (err) {
    console.log(err.message);
    setUserLoading(false);
  }
};

const updateQuestion = (newQues) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_QUESTION, payload: newQues });
  } catch (error) {
    alert(error);
  }
};
