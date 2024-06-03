import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./index";
import BoardDetail from "./pages/Board/BoardDetail";
import MBTIBoard from "./pages/Board/MBTIindex";
import WritePage from "./pages/Board/WritePage";
import BoardModify from "./pages/Board/BoardModify";
import MbtiTest from "./pages/Mbti/MbtiTest";
import Footer from "./components/Footer";
import { useState } from "react";
import MyPage from "./pages/Mypage/MyPage";
import Navbar from "./components/Navbar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col min-h-screen">
          <Navbar
            isAuthenticated={isAuthenticated}
            onNavbarLogout={handleLogout}
          />
          <Routes>
            <Route index path="/" element={<MbtiTest />} />
            <Route path="/test" element={<MbtiTest />} />
            <Route
              path="/login"
              element={
                <Index
                  isAuthenticated={isAuthenticated}
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                />
              }
            />
            <Route path="/totalboarddetail/:id" element={<BoardDetail />} />
            <Route path="/boardmodify/:id" element={<BoardModify />} />
            <Route path="/mbtiboard" element={<MBTIBoard />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route
              path="/writepage"
              element={
                <WritePage
                  onPostSubmit={() => {
                    /* 적절한 내용을 추가하거나 필요 없는 경우 함수 자체를 제거할 수 있습니다. */
                  }}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
