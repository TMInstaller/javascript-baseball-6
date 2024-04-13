import { Console } from "@woowacourse/mission-utils";
import ConsoleUI from "./ui/ConsoleUI.js";
import GameService from "./service/GameService.js";

// async 내부에는 await + Method를 할 것
// Random.<Method Name> 을 통해 랜덤을 사용할 것
// Console.<Method Name> 을 통해 콘솔을 사용할 것

export default class App {
  constructor() {
    this.gameService = new GameService();
    this.consoleUI = new ConsoleUI();
  }

  async start() {
    let restart = true;
    while (restart) {
      try {
        // 게임 시작 멘트 출력
        this.consoleUI.printGameStartMessage();

        // 게임 메인 로직
        await this.gameLoop();

        // 게임 재시작 여부를 결정하는 로직
        const userChoice = await this.consoleUI.promptRestartGame();
        if (userChoice !== "1") {
          // 게임 종료 멘트 출력
          this.consoleUI.printGameEndMessage();
          restart = false; // 게임을 재시작하지 않고 while 루프 종료
        }
      } catch (error) {
        Console.print(error.message);
        restart = false; // 예외 발생시 게임 종료
      }
    }
  }

  async gameLoop() {
    let isGameOver = false;
    while (!isGameOver) {
      // 사용자로부터 입력 받기
      const userInput = await this.consoleUI.promptUserInput();

      // 입력값을 게임 서비스로 전달하여 로직 처리
      const result = this.gameService.processInput(userInput);

      // 결과 출력
      this.consoleUI.printResult(result);

      // 게임 종료 조건 체크
      if (result === "3스트라이크") {
        isGameOver = true;
      }
    }
  }
}

// node src/App.js를 통해 실제 야구게임을 실행해볼수 있다.
const app = new App();
app.start();

// npm test를 통해 최종 테스트 진행할 것
