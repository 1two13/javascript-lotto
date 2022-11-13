const { Console } = require('@woowacourse/mission-utils');
const Messages = require('./Messages');
const LottoSeller = require('./LottoSeller');
const Lotto = require('./Lotto');

class App {
  #lottoSeller;

  constructor() {
    this.#lottoSeller = new LottoSeller();
  }

  play() {
    Console.readLine(Messages.ENTER_MONEY, (money) => {
      money = Number(money);
      const lottos = this.#lottoSeller.sellLotto(money);

      this.#printLottos(lottos);
    });
  }

  #printLottos(lottos) {
    Console.print(`\n${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => Console.print(lotto.toString()));

    this.#enterWinningNumber(lottos);
  }

  #enterWinningNumber(lottos) {
    Console.readLine(Messages.ENTER_WINNER_NUMBER, (winning) => {
      winning = winning.split(',').map(Number);
      const winningLotto = new Lotto(winning);

      this.#enterBonusNumber(lottos, winningLotto);
    });
  }

  #enterBonusNumber(lottos, winning) {
    Console.readLine(Messages.ENTER_BONUS_NUMBER, (bonus) => {
      bonus = Number(bonus);
      this.#validateBonusNumber(winning, bonus);

      this.#printWinningStatics(lottos, winning, bonus);
    });
  }

  #validateBonusNumber(winning, bonus) {
    if (winning.hasNumber(bonus)) throw new Error(Messages.NOT_DUPLICATE);
    if (!(bonus >= 1 && bonus <= 45)) throw new Error(Messages.NUMBERS_IN_RANGE);
  }

  #printWinningStatics(lottos, winning, bonus) {
    Console.print(Messages.WINNING_STATICS);
    const { winningArray, profit } = this.#lottoManager.lottosWinningBonus(lottos, winning, bonus);

    this.#printWinningHistory(winningArray);
    this.#printRate(profit, lottos.length);
  }

  #printWinningHistory(winningArray) {
    Console.print(`3개 일치 (5,000원) - ${winningArray[0]}개`);
    Console.print(`4개 일치 (50,000원) - ${winningArray[1]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${winningArray[2]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningArray[3]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${winningArray[4]}개`);
  }

  #printRate(profit, count) {
    const rate = ((profit / (count * this.#lottoSeller.getLottoPrice())) * 100).toFixed(1);

    Console.print(`총 수익률은 ${rate}%입니다.`);
  }
}

module.exports = App;
