import CryptoJS from "crypto-js";
// const BASE = "https://squp.kr/api/api_copy.php";
// const BASE = "https://cxuxdev12.cafe24.com/api/api_copy.php";
// const KEY = "G7m5zUk9P3xL1qW2erE8BfK0TgYdR4sN6VoJpCzMhXaL9lK3";

const BASE = process.env.REACT_APP_API_BASE_OFFICIAL_URL;
const KEY = process.env.REACT_APP_API_KEY;

export async function callApi({ endpoint = "", method = "POST", body = null }) {
  const headers = {
    "Content-Type": "application/json",
  };

  // 본문 직렬화
  const payloadString = JSON.stringify(body);
  // HMAC 해시 생성 후 헤더에 추가
  const hash = CryptoJS.HmacSHA256(payloadString, KEY).toString(
    CryptoJS.enc.Hex
  );
  headers["X-Auth-Hash"] = hash;

  try {
    const response = await fetch(`${BASE}${endpoint}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      return { message: text }; // PHP 응답이 JSON이 아닐 경우
    }
  } catch (error) {
    return { error: "요청 중 오류 발생." };
  }
}
