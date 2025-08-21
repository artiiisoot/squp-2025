export const validateFields = (fields, agreements) => {
  const errors = {};

  // 1. 이름
  const name = fields.name.trim();
  if (!name) {
    errors.name = "필수 입력 영역 입니다.";
  } else if (name.length < 3 || name.length > 12) {
    errors.name = "이름을 6~12자 이내로 입력해 주세요.";
  } else if (/[^a-zA-Z가-힣]/.test(name)) {
    errors.name = "이름은 한글 또는 영어로만 입력할 수 있습니다.";
  }

  // 2. 휴대폰번호
  const rawPhone = fields.phone.replace(/[^0-9]/g, "");
  if (!rawPhone) {
    errors.phone = "필수 입력 영역 입니다.";
  } else if (
    !/^01[016789]\d{7,8}$/.test(rawPhone) ||
    /^(\d)\1+$/.test(rawPhone)
  ) {
    errors.phone = "올바른 휴대폰 번호를 입력해 주세요.";
  }

  // 3. 이메일
  const email = fields.email.replace(/\s/g, "");
  if (!email) {
    errors.email = "필수 입력 영역 입니다.";
  } else if (
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ||
    /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(email) ||
    email.length > 100 ||
    /[.]{2,}|[-]{2,}/.test(email) ||
    /^[._-]|[._-]$/.test(email)
  ) {
    errors.email = "올바른 이메일을 입력해 주세요.";
  }

  // 업종(Industry) 필수 검사 추가
  if (!fields.industry) {
    errors.industry = "업종을 선택해 주세요.";
  }
  if (!fields.job_category) {
    errors.job_category = "직군을 선택해 주세요.";
  }

  // 4~6. 회사명, 부서명, 직책 공통 검사
  const validateText = (value, label) => {
    const val = value.trim();
    if (!val) return "필수 입력 영역 입니다.";
    if (val.length < 2 || val.length > 50 || /^\s+$/.test(val)) {
      return `${label}을(를) 2~50자 이내로 입력해 주세요.`;
    }
    if (/--|\.\.|&&/.test(val) || /^[\s]+|[\s]+$/.test(value)) {
      return `올바른 ${label}을 입력해 주세요.`;
    }
    if (!/^[a-zA-Z가-힣0-9().&\-\s]+$/.test(val)) {
      return `올바른 ${label}을 입력해 주세요.`;
    }
    return null;
  };

  const labels = {
    // industry: "업종",
    company: "회사명",
    department: "부서명",
    // job_category: "직군",
    position: "직책",
  };

  Object.entries(labels).forEach(([key, label]) => {
    const error = validateText(fields[key], label);
    if (error) errors[key] = error;
  });

  // 7. 단일 필수 동의 체크
  if (!agreements.agreeRequired) {
    errors.agreements = "필수 항목에 동의해주세요.";
  }

  // 관심 트랙(fav_content) 필수 검사
  if (!fields.fav_content) {
    errors.fav_content = "관심 트랙을 선택해 주세요.";
  }

  return errors;
};
