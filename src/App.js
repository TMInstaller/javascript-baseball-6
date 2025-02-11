import { MissionUtils } from "@woowacourse/mission-utils";

// async 내부에는 await + Method를 할 것
// Random.<Method Name> 을 통해 랜덤을 사용할 것
// Console.<Method Name> 을 통해 콘솔을 사용할 것

class App {
  constructor() {
    this.checkFirstRun = true; // 플래그 변수
  }

  systemStartMent() {
    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
  }

  systemGenerateRandomAnswer() {
    let answerNumArr = [];
    while (answerNumArr.length < 3) {
      let randomNum = MissionUtils.Random.pickNumberInRange(1, 9);
      // 서로 다른 랜덤의 수 3개가 들어와야 하므로 조건을 지정하여 처리
      if (!answerNumArr.includes(randomNum)) answerNumArr.push(randomNum);
    }

    return answerNumArr;
  }

  async playGame(answerNumArr) {
    while (true) {
      // 사용자의 정답 입력
      let inputAnswer = await this.userInputAnswer();
      // 사용자의 정답에 따른 결과 return
      let checkMessage = this.systemCheckAnswer(inputAnswer, answerNumArr);
      // return된 결과를 출력하기
      MissionUtils.Console.print(checkMessage);
      if (checkMessage === "3스트라이크") {
        break;
      }
    }
  }

  async userInputAnswer() {
    let inputAnswer = await MissionUtils.Console.readLineAsync(
      "숫자를 입력해주세요 : "
    );

    if (inputAnswer === "") throw new Error("[ERROR] 입력된 값이 없습니다");
    if (inputAnswer && inputAnswer.length !== 3)
      throw new Error("[ERROR] 3자리의 숫자를 입력해주세요");
    if (inputAnswer && inputAnswer.includes(NaN))
      throw new Error("[ERROR] 숫자를 입력해주세요");

    if (inputAnswer !== undefined)
      inputAnswer = inputAnswer.split("").map(Number);

    return inputAnswer;
  }

  systemCheckAnswer(inputAnswer, answerNumArr) {
    let message = "";
    let ball = 0;
    let strike = 0;
    for (let i = 0; i < 3; i++) {
      if (inputAnswer[i] === answerNumArr[i]) {
        strike++;
      } else if (answerNumArr.includes(inputAnswer[i])) {
        ball++;
      }
    }

    message += ball !== 0 ? `${ball}볼 ` : ``;
    message += strike !== 0 ? `${strike}스트라이크` : ``;

    return message.length === 0 ? `낫싱` : message;
  }

  async userSelectRestartOrQuit() {
    MissionUtils.Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    MissionUtils.Console.print(
      "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요."
    );
    let selectRestartOrQuit = await MissionUtils.Console.readLineAsync("");
    return selectRestartOrQuit;
  }

  systemRestartOrQuitProcess(restartOrQuitNum) {
    if (restartOrQuitNum === "2") {
      return;
    } else if (restartOrQuitNum !== "1") {
      throw new Error("[ERROR] 잘못된 접근입니다");
    }
    return app.play();
  }

  // 게임이 진행되는 곳
  async play() {
    if (this.checkFirstRun) {
      // 게임 시작 멘트, 첫 실행 시에만 출력되도록 한다.
      this.systemStartMent();
      this.checkFirstRun = false;
    }
    // try/catch를 통해 비동기 작업에 대한 error 핸들링하기
    try {
      // 야구게임 정답 생성
      let answerNumArr = this.systemGenerateRandomAnswer();
      // 정답을 받아 게임을 진행
      await this.playGame(answerNumArr);
      // "3스트라이크"가 나왔을 때 게임 재시작/종료 선택
      let restartOrQuitNum = await this.userSelectRestartOrQuit();
      // 게임 재시작/종료 로직 수행
      this.systemRestartOrQuitProcess(restartOrQuitNum);
    } catch (e) {
      throw e;
    }
  }
}

export default App;

// node src/App.js를 통해 실제 야구게임을 실행해볼수 있다.
const app = new App();
app.play();

// npm test를 통해 최종 테스트 진행할 것
