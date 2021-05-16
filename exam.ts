import Wallet from "./Wallet";

/**
 * @param {number} time
 * @return {*}
 */
const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

/**
 * 銀行口座クラスを作りメンバメソッドを実行します
 */
const Exam = async () => {
  const wallet = new Wallet(10);
  wallet.withdrawalMoney(100);
  wallet.depositMoney(20);
  await sleep(1000);
  wallet.depositMoney(20);
  await sleep(1000);
  wallet.withdrawalMoney(100);
  console.log(wallet.getCurrentBalance());
  console.log(wallet.getHistory());
};

Exam();
