import { DepositWithdrawalHistory } from "./interface";

/**
 * 銀行口座のクラス
 *
 * @export
 * @class Wallet
 */
export default class Wallet {
  private balance: number;
  private moneyHistory: Array<DepositWithdrawalHistory>;

  /**
   * コンストラクタ
   * @param {number} initialBalance
   * @memberof Wallet
   */
  constructor(initialBalance: number) {
    this.balance = initialBalance;
    this.moneyHistory = new Array();
    this.moneyHistory.push({
      date: new Date(),
      difference: initialBalance,
      balance: initialBalance,
    });
  }

  /**
   * 入出金履歴の作成
   *
   * @private
   * @param {Date} inputDate 日時
   * @param {number} inputDifference 入出金額
   * @param {number} inputBalance さ
   * @memberof Wallet 銀行口座クラスのメンバです
   */
  private addHistory(
    inputDate: Date,
    inputDifference: number,
    inputBalance: number
  ) {
    this.moneyHistory = [
      {
        date: inputDate,
        difference: inputDifference,
        balance: inputBalance,
      },
      ...this.moneyHistory,
    ];
  }

  /**
   * 指定された金額を入金し，残高に反映します．
   *
   * @param {number} amount 指定金額
   * @memberof Wallet
   */
  withdrawalMoney(amount: number) {
    if (amount < 0) {
      throw new RangeError("引数は0以上である必要があります");
    }
    const now = new Date();
    this.balance += amount;
    this.addHistory(now, amount, this.balance);
  }

  /**
   * 指定した金額を出金し，残高に反映します．
   *
   * @param {number} amount 指定金額
   * @memberof Wallet 銀行口座クラスのメンバです
   */
  depositMoney(amount: number) {
    if (amount < 0) {
      throw new RangeError("引数は0以上である必要があります");
    }
    const newBalance = this.balance - amount;

    if (newBalance < 0) {
      throw new Error("現在の残高を超えて出金することはできません");
    }
    const now = new Date();
    this.balance = newBalance;
    this.addHistory(now, amount, this.balance);
  }

  /**
   * 現在の残高を取得します
   *
   * @return {*}  {number}
   * @memberof Wallet 銀行口座クラスのメンバです
   */
  getCurrentBalance(): number {
    return this.balance;
  }

  /**
   * すべての入出金履歴を最新の順に確認します
   *
   * @return {Array}
   * @memberof Wallet 銀行口座クラスのメンバです
   */
  getHistory() {
    console.log("入出金履歴を最新順で表示します");
    const descSortArray = [...this.moneyHistory].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
    return descSortArray;
  }
}
