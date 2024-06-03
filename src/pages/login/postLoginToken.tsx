//  해당 파일은 클라이언트에서 서버로 JWT를 전송하여 로그인 요청을 처리하는 역할만을 담당 (잘 작동하는 듯)

import axios from "axios";

export const postLoginToken = async (idToken: string): Promise<boolean> => {
  const API_URL = process.env.REACT_APP_API_URL;
  const path = "/v1/oauth/login";

  try {
    const response = await axios.post(`${API_URL}${path}`, idToken, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error("Failed to receive login token");
    }

    // Perform any operations with the token, such as storing it
    // ...

    return true;
  } catch (error: unknown) {
    console.error("postLoginToken Error:", (error as Error).message);
    return false;
  }
};
