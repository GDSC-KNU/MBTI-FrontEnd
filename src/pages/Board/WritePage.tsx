import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useRecoilValue, useSetRecoilState } from "recoil";
import { userNameSelector, userAtom } from "../login/atoms";

interface WritePageProps {
  onPostSubmit: (content: string) => void;
}

const WritePage: React.FC<WritePageProps> = ({ onPostSubmit }) => {
  const [content, setContent] = useState('');

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMountedRef = React.useRef(true);

  const userName = useRecoilValue(userNameSelector);
  const setUser = useSetRecoilState(userAtom);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        "https://gdscmbti.duckdns.org/v1/oauth/member/info",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true, // 쿠키를 자동으로 전송하기 위해 설정
        }
      );
      console.log(response.data);
      const userInfo = response.data;
      setUser(userInfo); // Recoil atom에 사용자 정보 저장
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response);
      } else {
        console.error("Other error:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);



  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    if (content.trim() === '') { // Check if the nickname is empty
      alert('내용과 닉네임을 입력하세요.');
      return;
    }
    try {
      setIsSubmitting(true);
      const newPost = {
        mbti: 'ISFJ',
        content: content,
      };
      await axios.post('https://gdscmbti.duckdns.org/api/board/write', newPost);

      if (isMountedRef.current) {
        onPostSubmit(content); // Add the content to the board
        setContent('');
        // Move the navigate logic here after the axios request
        navigate('/mbtiboard');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    navigate('/mbtiboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="max-w-md w-4/5 mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <h1 className="text-3xl font-medium text-gray-900 dark:text-white">👇 아무거나 적어봐!</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
        {userName && ( // Check if the userName exists before rendering
              <p className="font-bold text-xl mb-2 font-custom">{userName}</p>)
              }
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="여기다 낙서해!"
            className="w-full h-40 rounded border border-gray-300 p-2 mb-4 resize-none"
          ></textarea>
          <div className="flex justify-between">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handlePrevious}
            >
              게시판으로
            </button>
            <button
              type="submit"
              className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? '등록 중...' : '낙서하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePage;
