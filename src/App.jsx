import React, { useMemo, useState } from "react";
import { Camera, Leaf, RotateCcw, CheckCircle2, XCircle, Sparkles, Trophy, Brain } from "lucide-react";
const Card = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const Button = ({ children, className = "", variant, ...props }) => (
  <button
    className={`px-4 py-2 border rounded-xl ${className}`}
    {...props}
  >
    {children}
  </button>
);
const quizBanks = {
  dslr: {
    label: "DSLR Photos",
    icon: Camera,
    levels: [
      [
        {
          question: "What does aperture mainly control?",
          options: ["Battery life", "Depth of field", "Memory card speed", "White balance"],
          answer: "Depth of field",
          explanation: "Aperture affects how much of the scene appears sharp from front to back."
        },
        {
          question: "Which setting helps freeze fast motion?",
          options: ["Slower shutter speed", "Higher ISO only", "Faster shutter speed", "Auto white balance"],
          answer: "Faster shutter speed",
          explanation: "A fast shutter speed, like 1/500 or faster, helps stop movement."
        },
        {
          question: "What can happen if ISO is set very high?",
          options: ["More image noise", "A wider lens", "A longer battery life", "A smaller photo file"],
          answer: "More image noise",
          explanation: "Higher ISO brightens the image but can add grain or noise."
        },
        {
          question: "For real estate interior photos, which is usually helpful?",
          options: ["Very crooked horizon", "Wide-angle lens", "Only zoomed-in details", "Flash pointed directly at mirrors"],
          answer: "Wide-angle lens",
          explanation: "A wide-angle lens helps show the room layout, but avoid extreme distortion."
        },
        {
          question: "What does white balance adjust?",
          options: ["Color temperature", "Zoom level", "Lens sharpness", "Tripod height"],
          answer: "Color temperature",
          explanation: "White balance keeps whites looking neutral under different types of light."
        }
      ],
      [
        {
          question: "What does a lower f-number, like f/2.8, usually create?",
          options: ["Blurrier background", "Darker image only", "Smaller file", "More battery power"],
          answer: "Blurrier background",
          explanation: "A lower f-number gives a wider aperture and shallower depth of field."
        },
        {
          question: "What does a tripod help most with?",
          options: ["Camera stability", "Changing lens color", "Increasing megapixels", "Cleaning the sensor"],
          answer: "Camera stability",
          explanation: "A tripod reduces camera shake, especially in low light or real estate interiors."
        },
        {
          question: "For a bright window in a room, what can help avoid an overexposed photo?",
          options: ["Lower exposure", "Point camera at floor only", "Use dirty lens", "Raise ISO as high as possible"],
          answer: "Lower exposure",
          explanation: "Lowering exposure helps preserve details in very bright areas like windows."
        },
        {
          question: "What does RAW format give you?",
          options: ["More editing flexibility", "Only black-and-white photos", "Smaller files always", "No need to focus"],
          answer: "More editing flexibility",
          explanation: "RAW files keep more image data, which helps with editing exposure and color."
        },
        {
          question: "What should you check to keep real estate photos looking professional?",
          options: ["Straight vertical lines", "Crooked walls", "Random tilted horizon", "Clutter in every corner"],
          answer: "Straight vertical lines",
          explanation: "Straight lines make rooms look clean, calm, and more professional."
        }
      ],
      [
        {
          question: "What does exposure compensation do?",
          options: ["Makes the camera brighter or darker", "Changes the lens brand", "Deletes old photos", "Adds music"],
          answer: "Makes the camera brighter or darker",
          explanation: "Exposure compensation tells the camera to brighten or darken the image."
        },
        {
          question: "Why avoid using a very wide lens too close to furniture?",
          options: ["It can distort shapes", "It makes the battery explode", "It removes color", "It blocks Wi‑Fi"],
          answer: "It can distort shapes",
          explanation: "Very wide lenses can stretch objects near the edges of the photo."
        },
        {
          question: "What is focus?",
          options: ["The sharp part of the photo", "The camera strap", "The memory card", "The sound setting"],
          answer: "The sharp part of the photo",
          explanation: "Focus controls what part of the image appears sharp and clear."
        },
        {
          question: "What is bracketing often used for?",
          options: ["Taking multiple exposures", "Charging batteries", "Changing lenses", "Cropping photos"],
          answer: "Taking multiple exposures",
          explanation: "Bracketing captures several brightness levels, useful for tricky lighting."
        },
        {
          question: "For interiors, why turn on room lights carefully?",
          options: ["They can add warmth but may mix colors", "They remove shadows completely", "They fix all blur", "They replace the camera lens"],
          answer: "They can add warmth but may mix colors",
          explanation: "Interior lights can help atmosphere, but different bulbs may create color casts."
        }
      ]
    ]
  },
  plants: {
    label: "Plants",
    icon: Leaf,
    levels: [
      [
        {
          question: "What is the most common cause of root rot?",
          options: ["Too much sun", "Overwatering and poor drainage", "Too much air movement", "Using a clay pot"],
          answer: "Overwatering and poor drainage",
          explanation: "Roots need oxygen. Constantly wet soil can suffocate roots and cause rot."
        },
        {
          question: "Which plant usually prefers chunky, airy potting mix?",
          options: ["Phalaenopsis orchid", "African violet", "Mint", "Basil"],
          answer: "Phalaenopsis orchid",
          explanation: "Phalaenopsis orchids are epiphytes and usually need bark or airy orchid mix."
        },
        {
          question: "Why might balcony plants wilt in South Florida afternoon sun?",
          options: ["They are cold", "Heat stress and fast water loss", "Too much fertilizer only", "They need complete darkness"],
          answer: "Heat stress and fast water loss",
          explanation: "Hot balconies can overheat leaves, roots, and pots even when the soil was watered."
        },
        {
          question: "What should you check before watering most potted plants?",
          options: ["Soil moisture", "The color of the pot", "The plant tag font", "The time on the microwave"],
          answer: "Soil moisture",
          explanation: "Checking the soil helps avoid watering on a fixed schedule when the plant is not ready."
        },
        {
          question: "Which is usually best for a bougainvillea to bloom well?",
          options: ["Bright sun", "A dark corner", "Constant soggy soil", "No drainage holes"],
          answer: "Bright sun",
          explanation: "Bougainvillea generally blooms best with strong light and well-draining soil."
        }
      ],
      [
        {
          question: "Why should orchid roots not sit in soggy soil?",
          options: ["They need air around the roots", "They need total darkness", "They dislike bark", "They grow only in sand"],
          answer: "They need air around the roots",
          explanation: "Many orchids need oxygen around their roots, so airy mix is important."
        },
        {
          question: "What does yellowing lower leaves sometimes mean?",
          options: ["Normal aging or watering issue", "The plant is fake", "It needs no light", "It must be thrown away"],
          answer: "Normal aging or watering issue",
          explanation: "One old lower leaf can be normal, but many yellow leaves may mean watering or root problems."
        },
        {
          question: "What is bottom watering especially useful for?",
          options: ["Plants that dislike wet leaves", "Plants with no roots", "Cactus in rain", "Plastic flowers"],
          answer: "Plants that dislike wet leaves",
          explanation: "Bottom watering can help keep leaves dry, which some plants prefer."
        },
        {
          question: "What does leggy growth usually suggest?",
          options: ["Not enough light", "Too much pot color", "Too many labels", "Too much music"],
          answer: "Not enough light",
          explanation: "Plants often stretch toward light when they are not receiving enough."
        },
        {
          question: "Why use drainage holes in pots?",
          options: ["To let extra water escape", "To keep soil permanently wet", "To block oxygen", "To make roots disappear"],
          answer: "To let extra water escape",
          explanation: "Drainage holes prevent water from sitting around roots too long."
        }
      ],
      [
        {
          question: "What is a node on a plant cutting?",
          options: ["A place where roots or leaves can grow", "A fertilizer brand", "A broken pot", "A leaf stain"],
          answer: "A place where roots or leaves can grow",
          explanation: "Nodes are important because many cuttings root or sprout from them."
        },
        {
          question: "Why can too much fertilizer hurt a plant?",
          options: ["It can burn roots", "It removes all sunlight", "It makes soil vanish", "It turns pots clear"],
          answer: "It can burn roots",
          explanation: "Too much fertilizer salt can damage roots and stress the plant."
        },
        {
          question: "What is a sign a plant may need repotting?",
          options: ["Roots circling tightly", "One pretty flower", "A clean leaf", "A new plant tag"],
          answer: "Roots circling tightly",
          explanation: "Crowded roots can mean the plant has outgrown its pot."
        },
        {
          question: "Why acclimate plants before moving them into stronger sun?",
          options: ["To prevent leaf burn", "To make them sleep", "To remove roots", "To stop all growth"],
          answer: "To prevent leaf burn",
          explanation: "Sudden intense sun can scorch leaves, especially on balcony plants."
        },
        {
          question: "What does humidity help with for many tropical plants?",
          options: ["Leaf comfort and moisture balance", "Making soil dry faster only", "Removing all pests", "Replacing watering"],
          answer: "Leaf comfort and moisture balance",
          explanation: "Many tropical plants prefer higher humidity, but they still need proper watering and airflow."
        }
      ]
    ]
  }
};

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const aiQuestionSeeds = {
  dslr: [
    { concept: "aperture", easy: "What does aperture affect most?", medium: "Why would you use f/2.8 for a portrait?", hard: "Why might f/8 be better than f/2.8 for real estate interiors?", correct: "Depth of field", explanation: "Aperture controls light and depth of field, which changes how much of the scene looks sharp." },
    { concept: "shutter speed", easy: "Which setting freezes motion?", medium: "Why use a slow shutter speed on a tripod?", hard: "Why can 1/30 second be risky handheld indoors?", correct: "Shutter speed", explanation: "Shutter speed controls how long the sensor records light and motion." },
    { concept: "ISO", easy: "What does high ISO usually add?", medium: "When should you raise ISO?", hard: "Why keep ISO low for clean real estate photos?", correct: "Image noise", explanation: "ISO brightens the photo but can reduce image quality when pushed too high." },
    { concept: "white balance", easy: "What does white balance correct?", medium: "Why can indoor lights make photos look yellow?", hard: "Why is mixed lighting difficult in interior photography?", correct: "Color temperature", explanation: "White balance keeps colors natural under different light sources." },
    { concept: "composition", easy: "What makes a photo feel more balanced?", medium: "Why keep vertical lines straight in property photos?", hard: "Why should you avoid extreme wide-angle distortion?", correct: "Clean composition", explanation: "Composition guides the viewer and makes photos look intentional and professional." }
  ],
  plants: [
    { concept: "watering", easy: "What should you check before watering?", medium: "Why can watering on a fixed schedule be risky?", hard: "Why can wet soil still mean roots are unhealthy?", correct: "Soil moisture", explanation: "Plants should be watered based on soil, roots, pot size, heat, and light — not just the calendar." },
    { concept: "light", easy: "What do leggy plants often need?", medium: "Why can balcony sun burn leaves?", hard: "Why should plants be acclimated to stronger light?", correct: "Better light balance", explanation: "Plants need enough light, but sudden intense sun can stress or burn them." },
    { concept: "roots", easy: "What is root rot usually connected to?", medium: "Why do roots need oxygen?", hard: "Why can poor drainage cause yellow leaves?", correct: "Overwatering or poor drainage", explanation: "Roots need both moisture and oxygen. Constantly wet soil can damage them." },
    { concept: "orchids", easy: "What kind of mix do many orchids prefer?", medium: "Why do orchid roots like air?", hard: "Why is regular potting soil risky for Phalaenopsis orchids?", correct: "Chunky airy mix", explanation: "Many orchids grow with exposed roots in nature, so they need airflow around the roots." },
    { concept: "fertilizer", easy: "Can too much fertilizer hurt plants?", medium: "Why should fertilizer be diluted?", hard: "Why can fertilizer burn happen even when you are trying to help?", correct: "Yes, it can burn roots", explanation: "Too much fertilizer can build up salts and damage roots." }
  ]
};

function generateAIQuestions(topic, difficulty, count = 10) {
  const seeds = aiQuestionSeeds[topic];
  const difficultyKey = difficulty === "Advanced" ? "hard" : difficulty === "Intermediate" ? "medium" : "easy";

  return Array.from({ length: count }, (_, index) => {
    const seed = seeds[index % seeds.length];
    const wrongOptions = topic === "dslr"
      ? ["Memory card size", "Camera strap", "Battery brand", "Lens cap"]
      : ["Pot color", "Plant label", "Decorative stones only", "Music near the plant"];

    return {
      question: seed[difficultyKey],
      options: shuffle([seed.correct, ...shuffle(wrongOptions).slice(0, 3)]),
      answer: seed.correct,
      explanation: seed.explanation,
      aiGenerated: true,
      concept: seed.concept
    };
  });
}

export default function QuizApp() {
  const [topic, setTopic] = useState("dslr");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [round, setRound] = useState(1);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [level, setLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [aiMode, setAiMode] = useState(true);
  const [difficulty, setDifficulty] = useState("Beginner");

  const activeBank = quizBanks[topic];
  const Icon = activeBank.icon;
  const currentLevelIndex = (level - 1) % activeBank.levels.length;
  const levelQuestions = activeBank.levels[currentLevelIndex];

  const questions = useMemo(() => {
    if (aiMode) return shuffle(generateAIQuestions(topic, difficulty, 10));
    return shuffle(levelQuestions);
  }, [topic, round, currentLevelIndex, aiMode, difficulty]);
  const currentQuestion = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;

  const chooseAnswer = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === currentQuestion.answer) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (
      reviewQueue.length > 0 &&
      questionIndex >= 9
    ) {
      const reviewQuestion = reviewQueue[0];
      questions.splice(questionIndex + 1, 0, reviewQuestion);
      setReviewQueue((prev) => prev.slice(1));
    }

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
    setReviewQueue([]);
    setRound((prev) => prev + 1);
  };

  const completeLevel = () => {
    if (!completedLevels.includes(level)) {
      setCompletedLevels((prev) => [...prev, level]);
    }

    if (percentage >= 80) setDifficulty("Advanced");
    else if (percentage >= 60) setDifficulty("Intermediate");
    else setDifficulty("Beginner");

    setLevel((prev) => prev + 1);
    restart(topic);
  };

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-4 md:p-8 text-slate-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Personal Learning Quiz</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">DSLR + Plant Quiz App</h1>
          <p className="text-slate-600 mt-3 text-base md:text-lg">Practice fresh questions, review weak areas, and let the quiz adjust as you improve.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {Object.entries(quizBanks).map(([key, bank]) => {
            const TopicIcon = bank.icon;
            const isActive = topic === key;
            return (
              <Button
                key={key}
                variant={isActive ? "default" : "outline"}
                className="h-14 rounded-2xl text-base gap-2"
                onClick={() => restart(key)}
              >
                <TopicIcon className="w-5 h-5" />
                {bank.label}
              </Button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <Button
            variant={aiMode ? "default" : "outline"}
            className="rounded-2xl gap-2"
            onClick={() => {
              setAiMode(true);
              restart(topic);
            }}
          >
            <Brain className="w-4 h-4" />
            AI Coach Mode
          </Button>
          <Button
            variant={!aiMode ? "default" : "outline"}
            className="rounded-2xl"
            onClick={() => {
              setAiMode(false);
              restart(topic);
            }}
          >
            Fixed Levels
          </Button>
          <div className="rounded-2xl border bg-white px-4 py-2 text-center">
            <div className="text-xs text-slate-500">Difficulty</div>
            <div className="font-bold">{difficulty}</div>
          </div>
        </div>

        <Card className="rounded-3xl shadow-xl border-0 overflow-hidden">
          <CardContent className="p-6 md:p-8">
            {!finished ? (
              <>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="absolute right-6 top-6 flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <Trophy className="w-4 h-4" />
                    Level {level}
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-lg">
                    <Icon className="w-6 h-6" />
                    {activeBank.label}
                  </div>
                  <div className="text-sm text-slate-500">Question {questionIndex + 1} of {questions.length}</div>
                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-slate-900 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>

                {currentQuestion.aiGenerated && (
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-semibold">
                    <Brain className="w-3 h-3" />
                    AI-style question · {currentQuestion.concept}
                  </div>
                )}

                <h2 className="text-2xl font-bold mb-5 leading-snug">{currentQuestion.question}</h2>

                <div className="grid gap-3">
                  {currentQuestion.options.map((option) => {
                    const isCorrect = option === currentQuestion.answer;
                    const isSelected = option === selectedAnswer;
                    let stateClass = "border-slate-200 bg-white hover:bg-slate-50";
                    if (selectedAnswer && isCorrect) stateClass = "border-emerald-300 bg-emerald-50";
                    if (selectedAnswer && isSelected && !isCorrect) stateClass = "border-rose-300 bg-rose-50";

                    return (
                      <button
                        key={option}
                        onClick={() => chooseAnswer(option)}
                        className={`text-left rounded-2xl border p-4 transition flex items-center justify-between ${stateClass}`}
                      >
                        <span className="font-medium">{option}</span>
                        {selectedAnswer && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        {selectedAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer && (
                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 border">
                    <p className="font-semibold mb-1">Why:</p>
                    <p className="text-slate-700">{currentQuestion.explanation}</p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <Button
                        variant="outline"
                        className="rounded-2xl"
                        onClick={() => {
                          setReviewQueue((prev) => [...prev, currentQuestion]);
                          nextQuestion();
                        }}
                      >
                        Ask me again later
                      </Button>

                      <Button className="rounded-2xl" onClick={nextQuestion}>
                        {questionIndex + 1 >= questions.length ? "See score" : "Next question"}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">
                  {percentage}%
                </div>
                <h2 className="text-3xl font-bold mb-2">You scored {score} out of {questions.length}</h2>
                <div className="mb-4 flex justify-center gap-2 flex-wrap">
                  {completedLevels.map((lvl) => (
                    <div key={lvl} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Level {lvl} Completed
                    </div>
                  ))}
                </div>

                <p className="text-slate-600 mb-6">
                  {percentage >= 80 ? "Great job. You are building strong recall." : percentage >= 60 ? "Good start. Review the explanations and try again." : "Keep practicing. Short quizzes will help this stick."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="rounded-2xl gap-2" onClick={completeLevel}>
                    <Trophy className="w-4 h-4" />
                    Complete Level & Continue
                  </Button>

                  <Button variant="outline" className="rounded-2xl gap-2" onClick={() => restart(topic)}>
                    <RotateCcw className="w-4 h-4" />
                    Retry Level
                  </Button>
                  <Button variant="outline" className="rounded-2xl" onClick={() => restart(topic === "dslr" ? "plants" : "dslr")}>
                    Switch topic
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-500 mt-5">Tip: AI Coach Mode creates fresh practice sets and changes difficulty based on your score. A future published version can connect to a real AI API for unlimited questions.</p>
      </div>
    </div>
  );
}
