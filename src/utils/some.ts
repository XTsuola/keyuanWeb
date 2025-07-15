export function getNowTime(): string {
  const date = new Date();
  const Y = date.getFullYear();
  const M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const m =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
}

export function getMyCard(allData, myCardList) {
  const list = [];
  for (let i = 0; i < myCardList.length; i++) {
    let ind = allData.findIndex((e) => e.name == myCardList[i]);
    list.push(allData[ind]);
  }
  return list;
}
