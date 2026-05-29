alert("NEW VERSION LOADED");
import React, { useEffect, useState } from "react";
import {
  Camera,
  Leaf,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  Brain
} from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 border rounded-2xl ${className}`}
    {...props}
  >
    {children}
  </button>
);

const quizBanks = {
  dslr: {
    label: "DSLR Photos",
    icon: Camera,
   levels: [[
  {
    question: "What does aperture mainly control?",
    options: [
      "Battery life",
      "Depth of field",
      "Memory card speed",
      "White balance"
    ],
    answer: "Depth of field",
    explanation:
      "Aperture affects how much of the scene appears sharp."
  },

  {
    question: "Which setting freezes fast motion?",
    options: [
      "Slow shutter",
      "Fast shutter",
      "ISO only",
      "White balance"
    ],
    answer: "Fast shutter",
    explanation:
      "Fast shutter speeds freeze motion."
  },

  {
    question: "What does high ISO add?",
    options: [
      "Noise",
      "Battery life",
      "Zoom",
      "Sharpness"
    ],
    answer: "Noise",
    explanation:
      "Higher ISO can add image grain."
  },

  {
    question: "What does white balance adjust?",
    options: [
      "Color temperature",
      "Lens zoom",
      "Battery",
      "Storage"
    ],
    answer: "Color temperature",
    explanation:
      "White balance controls color tone."
 }
      ]],
    },



  plants: {
    label: "Plants",
    icon: Leaf,
    levels: [[
      {
        question: "What is the most common cause of root rot?",
        options: [
          "Too much sun",
          "Overwatering and poor drainage",
          "Too much air movement",
          "Using a clay pot"
        ],
        answer: "Overwatering and poor drainage",
        explanation:
          "Roots need oxygen and can rot in constantly wet soil."
      }
    ]]
  }
};

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function generateAIQuestions(topic, difficulty, count = 10) {
  const seeds = [
    {
      question: "What does aperture mainly control?",
      options: [
        "Battery life",
        "Depth of field",
        "Memory card speed",
        "White balance"
      ],
      answer: "Depth of field",
      explanation:
        "Aperture affects how much of the scene appears sharp."
    },

    {
      question: "What does white balance adjust?",
      options: [
        "Color temperature",
        "Zoom level",
        "Lens sharpness",
        "Tripod height"
      ],
      answer: "Color temperature",
      explanation:
        "White balance keeps colors neutral."
    },

    {
      question: "What causes root rot most often?",
      options: [
        "Too much sun",
        "Overwatering",
        "Cold air",
        "Too much fertilizer"
      ],
      answer: "Overwatering",
      explanation:
        "Roots need oxygen and can rot in wet soil."
    },

    {
      question: "Why use drainage holes?",
      options: [
        "For decoration",
        "To release extra water",
        "To grow roots outside",
        "To hold fertilizer"
      ],
      answer: "To release extra water",
      explanation:
        "Drainage holes prevent soggy soil."
    }
  ];

  return shuffle(
    Array.from({ length: count }, (_, i) => ({
      ...seeds[i % seeds.length],
      aiGenerated: true
    }))
  );
}
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },

      body: JSON.stringify({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "user",
            content: `Create ${count} multiple choice quiz questions about ${topic} at ${difficulty} level.

Return ONLY valid JSON array.

Each question must contain:
question
options
answer
explanation`
          }
        ],

        temperature: 0.8
      })
    }
  );

  const data = await response.json();

  const parsed = JSON.parse(data.choices[0].message.content);

  return parsed.map((item) => ({
    ...item,
    aiGenerated: true
  }));
}

export default function QuizApp() {
  const [topic, setTopic] = useState("dslr");
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [difficulty, setDifficulty] = useState("Beginner");
  const [loading, setLoading] = useState(false);

  const activeBank = quizBanks[topic];
  const Icon = activeBank.icon;

 useEffect(() => {
  const demoQuestions = [
    {
      question: "What does aperture mainly control?",
      options: [
        "Battery life",
        "Depth of field",
        "Memory card speed",
        "White balance"
      ],
      answer: "Depth of field",
      explanation:
        "Aperture affects how much appears sharp."
    },

    {
      question: "What does high ISO add?",
      options: [
        "Noise",
        "Battery",
        "Zoom",
        "Sharpness"
      ],
      answer: "Noise",
      explanation:
        "High ISO can create grain."
    },

    {
      question: "What causes root rot?",
      options: [
        "Too much sun",
        "Overwatering",
        "Cold air",
        "Wind"
      ],
      answer: "Overwatering",
      explanation:
        "Roots rot in constantly wet soil."
    },

    {
      question: "Why use drainage holes?",
      options: [
        "Decoration",
        "Release extra water",
        "Increase humidity",
        "Grow roots outside"
      ],
      answer: "Release extra water",
      explanation:
        "Drainage prevents soggy soil."
    }
  ];

  setQuestions(shuffle(demoQuestions));
}, [topic]);

  const currentQuestion = questions?.[questionIndex];
if (!currentQuestion && !loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
      No questions loaded.
    </div>
  );
}
  const progress = questions.length
    ? ((questionIndex + 1) / questions.length) * 100
    : 0;

  const chooseAnswer = (answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (questionIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const restart = (newTopic = topic) => {
    setTopic(newTopic);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  };

  const percentage = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading AI Questions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-4 text-slate-900">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              AI Powered Quiz
            </span>
          </div>

          <h1 className="text-4xl font-bold">
            DSLR + Plant Quiz App
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {Object.entries(quizBanks).map(([key, bank]) => {
            const TopicIcon = bank.icon;

            return (
              <Button
                key={key}
                className="h-14 text-base"
                onClick={() => restart(key)}
              >
                <TopicIcon className="w-5 h-5 mr-2" />
                {bank.label}
              </Button>
            );
          })}
        </div>

        <Card className="rounded-3xl shadow-xl bg-white">
          <CardContent className="p-6">

            {!finished ? (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 font-semibold text-lg">
                    <Icon className="w-6 h-6" />
                    {activeBank.label}
                  </div>

                  <div className="text-sm text-slate-500">
                    Question {questionIndex + 1} of {questions.length}
                  </div>
                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-slate-900"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <h2 className="text-2xl font-bold mb-5">
                  {currentQuestion?.question}
                </h2>

                <div className="grid gap-3">
                  {currentQuestion?.options?.map((option) => {
                    const isCorrect =
                      option === currentQuestion.answer;

                    const isSelected =
                      option === selectedAnswer;

                    let stateClass =
                      "border-slate-200 bg-white";

                    if (selectedAnswer && isCorrect) {
                      stateClass =
                        "border-emerald-300 bg-emerald-50";
                    }

                    if (
                      selectedAnswer &&
                      isSelected &&
                      !isCorrect
                    ) {
                      stateClass =
                        "border-rose-300 bg-rose-50";
                    }

                    return (
                      <button
                        key={option}
                        onClick={() =>
                          chooseAnswer(option)
                        }
                        className={`text-left rounded-2xl border p-4 transition flex items-center justify-between ${stateClass}`}
                      >
                        <span className="font-medium">
                          {option}
                        </span>

                        {selectedAnswer &&
                          isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          )}

                        {selectedAnswer &&
                          isSelected &&
                          !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          )}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer && (
                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 border">
                    <p className="font-semibold mb-1">
                      Why:
                    </p>

                    <p className="text-slate-700">
                      {currentQuestion.explanation}
                    </p>

                    <Button
                      className="rounded-2xl mt-4"
                      onClick={nextQuestion}
                    >
                      {questionIndex + 1 >=
                      questions.length
                        ? "See score"
                        : "Next question"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">

                <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">
                  {percentage}%
                </div>

                <h2 className="text-3xl font-bold mb-4">
                  You scored {score} out of {questions.length}
                </h2>

                <Button
                  className="rounded-2xl gap-2"
                  onClick={() => restart(topic)}
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart Quiz
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
