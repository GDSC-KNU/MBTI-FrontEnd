import React from "react";
import ENTPImage from "../../assets/MbtiResult/ENTP - Apple.png";
import INTJImage from "../../assets/MbtiResult/INTJ - Google.png";
import ISFPImage from "../../assets/MbtiResult/ISFP - Patagonia.png";
import ENFJImage from "../../assets/MbtiResult/ENFJ - Nike.png";
import INFPImage from "../../assets/MbtiResult/INFP - Netflix.png";
import ESFPImage from "../../assets/MbtiResult/ESFP - McDonald.png";
import ISTJImage from "../../assets/MbtiResult/ISTJ - Microsoft.png";
import ESTPImage from "../../assets/MbtiResult/ESTP - Samsung.png";
import INFJImage from "../../assets/MbtiResult/INFJ - Unicef.png";
import ESFJImage from "../../assets/MbtiResult/ESFJ - Coca-Cola.png";
import ISFJImage from "../../assets/MbtiResult/ISFJ - Walt Disney Company.png";
import ESTJImage from "../../assets/MbtiResult/ESTJ - Amazon.png";
import INTPImage from "../../assets/MbtiResult/INTP - Tesla.png";
import ENTJImage from "../../assets/MbtiResult/ENTJ - BMW.png";
import ISTPImage from "../../assets/MbtiResult/ISTP - Intel.png";
import ENFPImage from "../../assets/MbtiResult/ENFP - Facebook.png";

import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

interface MbtiResultProps {
  mbtiResult: string;
  showResult: boolean;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  onRestartTest: () => void;
}

const MbtiResult: React.FC<MbtiResultProps> = ({
  mbtiResult,
  setShowResult,
  onRestartTest,
}) => {
  const getImagePath = (result: string) => {
    switch (result.toLowerCase()) {
      case "entp":
        return ENTPImage;
      case "intj":
        return INTJImage;
      case "isfp":
        return ISFPImage;
      case "enfj":
        return ENFJImage;
      case "infp":
        return INFPImage;
      case "esfp":
        return ESFPImage;
      case "istj":
        return ISTJImage;
      case "estp":
        return ESTPImage;
      case "infj":
        return INFJImage;
      case "esfj":
        return ESFJImage;
      case "isfj":
        return ISFJImage;
      case "estj":
        return ESTJImage;
      case "intp":
        return INTPImage;
      case "entj":
        return ENTJImage;
      case "istp":
        return ISTPImage;
      case "enfp":
        return ENFPImage;
      default:
        return null;
    }
  };

  const imagePath = getImagePath(mbtiResult);

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center">
        {imagePath && (
          <img
            className="h-[100vh]"
            src={imagePath}
            alt={`MBTI Result - ${mbtiResult}`}
          />
        )}
        <div className="flex flex-col gap-2 my-10">
          <Button
            onClick={() => {
              onRestartTest();
              setShowResult(false);
            }}
          >
            다시 테스트 하러 가기 ⏎
          </Button>
          {/* <Button
            onClick={() => {
              onRestartTest();
              setShowResult(false);
            }}
          >
            게시판 이동 ⏎
          </Button> */}
          <div
            onClick={() => {
              onRestartTest();
              setShowResult(false);
            }}
            className="flex py-2 justify-center text-center items-center gap-2 rounded-full bg-[#e8e8e8]"
          >
            <AiFillHome />
            <h1 className="text-[12px] text-[#333] hover:cursor-pointer hover:underline">
              홈으로 이동
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MbtiResult;
