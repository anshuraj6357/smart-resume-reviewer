import React, { useState } from "react";
import { useGenerateInterviewQuestionMutation } from "../features/api/resumeapi";

const normalizeQuestions = (data) => {
  if (!data?.questionsData?.questions || data.questionsData.questions.length === 0) return [];
  return data.questionsData.questions.map((q, idx) => ({
    id: q.id ?? `q-${idx}`,
    level: q.level,
    question: q.question,
    options: Object.values(q.options),
    optionKeys: Object.keys(q.options),
    answerIndex: Object.keys(q.options).indexOf(q.correctAnswer),
  }));
};

export function InterviewPractice() {
  const [GenerateInterviewQuestion, { data: responsedata }] = useGenerateInterviewQuestionMutation();

  const [step, setStep] = useState("setup"); // setup | quiz | result
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const [levels, setLevels] = useState({ beginner: true, medium: true, expert: false });
  const [topicOrRole, setTopicOrRole] = useState("React");
  const [count, setCount] = useState(5);

  const startQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await GenerateInterviewQuestion({ levels, topicOrRole, count }).unwrap();
      const normalized = normalizeQuestions(response);
      setQuestions(normalized);
      setAnswers(Array(normalized.length).fill(null));
      setResponseData(response);
      setCurrentIdx(0);
      setStep("quiz");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (answerIdx) => {
    const updated = [...answers];
    updated[currentIdx] = answerIdx;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
    else setStep("result");
  };

  const restartQuiz = () => {
    setStep("setup");
    setQuestions([]);
    setAnswers([]);
    setCurrentIdx(0);
    setResponseData(null);
    setLoading(false);
  };

  const score = answers.filter((ans, idx) => ans === questions[idx].answerIndex).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-slate-900 rounded-3xl shadow-2xl p-10">

        {/* Setup Screen */}
        {step === "setup" && (
          <form onSubmit={startQuiz} className="space-y-8">
            <h1 className="text-4xl font-extrabold text-center text-indigo-400 mb-6">
              Interview Practice
            </h1>

            <div className="space-y-4">
              <label className="block text-lg font-medium text-slate-200">Topic / Job Role</label>
              <input
                type="text"
                value={topicOrRole}
                onChange={(e) => setTopicOrRole(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-800 text-white focus:ring-4 focus:ring-indigo-500 shadow-inner"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-medium text-slate-200">Number of Questions</label>
              <input
                type="number"
                min={1}
                max={10}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full p-4 rounded-xl bg-slate-800 text-white focus:ring-4 focus:ring-indigo-500 shadow-inner"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-slate-200 mb-2">Difficulty Levels</label>
              <div className="flex gap-6">
                {Object.keys(levels).map((lvl) => (
                  <label key={lvl} className="flex items-center gap-2 text-slate-200">
                    <input
                      type="checkbox"
                      checked={levels[lvl]}
                      onChange={(e) => setLevels({ ...levels, [lvl]: e.target.checked })}
                      className="w-5 h-5 accent-indigo-500"
                    />
                    {lvl.toUpperCase()}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              {loading ? "Loading..." : "Start Quiz"}
            </button>
          </form>
        )}

        {/* Quiz Screen */}
        {step === "quiz" && questions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">
              Question {currentIdx + 1} / {questions.length}
            </h2>
            <p className="mb-6 text-slate-200 text-lg">{questions[currentIdx].question}</p>

            <div className="space-y-3">
              {questions[currentIdx].options.map((opt, idx) => {
                const isSelected = answers[currentIdx] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => selectAnswer(idx)}
                    className={`w-full p-4 rounded-2xl text-left text-lg font-medium shadow-lg border border-slate-700 ${
                      isSelected ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                    } transition-colors duration-200`}
                  >
                    {questions[currentIdx].optionKeys[idx]}. {opt}
                  </button>
                );
              })}
            </div>

            <button
              onClick={nextQuestion}
              className="mt-6 w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              {currentIdx === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        )}

        {/* Result Screen */}
        {step === "result" && (
          <div>
            <h2 className="text-4xl font-extrabold text-center text-indigo-400 mb-6">Your Results</h2>
            <p className="text-center text-lg text-slate-200 mb-8">
              You scored <span className="text-white font-bold">{score}</span> out of {questions.length}
            </p>

            <div className="space-y-6">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 p-6 rounded-3xl shadow-xl border border-slate-700 hover:scale-[1.02] transition-transform duration-300"
                >
                  <p className="text-indigo-200 font-semibold mb-4 text-lg">
                    Q{idx + 1} ({q.level.toUpperCase()}): {q.question}
                  </p>
                  <ul className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.answerIndex;
                      const isUserAnswer = answers[idx] === oIdx;

                      let classes =
                        "px-3 py-2 rounded-xl border text-lg font-medium transition-all duration-300 ";
                      if (isCorrect) classes += "bg-green-600 border-green-500 text-white";
                      else if (isUserAnswer && !isCorrect) classes += "bg-red-600 border-red-500 text-white";
                      else classes += "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700";

                      return (
                        <li key={oIdx} className={classes}>
                          {q.optionKeys[oIdx]}. {opt}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {responseData?.jobReadiness && (
              <div className="mt-8 p-6 rounded-2xl border border-slate-700 bg-slate-900/60 shadow-inner">
                <h3 className="text-xl font-semibold text-indigo-300 mb-3">Job Readiness Analysis</h3>
                <p className="text-slate-300 mb-2">
                  <span className="font-semibold text-white">Suitable Roles:</span>{" "}
                  {responseData.jobReadiness.suitableRoles.join(", ")}
                </p>
                <p className="text-slate-300">
                  <span className="font-semibold text-white">Recommendation:</span>{" "}
                  {responseData.jobReadiness.recommendation}
                </p>
              </div>
            )}

            <button
              onClick={restartQuiz}
              className="mt-8 w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
