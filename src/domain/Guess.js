/**
 * 숫자 야구 게임에서 사용자가 입력한 정답에 대한 추측을 나타내는 클래스
 */
class Guess {
  /**
   * Guess 클래스의 생성자
   * @param {number[]} value - 사용자가 입력한 1~9 사이의 서로 다른 숫자 3개의 배열
   */
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
