class Guess {
  constructor(value) {
    if (!this.isValid(value)) {
      throw new Error(
        "입력값이 올바르지 않습니다. 1~9 사이의 서로 다른 숫자 3개를 입력해주세요."
      );
    }
    this.value = value;
  }

  isValid(value) {
    // 입력 값에 대한 유효성 검사
    return (
      value &&
      value.length === 3 &&
      value.every((num) => num >= 1 && num <= 9) &&
      new Set(value).size === 3
    );
  }
}

export default Guess;
