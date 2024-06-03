import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import GDTILogo from "../assets/logo/GDTILogo.png";

interface NavbarProps {
  isAuthenticated: boolean; // isAuthenticated prop 추가
  onNavbarLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onNavbarLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  // 클릭 이벤트를 처리할 Ref 객체 생성
  const navbarRef = useRef<HTMLDivElement>(null);

  // useEffect를 사용하여 컴포넌트가 마운트되거나 업데이트될 때마다 이벤트 리스너를 추가
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Navbar 외부를 클릭한 경우에만 토글 숨김
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // document에 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleOutsideClick);

    // 컴포넌트 언마운트 시 이벤트 리스너를 제거하는 clean-up 함수 반환
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavItemClick = () => {
    setIsOpen(false); // 항목을 클릭했을 때 토글을 감춥니다.
  };

  const navItems = isAuthenticated
    ? [
        { title: "테스트 하러가기 🚀", path: "/test" },
        { title: "✨ MBTI 게시판 ✨", path: "/mbtiboard" },
        { title: "마이페이지", path: "/mypage" },
        {
          title: (
            <div className="flex justify-center items-center text-center gap-2">
              <AiFillHome size="16" />
              로그아웃 (홈으로 이동)
            </div>
          ),
          onClick: onNavbarLogout,
          path: "/",
        },
      ]
    : [
        { title: "테스트 하러가기 🚀", path: "/test" },
        // { title: "✨ MBTI 게시판 ✨", path: "/mbtiboard" },
        { title: "로그인", path: "/login" },
      ];

  return (
    <nav ref={navbarRef} className="bg-white fixed sticky top-0 z-10 w-full">
      <div className="max-w-screen-4xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img className="w-[130px]" src={GDTILogo} alt="GDTI logo" />
          </Link>
        </div>
        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500
                    hover:text-black focus:outline-none"
          aria-controls="navbar-hamburger"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={toggleMenu}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full absolute top-full left-0 bg-white bg-opacity-90 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-hamburger"
        >
          <ul className="flex flex-col font-light mt-4 text-[15px] text-center">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="block py-2 pl-3 pr-4 rounded text-gray-700 hover:bg-gradient-to-r hover:bg-opacity-20 hover:from-primary-300 hover:via-primary-200 hover:to-primary-100 hover:text-white"
                  onClick={handleNavItemClick}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
