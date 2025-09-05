import request from "./index";

// 获取游戏数据
export function getGameMap() {
  return request({
    url: "/qingshu/getMap",
    method: "get",
  });
}

// // 重置游戏
// export function resetGame() {
//   return request({
//     url: "/qingshu/reset",
//     method: "get",
//   });
// }
// // 摸牌
// export function getCard(userId: number) {
//   return request({
//     url: "/qingshu/getCard?userId=" + userId,
//     method: "get",
//   });
// }

// // 出牌
// export function disCard(data: any) {
//   return request({
//     url: "/qingshu/disCard",
//     method: "post",
//     data: data
//   });
// }