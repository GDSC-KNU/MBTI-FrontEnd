import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom, isAuthenticatedAtom } from "./pages/login/atoms";
import Button from "./components/Button";
import {
  GoogleOAuthProvider,
  googleLogout,
  CredentialResponse,
  GoogleLogin,
} from "@react-oauth/google";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import GLogo from "./assets/logo/GLogo.png";

interface LoginPageProps {
  onLogin: () => void;
  onLogout: (isLoggedOut: boolean) => void;
  onNavbarLogout: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onLogout,
  onNavbarLogout,
}) => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const sendTokenToServer = async (idToken: string) => {
    try {
      await axios.post(
        "https://gdscmbti.duckdns.org/v1/oauth/login",
        { idToken },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
    } catch (error) {
      console.error("토큰 조회 실패:", error);
    }
  };

  const handleNavigation = () => {
    navigate("/");
  };

  const handleLogout = () => {
    alert("로그아웃 하시겠습니까?");
    googleLogout();
    setIsAuthenticated(false); // 사용자 인증 상태를 false로 변경하여 로그아웃 처리
    setUser({ name: "", email: "", profile: "" }); // 사용자 정보 초기화
    onLogout(false); // 로그아웃 처리를 App.tsx로 전달
    onNavbarLogout();
  };

  return (
    <GoogleOAuthProvider clientId="30471056996-73pcva8f87e441abujp8bevhc9r7th71.apps.googleusercontent.com">
      {isAuthenticated ? (
        <div className="items-center text-center flex flex-col gap-4">
          <Button onClick={handleNavigation}>테스트 하러 가기 🚀</Button>
          <div className="flex gap-2 rounded-full bg-[#e8e8e8] px-3 py-2">
            <FiLogOut size="18" />
            <h1
              className="text-[12px] text-[#333] hover:cursor-pointer hover:underline"
              onClick={handleLogout}
            >
              로그아웃
            </h1>
          </div>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(credentialResponse: CredentialResponse) => {
            const idToken = credentialResponse.credential;
            if (idToken) {
              sendTokenToServer(idToken);
              onLogin(); // 로그인 성공 시 호출되는 콜백 함수를 호출
            } else {
              console.error("Invalid credential response:", credentialResponse);
            }
          }}
        />
      )}
    </GoogleOAuthProvider>
  );
};

interface IndexProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Index: React.FC<IndexProps> = ({
  isAuthenticated,
  onLogin,
  onLogout,
}) => {
  const [indexIsAuthenticated, setIndexIsAuthenticated] =
    useState(isAuthenticated);

  const handleLogin = () => {
    onLogin();
  };

  const handleLogout = () => {
    onLogout();
  };

  useEffect(() => {
    setIndexIsAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <section
      id="index-page"
      className="flex-1 flex items-center justify-center h-screen"
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center font-bold text-[17px] ">
          <img className="w-[50px]" src={GLogo} alt="GDTI small logo" />
          <p className="mt-4">
            {indexIsAuthenticated ? "GDTI를 " : "GDTI 이용을 위해 "}
          </p>
          <h1 className="mb-2">
            {indexIsAuthenticated ? "사용해 보세요 !" : "로그인을 해주세요 !"}
          </h1>
          <LoginPage
            onLogin={handleLogin}
            onLogout={handleLogout}
            onNavbarLogout={handleLogout}
          />
        </div>
      </div>
    </section>
  );
};

export default Index;
