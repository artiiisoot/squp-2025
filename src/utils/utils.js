//utils.js

export const formatText = (text) => {
  return text
    .split("\n")
    .map((text) => `<span>${text.trim()}</span>`)
    .join("");
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
