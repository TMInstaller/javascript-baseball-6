import { Random } from "@woowacourse/mission-utils";
import Guess from "../domain/Guess.js";

class GameService {
  constructor() {
    this.answer = Random.pickUniqueNumbersInRange(1, 9, 3);
  }

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

  resetGame() {
    this.answer = Random.pickUniqueNumbersInRange(1, 9, 3);
  }
}

export default GameService;
