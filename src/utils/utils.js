//utils.js

export const formatText = (text) => {
  return text
    .split("\n")
    .map((text) => `<span>${text.trim()}</span>`)
    .join("");
};

export const formatDatePicker = (date) => {
  if (!date || isNaN(date.getTime())) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const pixToRem = (px, base = 16) => {
  if (typeof px !== "number") {
    throw new Error("Input must be a number");
  }
  return `${px / base}rem`;
};

export const handleESC = (callback) => (e) => {
  if (e.key === "Escape") {
    callback();
  }
};

const allImages = require.context(
  "@/assets/images",
  true,
  /\/(list|detail)\/.*\.png$/ // ✅ list, detail 하위 이미지 모두 포함
);

export const getRequireImage = (page, type, fileName) => {
  if (!fileName) return null;

  const path = `./${page}/${type}/${fileName}`;

  try {
    return allImages(path);
  } catch (err) {
    console.warn(`이미지 로딩 실패: ${path}`);
    return null;
  }
};

// 이미지 동적 로드
export const importAllImages = (require) => {
  const images = {};
  require.keys().forEach((key) => {
    const cleanKey = key.replace("./", ""); // "logo_1.png"
    images[cleanKey] = require(key).default || require(key);
  });
  return images;
};
