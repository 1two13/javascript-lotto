const { Console } = require('@woowacourse/mission-utils');
const Messages = require('./Messages');
const LottoSeller = require('./LottoSeller');
const WinningAndBonusNumbers = require('./WinningAndBonusNumbers');
const LottoManager = require('./LottoManager');

class App {
  constructor() {
    this.lottoSeller = new LottoSeller();
    this.winningAndBonusNumbers = new WinningAndBonusNumbers();
    this.lottoManager = new LottoManager();
  }

  play() {
    Console.readLine(Messages.INPUT_MONEY, (money) => {
      this.lottoSeller.resultsForCountAndNumbers(money);
      this.enterWinningNumber();
    });
  }

  enterWinningNumber() {
    Console.readLine(Messages.INPUT_WINNER_NUMBER, (numbers) => {
      this.winningAndBonusNumbers.sixNumbersInRange(numbers);
      this.enterBonusNumber();
    });
  }

  enterBonusNumber() {
    Console.readLine(Messages.INPUT_BONUS_NUMBER, (number) => {
      this.winningAndBonusNumbers.numberNotDuplicate(number);
      this.lottoManager.winningStatics();
    });
  }
}

module.exports = App;
