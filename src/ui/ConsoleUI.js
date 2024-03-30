import { Console } from "@woowacourse/mission-utils";

class ConsoleUI {
  async promptUserInput() {
    const input = await Console.readLineAsync(
      "숫자를 입력해주세요 (ex: 123): "
    );
    return this.validateAndFormatInput(input);
  }

  validateAndFormatInput(input) {
    if (!input || input.length !== 3 || !input.match(/^[1-9]+$/)) {
      throw new Error(
        "입력값이 올바르지 않습니다. 1~9 사이의 서로 다른 숫자 3개를 입력해주세요."
      );
    }
    return input.split("").map(Number);
  }

  printGameStartMessage() {
    Console.print("숫자 야구 게임을 시작합니다!");
  }

  printResult(result) {
    Console.print(result);
  }

  printErrorMessage(errorMessage) {
    Console.print(errorMessage);
  }

  async promptRestartGame() {
    return await Console.readLineAsync(
      "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요: "
    );
  }

  printGameEndMessage() {
    Console.print("게임을 종료합니다. 다음에 또 만나요!");
  }
}

export default ConsoleUI;
