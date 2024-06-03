import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";
import MbtiResult from "./MbtiResult";

interface Question {
  no: number;
  question_id: number;
  question_type: string;
  content: string;
}

const pageContentYes = [
  "그 사람을 바로 내 친구로 만들어버린다 !",
  "말을 거는 데 그닥 어려움이 없다. 바로 말 걸기 ~",
  "내가 어떻게 보이든 말든 신경 안 쓰이는데?",
  "바로 친구에게 연락하기. 나랑 놀자 ~~",
  "친구에게 만나자고 연락을 보내본다",
  "당연하다 !",
  "너무 재밌어..! 바로 유튜브나 구글링으로 찾아본다.",
  "아악 그때 난 왜 그랬지,,\n문득문득 떠오르고 너무 후회된다.",
  "그렇다.",
  "바로 대화에 참여해서 신나게 토론한다.",
  "아무나 빨리 나한테 얘기해줘.\n무슨 얘기인지 너~무 궁금하다.",
  "흥미진진. 팝콘 가져와🍿 너무 재밌다.",
  "후~ Calm Down. 평정심을 유지한다.",
  "그렇다.",
  "친구를 이해하기 위해 많은 시간이 필요하다.",
  "부랴부랴,, 매번 마감 기한을 지키기가 힘들다.",
  "마지막까지 미루는 편이다.",
  "지금 진행 중인 프로젝트를 완전히 완료한 후, \n 다른 프로젝트를 시작한다.",
  "괜찮아 ~ 나중에 하면 돼 ~\n마지막까지 미루는 편이다.",
  "그렇다. 에너지가 충분할 때,\n 일을 몰아서 하는 편이다.",
];

const pageContentNo = [
  "굳이 ..? 새로운 친구를 만들지 않는다.",
  "말을 걸고 있는 나의 모습이 상상조차 되지 않는다.",
  "나를 어떤 식으로 볼 지 걱정스럽고 머리 아프다.",
  "어휴, 얼마만에 휴가냐. 바로 침대로 다이빙 ~",
  "음 .. 근데 그냥 연락 안 할래 ..",
  "딱히 ..? 그렇지 않다.",
  "그냥 한 작품을 보고 왔구나 싶다.",
  "평소에 딱히 후회될 일이 떠오르진 않는다.",
  "그렇지 않다.",
  "으음 .. 별로 재미없다.",
  "그렇구나 .. 할 일 하러 간다.",
  "빨리 저 상황이 끝났으면 좋겠다..;;",
  "심장이 쿵쿵. 너무 긴장되어서 심장이 나올 것 같다.",
  "그렇지 않다.",
  "들어보니 친구의 입장이 이해가 된다.",
  "이미 다 해뒀거나, 여유있게 다시 확인한다.",
  "바로바로 결정을 내리는 편이다.",
  "완전히 완료되지 않았지만 동시에 프로젝트를 진행한다.",
  "내 사전에 나중이란 없다.\n되도록이면 그때 그때 해결해야 한다.",
  "아니다. 계획에 맞게 업무를 진행하는 것을 선호한다.",
];

const MbtiTest: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [mbtiResult, setMbtiResult] = useState<string>("");
  const [isYesSelected, setIsYesSelected] = useState(false);
  const [isNoSelected, setIsNoSelected] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setAnswers(new Array(questions.length).fill(undefined));
  }, [questions]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://gdscmbti.duckdns.org/api/mbti/questions"
        );
        setQuestions(response.data.questions);
        setAnswers(new Array(response.data.questions.length).fill(undefined));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (answer: boolean) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentPage] = answer;
    setAnswers(updatedAnswers);
    setIsYesSelected(answer);
    setIsNoSelected(!answer);
  };

  const handleNext = () => {
    // 현재 페이지의 답변이 없는 경우, 알림 띄우기
    if (answers[currentPage] === undefined) {
      alert("선택지를 골라야 다음으로 넘어갈 수 있습니다 !");
      return;
    }

    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
      setIsYesSelected(answers[currentPage + 1] === true);
      setIsNoSelected(answers[currentPage + 1] === false);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsYesSelected(answers[currentPage - 1] === true);
      setIsNoSelected(answers[currentPage - 1] === false);
    }
  };

  const handleSubmit = async () => {
    // 결과 누르기 전에 하나라도 페이지의 답변이 없는 경우, 알림 띄우기
    if (answers[currentPage] === undefined) {
      alert("모든 질문에 답변해주세요!");
      return;
    }
    try {
      const response = await axios.post(
        "https://gdscmbti.duckdns.org/api/mbti/result",
        {
          checkList: answers,
        }
      );
      setMbtiResult(response.data.mbti);
      setShowResult(true);
    } catch (error) {
      console.error("Error fetching MBTI result:", error);
    }
  };

  const handleRestartTest = () => {
    setCurrentPage(0);
    setAnswers(new Array(questions.length).fill(undefined));
    setMbtiResult("");
    setShowResult(false);
    setIsYesSelected(false);
    setIsNoSelected(false);
  };

  return (
    <>
      {!showResult ? (
        <div className="flex flex-1 items-center justify-center h-screen bg-primary-200">
          <div className="flex items-center justify-center">
            {questions.length > 0 && (
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-center font-[400] text-white text-[17px] p-4">
                  {questions[currentPage].content}
                </h1>
                <div className="flex gap-2 flex-col my-[100px] text-center mx-2">
                  <label
                    htmlFor="yes-checkbox"
                    className={`cursor-pointer border-[3px] border-white bg-white px-6 py-3 rounded-md ${
                      isYesSelected ? "bg-[#f0f0f0] border-[#AA77C9]" : ""
                    }`}
                    onClick={() => handleAnswerChange(true)}
                    style={
                      isYesSelected
                        ? { backgroundColor: "#f0f0f0", borderColor: "#AA77C9" }
                        : {}
                    }
                  >
                    <input
                      id="yes-checkbox"
                      className="hidden"
                      type="checkbox"
                      checked={answers[currentPage] === true}
                      onChange={() => handleAnswerChange(true)}
                    />
                    <p className="whitespace-pre-line text-[14px]">
                      {pageContentYes[currentPage]}
                    </p>
                  </label>
                  <label
                    htmlFor="no-checkbox"
                    className={`cursor-pointer border-[3px] border-white bg-white px-6 py-3 rounded-md ${
                      isNoSelected ? "bg-[#f0f0f0] border-[#AA77C9]" : ""
                    }`}
                    onClick={() => handleAnswerChange(false)}
                    style={
                      isNoSelected
                        ? { backgroundColor: "#f0f0f0", borderColor: "#AA77C9" }
                        : {}
                    }
                  >
                    <input
                      id="no-checkbox"
                      className="hidden"
                      type="checkbox"
                      checked={answers[currentPage] === false}
                      onChange={() => handleAnswerChange(false)}
                    />
                    <p className="whitespace-pre-line text-[14px]">
                      {pageContentNo[currentPage]}
                    </p>
                  </label>
                </div>
                <div className="flex gap-20">
                  <button
                    className="flex items-center bg-[#dadada] px-8 py-2 rounded-full"
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                  >
                    <AiOutlineArrowLeft className="mr-1" />
                    이전
                  </button>
                  {currentPage === questions.length - 1 ? (
                    <button
                      className="bg-[#dc8d8d] px-8 py-2 rounded-full"
                      onClick={handleSubmit}
                    >
                      결과 확인
                    </button>
                  ) : (
                    <button
                      className="flex items-center bg-[#9ddcac] px-8 py-2 rounded-full"
                      onClick={handleNext}
                    >
                      다음
                      <AiOutlineArrowRight className="ml-1" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <MbtiResult
          mbtiResult={mbtiResult}
          showResult={showResult}
          setShowResult={setShowResult}
          onRestartTest={handleRestartTest}
        />
      )}
    </>
  );
};

export default MbtiTest;
