import { Random } from "@woowacourse/mission-utils";
import Guess from "../domain/Guess.js";

/**
 * 숫자 야구 게임의 핵심 서비스를 제공하는 클래스
 */
class GameService {
  /**
   * GameService 클래스의 생성자. 게임의 정답 숫자를 설정한다.
   */
  constructor() {
    this.answer = Random.pickUniqueNumbersInRange(1, 9, 3);
  }

  /**
   * 사용자의 입력을 처리하고 게임의 결과를 반환한다.
   * @param {number[]} userInput 사용자가 입력한 숫자 배열.
   * @returns {string} 게임의 결과 메시지를 반환합니다. ("3스트라이크", "1볼 2스트라이크", "낫싱" 등)
   */
  processInput(userInput) {
    // Guess 클래스를 사용하여 입력값의 유효성을 검증한다.
    const guess = new Guess(userInput).value;

    let strike = 0;
    let ball = 0;

    guess.forEach((num, index) => {
      if (num === this.answer[index]) {
        strike++;
      } else if (this.answer.includes(num)) {
        ball++;
      }
    });

    if (strike === 3) {
      return "3스트라이크";
    }

    let resultMessage = "";
    if (ball > 0) {
      resultMessage += `${ball}볼 `;
    }
    if (strike > 0) {
      resultMessage += `${strike}스트라이크`;
    }
    return resultMessage || "낫싱";
  }

  /**
   * 게임을 재시작하기 위해 새로운 정답 숫자를 설정한다.
   */
  resetGame() {
    this.answer = Random.pickUniqueNumbersInRange(1, 9, 3);
  }
}

export default GameService;
