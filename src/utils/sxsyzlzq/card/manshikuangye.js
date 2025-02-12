// 蛮石旷野 15级

/*

白卡：

1.草原狼(1费/14/4)：无。（lv16）
  草原狼(1费/9/4)：无。（lv12）

2.斑毛幼猪(3费/13/13)：死亡:英雄生命+13。（lv16）
  斑毛幼猪(3费/12/12)：死亡:英雄生命+12。（lv15）
  斑毛幼猪(3费/11/11)：死亡:英雄生命+11。（lv14）
  斑毛幼猪(3费/10/10)：死亡:英雄生命+10。（lv13）
  斑毛幼猪(3费/9/9)：死亡:英雄生命+9。（lv12）

3.蛮化术(3费/法术)：目标单位+15/+15。（lv16）
  蛮化术(3费/法术)：目标单位+10/+10。（lv12）

4.再生食人魔(5费/10/25)：回合结束:若本回合受到过伤害，自身+5/+10。（lv16）
  再生食人魔(5费/6/20)：回合结束:若本回合受到过伤害，自身+4/+6。（lv12）

5.长毛象(6费/25/45)：无。（lv16）
  长毛象(6费/24/40)：无。（lv15）
  长毛象(6费/22/38)：无。（lv14）
  长毛象(6费/20/35)：无。（lv13）
  长毛象(6费/18/32)：无。（lv12）



蓝卡：

1.愚笨鲸头鹅(0费/8/18)：【洞察1】、【迟缓】、命中英雄:抓一张牌，并且【洞察1】。（lv16）
  愚笨鲸头鹅(0费/7/15)：【洞察1】、【迟缓】、命中英雄:抓一张牌，并且【洞察1】。（lv15）
  愚笨鲸头鹅(0费/6/13)：【洞察1】、【迟缓】、命中英雄:抓一张牌，并且【洞察1】。（lv14）
  愚笨鲸头鹅(0费/5/12)：【洞察1】、【迟缓】、命中英雄:抓一张牌，并且【洞察1】。（lv13）
  愚笨鲸头鹅(0费/4/11)：【洞察1】、【迟缓】、命中英雄:抓一张牌，【洞察1】。（lv12）

2.蛮石血蜥(1费/13/12)：当己方英雄恢复生命时：自身攻击+7。（lv16）
  蛮石血蜥(1费/11/11)：当己方英雄恢复生命时：自身攻击+7。（lv15）
  蛮石血蜥(1费/10/10)：当己方英雄恢复生命时：自身攻击+6。（lv14）
  蛮石血蜥(1费/9/9)：当己方英雄恢复生命时：自身攻击+6。（lv13）
  蛮石血蜥(1费/8/8)：当己方英雄恢复生命时：自身攻击+5。（lv12）

3.迟来的补给(1费/法术)：目标友军+13/+12，若该生物具有迟缓，则获得【践踏】、抽一张牌。（lv16）
  迟来的补给(1费/法术)：目标友军+11/+11，若该生物具有迟缓，则获得【践踏】、抽一张牌。（lv15）
  迟来的补给(1费/法术)：目标友军+10/+10，若该生物具有迟缓，则获得【践踏】、抽一张牌。（lv14）
  迟来的补给(1费/法术)：目标友军+9/+9，若该生物具有迟缓，则获得【践踏】、抽一张牌。（lv13）
  迟来的补给(1费/法术)：目标友军+8/+8，若该生物具有迟缓，则获得【践踏】、抽一张牌。（lv12）

4.旷野祭师(2费/6/18)：【洞察1】、你得法力上限+1、洞察时:英雄生命+12。（lv16）
  旷野祭师(2费/5/17)：【洞察1】、你得法力上限+1、洞察时:英雄生命+10。（lv15）
  旷野祭师(2费/4/16)：【洞察1】、你得法力上限+1、洞察时:英雄生命+9。（lv14）
  旷野祭师(2费/4/14)：【洞察1】、你得法力上限+1、洞察时:英雄生命+8。（lv13）
  旷野祭师(2费/3/13)：【洞察1】、你得法力上限+1、洞察时:英雄生命+7。（lv12）

5.蓄力射手(2费/10/25)：登场，回合结束:射击敌方英雄。（lv16）
  蓄力射手(2费/9/22)：登场，回合结束:射击敌方英雄。（lv15）
  蓄力射手(2费/8/20)：登场，回合结束:射击敌方英雄。（lv14）
  蓄力射手(2费/7/18)：登场，回合结束:射击敌方英雄。（lv13）
  蓄力射手(2费/6/17)：登场，回合结束:射击敌方英雄。（lv12）

6.痴蛮野人(2费/25/25)：【迟缓】、洞察时:自身+4/+4。（lv16）
  痴蛮野人(2费/22/22)：【迟缓】、洞察时:自身+4/+4。（lv15）
  痴蛮野人(2费/20/20)：【迟缓】、洞察时:自身+3/+4。（lv14）
  痴蛮野人(2费/18/18)：【迟缓】、洞察时:自身+3/+4。（lv13）
  痴蛮野人(2费/16/16)：【迟缓】、洞察时:自身+3/+3。（lv12）

7.贪食肥鼠(2费/10/33)：当己方英雄恢复生命:自身+3/+6，魔防+3。（lv16）
  贪食肥鼠(2费/9/30)：当己方英雄恢复生命:自身+2/+6，魔防+3。（lv15）
  贪食肥鼠(2费/8/26)：当己方英雄恢复生命:自身+2/+6，魔防+2。（lv14）
  贪食肥鼠(2费/7/23)：当己方英雄恢复生命:自身+2/+5，魔防+2。（lv13）
  贪食肥鼠(2费/6/20)：当己方英雄恢复生命:自身+2/+5，魔防+2。（lv12）

8.蛮石穿山甲(2费/15/20)：【护甲5】、当己方英雄恢复生命:自身攻击+5，护甲+1。（lv16）
  蛮石穿山甲(2费/14/18)：【护甲4】、当己方英雄恢复生命:自身攻击+5，护甲+1。（lv15）
  蛮石穿山甲(2费/12/17)：【护甲4】、当己方英雄恢复生命:自身攻击+4，护甲+1。（lv14）
  蛮石穿山甲(2费/10/16)：【护甲3】、当己方英雄恢复生命:自身攻击+4，护甲+1。（lv13）
  蛮石穿山甲(2费/8/15)：【护甲3】、当己方英雄恢复生命:自身攻击+3，护甲+1。（lv12）

9.势如破竹(2费/法术)：目标单位+15/+17，并获得【践踏】。（lv16）
  势如破竹(2费/法术)：目标单位+12/+16，并获得【践踏】。（lv15）
  势如破竹(2费/法术)：目标单位+10/+16，并获得【践踏】。（lv14）
  势如破竹(2费/法术)：目标单位+9/+15，并获得【践踏】。（lv13）
  势如破竹(2费/法术)：目标单位+8/+14，并获得【践踏】。（lv12）

10.蛮野仙人掌(2费/6/28)：【守军】、【荆棘】、死亡:抽一张牌。（lv16）
   蛮野仙人掌(2费/5/25)：【守军】、【荆棘】、死亡:抽一张牌。（lv15）
   蛮野仙人掌(2费/5/22)：【守军】、【荆棘】、死亡:抽一张牌。（lv14）
   蛮野仙人掌(2费/4/21)：【守军】、【荆棘】、死亡:抽一张牌。（lv13）

11.高原卫士(2费/18/26)：【洞察1】、【迟缓】、回合结束：若本回合受到过伤害，自身+4/+9，【洞察1】。（lv16）
   高原卫士(2费/16/25)：【洞察1】、【迟缓】、回合结束：若本回合受到过伤害，自身+4/+8，【洞察1】。（lv15）
   高原卫士(2费/15/23)：【洞察1】、【迟缓】、回合结束：若本回合受到过伤害，自身+3/+8，【洞察1】。（lv14）
   高原卫士(2费/13/22)：【洞察1】、【迟缓】、回合结束：若本回合受到过伤害，自身+3/+6，【洞察1】。（lv13）
   高原卫士(2费/12/20)：【迟缓】、【洞察1】、回合结束：若本回合受到过伤害，自身+3/+5，【洞察1】。（lv12）

12.盘旋秃鹫(2费/16/13)：命中英雄:【洞察1】、洞察时:自身攻击+6。（lv16）
   盘旋秃鹫(2费/15/12)：命中英雄:【洞察1】、洞察时:自身攻击+5。（lv15）

13.沙暴试炼(2费/法术)：全体生物受到1点伤害，随机友军+7/+17，抽一张牌。（lv16）
   沙暴试炼(2费/法术)：全体生物受到1点伤害，随机友军+6/+15，抽一张牌。（lv15）

14.寻路斥候(3费/20/10)：登场:射击随机敌方，10点伤害、洞察时:射击随机敌军，7点伤害。（lv16）
   寻路斥候(3费/17/10)：登场:射击随机敌方，9点伤害、洞察时:射击随机敌军，6点伤害。（lv15）
   寻路斥候(3费/15/9)：登场:射击随机敌方，8点伤害、洞察时:射击随机敌军，6点伤害。（lv14）
   寻路斥候(3费/13/8)：登场:射击随机敌方，8点伤害、洞察时:射击随机敌军，5点伤害。（lv13）
   寻路斥候(3费/11/7)：登场:射击随机敌方，7点伤害、洞察时:射击随机敌军，5点伤害。（lv12）

15.喧哗舞者(3费/19/10)：登场:相邻随机友军+13/+0，魔防+6。（lv16）
   喧哗舞者(3费/17/10)：登场:相邻随机友军+12/+0，魔防+5。（lv15）
   喧哗舞者(3费/15/10)：登场:相邻随机友军+11/+0，魔防+5。（lv14）
   喧哗舞者(3费/13/10)：登场:相邻随机友军+10/+0，魔防+4。（lv13）
   喧哗舞者(3费/12/8)：登场:相邻随机友军+9/+0，魔防+4。（lv12）

16.迅捷长矛手(3费/16/30)：命中英雄:对随机敌军投掷长矛，6点伤害，两次效果。（lv16）
   迅捷长矛手(3费/15/25)：命中英雄:对随机敌军投掷长矛，6点伤害，两次效果。（lv15）
   迅捷长矛手(3费/14/24)：命中英雄:对随机敌军投掷长矛，5点伤害，两次效果。（lv14）
   迅捷长矛手(3费/12/22)：命中英雄:对随机敌军投掷长矛，5点伤害，两次效果。（lv13）
   迅捷长矛手(3费/10/20)：命中英雄:对随机敌军投掷长矛，5点伤害，两次效果。（lv12）

17.厚皮河马(3费/17/45)：【洞察1】、【迟缓】、回合结束:若本回合受到过伤害，自身生命+11。（lv16）
   厚皮河马(3费/16/40)：【洞察1】、【迟缓】、回合结束:若本回合受到过伤害，自身生命+10。（lv15）
   厚皮河马(3费/14/38)：【洞察1】、【迟缓】、回合结束:若本回合受到过伤害，自身生命+8。（lv14）
   厚皮河马(3费/13/35)：【洞察1】、【迟缓】、回合结束:若本回合受到过伤害，自身生命+7。（lv13）
   厚皮河马(3费/12/32)：【迟缓】、【洞察1】、回合结束:若本回合受到过伤害，自身生命+6。（lv12）

18.面包树(3费/0/55)：【守军】、【磐龙】、法力上限+1。（lv16）
   面包树(3费/0/50)：【守军】、【磐龙】、法力上限+1。（lv15）
   面包树(3费/0/45)：【守军】、【磐龙】、法力上限+1。（lv14）
   面包树(3费/0/40)：【守军】、【磐龙】、法力上限+1。（lv13）
   面包树(3费/0/35)：【守军】、【磐龙】、法力上限+1。（lv12）

19.噬人花(3费/0/55)：回合结束:若本回合曾受到伤害，则自身+11/+11。（lv16）
   噬人花(3费/0/50)：回合结束:若本回合曾受到伤害，则自身+10/+10。（lv15）
   噬人花(3费/0/45)：回合结束:若本回合曾受到伤害，则自身+9/+9。（lv14）
   噬人花(3费/0/40)：回合结束:若本回合曾受到伤害，则自身+8/+8。（lv13）
   噬人花(3费/0/35)：回合结束:若本回合曾受到伤害，则自身+7/+7。（lv12）

20.天降碎石(3费/法术)：目标区域坠落45点伤害，全场生物受到1点伤害。（lv16）
   天降碎石(3费/法术)：目标区域坠落40点伤害，全场生物受到1点伤害。（lv15）
   天降碎石(3费/法术)：目标区域坠落35点伤害，全场生物受到1点伤害。（lv14）
   天降碎石(3费/法术)：目标区域坠落30点伤害，全场生物受到1点伤害。（lv13）

21.机敏雀鹰(3费/11/25)：【洞察1】、洞察时：自身+3/+4，魔防+3。（lv16）
   机敏雀鹰(3费/10/22)：【洞察1】、洞察时：自身+3/+3，魔防+3。（lv15）
   机敏雀鹰(3费/9/18)：【洞察1】、洞察时：自身+3/+3，魔防+3。（lv14）
   机敏雀鹰(3费/8/16)：【洞察1】、洞察时：自身+2/+3，魔防+3。（lv13）
   机敏雀鹰(3费/7/14)：【洞察1】、洞察时：自身+2/+3，魔防+2。（lv12）   

22.雪域牦牛(3费/33/33)：【迟缓】、【魔防8】、场上有冰封则失去【迟缓】。（lv16）
   雪域牦牛(3费/30/30)：【迟缓】、【魔防8】、场上有冰封则失去【迟缓】。（lv15）
   雪域牦牛(3费/28/26)：【迟缓】、【魔防8】、场上有冰封则失去【迟缓】。（lv14）
   雪域牦牛(3费/26/23)：【迟缓】、【魔防7】、场上有冰封则失去【迟缓】。（lv13）
   雪域牦牛(3费/24/20)：【迟缓】、【魔防7】、场上有冰封则失去【迟缓】。（lv12）

23.荒野赞颂人(4费/18/26)：回合开始:另一个友军+10/+0，魔防+5。（lv16）
   荒野赞颂人(4费/15/25)：回合开始:另一个友军+9/+0，魔防+4。（lv15）
   荒野赞颂人(4费/12/24)：回合开始:另一个友军+8/+0，魔防+4。（lv14）
   荒野赞颂人(4费/10/24)：回合开始:另一个友军+7/+0，魔防+3。（lv13）
   荒野赞颂人(4费/8/22)：回合开始:另一个友军+6/+0，魔防+3。（lv12）

24.原野狂战士(4费/23/23)：【洞察1】、【践踏】、【魔防6】。（lv16）
   原野狂战士(4费/21/21)：【洞察1】、【践踏】、【魔防5】。（lv15）
   原野狂战士(4费/19/19)：【洞察1】、【践踏】、【魔防4】。（lv14）
   原野狂战士(4费/18/17)：【洞察1】、【践踏】、【魔防3】。（lv13）
   原野狂战士(4费/16/16)：【洞察1】、【践踏】、【魔防3】。（lv12）   

25.巨兽猎户(4费/22/28)：登场:英雄生命+11、死亡:英雄生命+11。（lv16）
   巨兽猎户(4费/20/25)：登场:英雄生命+10、死亡:英雄生命+10。（lv15）
   巨兽猎户(4费/18/22)：登场:英雄生命+9、死亡:英雄生命+9。（lv14）
   巨兽猎户(4费/16/20)：登场:英雄生命+8、死亡:英雄生命+8。（lv13）
   巨兽猎户(4费/14/18)：登场:英雄生命+7、死亡:英雄生命+7。（lv12）   

26.生命源力(4费/法术)：【洞察1】、目标单位+23/+23，魔防+10。（lv16）
   生命源力(4费/法术)：【洞察1】、目标单位+20/+20，魔防+10。（lv15）
   生命源力(4费/法术)：【洞察1】、目标单位+18/+18，魔防+8。（lv14）
   生命源力(4费/法术)：【洞察1】、目标单位+17/+17，魔防+4。（lv13）
   生命源力(4费/法术)：【洞察1】、目标单位+16/+16。（lv12）

27.强行捕猎(4费/法术)：对目标敌军造成200点伤害、己方英雄生命+45。（lv16）
   强行捕猎(4费/法术)：对目标敌军造成180点伤害、己方英雄生命+40。（lv15）
   强行捕猎(4费/法术)：对目标敌军造成160点伤害、己方英雄生命+36。（lv14）
   强行捕猎(4费/法术)：对目标敌军造成140点伤害、己方英雄生命+33。（lv13）
   强行捕猎(4费/法术)：对目标敌军造成120点伤害、己方英雄生命+30。（lv12）

28.旷野蛮族(4费/20/38)：回合结束:若本回合受到过伤害，则自身+7/+7，获得【磐龙】。（lv16）
   旷野蛮族(4费/18/35)：回合结束:若本回合受到过伤害，则自身+6/+6，获得【磐龙】。（lv15）
   旷野蛮族(4费/16/31)：回合结束:若本回合受到过伤害，则自身+6/+6，获得【磐龙】。（lv14）
   旷野蛮族(4费/15/29)：回合结束:若本回合受到过伤害，则自身+5/+5，获得【磐龙】。（lv13）
   旷野蛮族(4费/13/26)：回合结束:若本回合受到过伤害，则自身+5/+5，获得【磐龙】。（lv12）

29.复仇噬人花(4费/16/42)：回合结束：若本回合受到过伤害，则撕咬前方敌军或玩家。（lv16）
   复仇噬人花(4费/15/39)：回合结束：若本回合受到过伤害，则撕咬前方敌军或玩家。（lv15）
   复仇噬人花(4费/14/36)：回合结束：若本回合受到过伤害，则撕咬前方敌军或玩家。（lv14）
   复仇噬人花(4费/13/33)：回合结束：若本回合受到过伤害，则撕咬前方敌军或玩家。（lv13）
   复仇噬人花(4费/12/30)：回合结束：若本回合受到过伤害，则撕咬前方敌军或玩家。（lv12）

30.雪原野人(4费/32/32)：【迟缓】、【回命】、【洞察1】、场上有冰封则失去【迟缓】。（lv16）
   雪原野人(4费/29/29)：【迟缓】、【回命】、【洞察1】、场上有冰封则失去【迟缓】。（lv15）

31.鼓舞图腾(5费/0/70)：【洞察1】、回合开始:其他全体友军+3/+2，魔防+2。（lv16）
   鼓舞图腾(5费/0/60)：【洞察1】、回合开始:其他全体友军+3/+1，魔防+2。（lv15）
   鼓舞图腾(5费/0/50)：【洞察1】、回合开始:其他全体友军+3/+1，魔防+2。（lv14）
   鼓舞图腾(5费/0/45)：【洞察1】、回合开始:其他全体友军+3/+1，魔防+1。（lv13）
   鼓舞图腾(5费/0/40)：【洞察1】、回合开始:其他全体友军+3/+1，魔防+1。（lv12）

32.迷茫巨人(5费/35/55)：【洞察1】、【迟缓】、【魔防11】。（lv16）
   迷茫巨人(5费/32/50)：【洞察1】、【迟缓】、【魔防10】。（lv15）
   迷茫巨人(5费/30/45)：【洞察1】、【迟缓】、【魔防9】。（lv14）
   迷茫巨人(5费/27/42)：【洞察1】、【迟缓】、【魔防8】。（lv13）
   迷茫巨人(5费/25/40)：【迟缓】、【洞察1】、【魔防7】。（lv12）   



紫卡：

1.疯狂祭师(2费/22/8)：法力上限+1、死亡:英雄生命-8。（lv16）
  疯狂祭师(2费/20/7)：法力上限+1、死亡:英雄生命-7。（lv15）
  疯狂祭师(2费/19/6)：法力上限+1、死亡:英雄生命-7。（lv14）
  疯狂祭师(2费/18/5)：法力上限+1、死亡:英雄生命-7。（lv13）
  疯狂祭师(2费/16/5)：法力上限+1、死亡:英雄生命-6。（lv12）

2.无畏猎户(2费/15/24)：【洞察1】、命中英雄时:再攻击一次。（lv16）
  无畏猎户(2费/13/23)：【洞察1】、命中英雄时:再攻击一次。（lv15）
  无畏猎户(2费/12/20)：【洞察1】、命中英雄时:再攻击一次。（lv14）
  无畏猎户(2费/11/18)：【洞察1】、命中英雄时:再攻击一次。（lv13）
  无畏猎户(2费/10/16)：【洞察1】、命中英雄时:再攻击一次。（lv12）  

3.血蜥头领(2费/18/13)：英雄回复生命时:向敌方随机位置投掷长矛(等于攻击力)。（lv16）
  血蜥头领(2费/16/12)：英雄回复生命时:向敌方随机位置投掷长矛(等于攻击力)。（lv15）
  血蜥头领(2费/15/11)：英雄回复生命时:向敌方随机位置投掷长矛(等于攻击力)。（lv14）
  血蜥头领(2费/14/10)：英雄回复生命时:向敌方随机位置投掷长矛(等于攻击力)。（lv13）
  血蜥头领(2费/13/9)：英雄回复生命时:向敌方随机位置投掷长矛(等于攻击力)。（lv12）

4.暴怒野人(2费/17/24)：【践踏】、回合开始：每有1点剩余法力，自身+3/+3。（lv16）
  暴怒野人(2费/16/21)：【践踏】、回合开始：每有1点剩余法力，自身+2/+3。（lv15）
  暴怒野人(2费/14/19)：【践踏】、回合开始：每有1点剩余法力，自身+2/+3。（lv14）
  暴怒野人(2费/13/16)：【践踏】、回合开始：每有1点剩余法力，自身+2/+2。（lv13）
  暴怒野人(2费/11/15)：【践踏】、回合开始：每有1点剩余法力，自身+2/+2。（lv12）

5.诱敌草人(2费/0/45)：回合结束：若本回合受到过伤害，抽一张牌，英雄生命+13，【洞察1】。（lv16）
  诱敌草人(2费/0/39)：回合结束：若本回合受到过伤害，抽一张牌，英雄生命+12，【洞察1】。（lv15）
  诱敌草人(2费/0/33)：回合结束：若本回合受到过伤害，抽一张牌，英雄生命+11，【洞察1】。（lv14）
  诱敌草人(2费/0/28)：回合结束：若本回合受到过伤害，抽一张牌，英雄生命+10，【洞察1】。（lv13）
  诱敌草人(2费/0/24)：回合结束：若本回合受到过伤害，抽一张牌，英雄生命+9，【洞察1】。（lv12）

6.牛角图腾(2费/0/20)：登场:召唤雪域牦牛-lv16、回合开始:其他友军攻击+4。（lv16）
  牛角图腾(2费/0/18)：登场:召唤雪域牦牛-lv15、回合开始:其他友军攻击+3。（lv15）
  牛角图腾(2费/0/16)：登场:召唤雪域牦牛-lv14、回合开始:其他友军攻击+3。（lv14）
  牛角图腾(2费/0/15)：登场:召唤雪域牦牛-lv13、回合开始:其他友军攻击+3。（lv13）
  牛角图腾(2费/0/14)：登场:召唤雪域牦牛-lv12、回合开始:其他友军攻击+3。（lv12）

7.雪原狼女(2费/16/15)：命中英雄:召唤6/3草原狼-lv8、攻击前:场上有冰封，另一友军攻击+6。（lv16）
  雪原狼女(2费/15/13)：命中英雄:召唤5/3草原狼-lv7、攻击前:场上有冰封，另一友军攻击+6。（lv15）

8.狼月祭师(3费/23/19)：回合结束:召唤10/4草原狼-lv13。（lv16）
  狼月祭师(3费/20/18)：回合结束:召唤9/4草原狼-lv12。（lv15）
  狼月祭师(3费/18/17)：回合结束:召唤8/4草原狼-lv11。（lv14）
  狼月祭师(3费/17/15)：回合结束:召唤7/4草原狼-lv10。（lv13）
  狼月祭师(3费/15/14)：回合结束:召唤6/4草原狼-lv9。（lv12）

9.荒原智者(3费/15/20)：回合开始:所有迟缓友军+3/+10，随机另一友军+4/+4，失去迟缓。（lv16）
  荒原智者(3费/13/19)：回合开始:所有迟缓友军+3/+10，随机另一友军+3/+3，失去迟缓。（lv15）
  荒原智者(3费/11/18)：回合开始:所有迟缓友军+2/+10，随机另一友军+3/+3，失去迟缓。（lv14）
  荒原智者(3费/10/17)：回合开始:所有迟缓友军+2/+9，随机另一友军+2/+2，失去迟缓。（lv13）
  荒原智者(3费/9/15)：回合开始:所有迟缓友军+2/+8，随机另一友军+2/+2，失去迟缓。（lv12）

10.地洞巨獾(3费/16/32)：【回命】、英雄恢复生命时:自身+4/+4。（lv16）
   地洞巨獾(3费/14/30)：【回命】、英雄恢复生命时:自身+4/+4。（lv15）
   地洞巨獾(3费/13/26)：【回命】、英雄恢复生命时:自身+3/+4。（lv14）
   地洞巨獾(3费/11/24)：【回命】、英雄恢复生命时:自身+3/+4。（lv13）
   地洞巨獾(3费/10/22)：【回命】、英雄恢复生命时:自身+3/+3。（lv12）

11.肥鼠晚宴(3费/法术)：回合结束:召唤2个10/33贪食肥鼠-lv16、英雄生命+15。（lv16）
   肥鼠晚宴(3费/法术)：回合结束:召唤2个9/30贪食肥鼠-lv15、英雄生命+12。（lv15）
   肥鼠晚宴(3费/法术)：回合结束:召唤2个8/26贪食肥鼠-lv14、英雄生命+12。（lv14）
   肥鼠晚宴(3费/法术)：回合结束:召唤2个7/23贪食肥鼠-lv13、英雄生命+8。（lv13）
   肥鼠晚宴(3费/法术)：回合结束:召唤2个6/20贪食肥鼠-lv12、英雄生命+7。（lv12）

12.活力仙人掌(3费/9/60)：【守军】、【荆棘】、每当一个生物死亡:65%几率英雄生命+16。（lv16）
   活力仙人掌(3费/8/55)：【守军】、【荆棘】、每当一个生物死亡:65%几率英雄生命+15。（lv15）
   活力仙人掌(3费/7/52)：【守军】、【荆棘】、每当一个生物死亡:65%几率英雄生命+14。（lv14）
   活力仙人掌(3费/7/47)：【守军】、【荆棘】、每当一个生物死亡:65%几率英雄生命+13。（lv13）
   活力仙人掌(3费/6/45)：【守军】、【荆棘】、每当一个生物死亡:65%几率英雄生命+12。（lv12）

13.圣兽祭师(3费/20/26)：回合开始：相邻一个友军获得【践踏】1回合、攻击前：全体践踏友军+6/+5。（lv16）
   圣兽祭师(3费/18/24)：回合开始：相邻一个友军获得【践踏】1回合、攻击前：全体践踏友军+5/+5。（lv15）
   圣兽祭师(3费/16/21)：回合开始：相邻一个友军获得【践踏】1回合、攻击前：全体践踏友军+5/+5。（lv14）
   圣兽祭师(3费/15/17)：回合开始：相邻一个友军获得【践踏】1回合、攻击前：全体践踏友军+4/+5。（lv13）
   圣兽祭师(3费/13/15)：回合开始：相邻一个友军获得【践踏】1回合、攻击前：全体践踏友军+3/+5。（lv12）

14.象牙少女(4费/6/8)：【洞察1】、回合结束:召唤25/45长毛象-lv16。（lv16）
   象牙少女(4费/6/6)：【洞察1】、回合结束:召唤24/40长毛象-lv15。（lv15）
   象牙少女(4费/5/5)：【洞察1】、回合结束:召唤22/38长毛象-lv14。（lv14）
   象牙少女(4费/4/5)：【洞察1】、回合结束:召唤20/35长毛象-lv13。（lv13）
   象牙少女(4费/4/4)：【洞察1】、回合结束:召唤18/32长毛象-lv12。（lv12）

15.源力祭师(4费/22/36)：攻击前:每有1点法力，随机友军+3/+4。（lv16）
   源力祭师(4费/20/33)：攻击前:每有1点法力，随机友军+3/+3。（lv15）
   源力祭师(4费/18/30)：攻击前:每有1点法力，随机友军+3/+3。（lv14）
   源力祭师(4费/16/30)：攻击前:每有1点法力，随机友军+2/+3。（lv13）
   源力祭师(4费/15/24)：攻击前:每有1点法力，随机友军+2/+3。（lv12）

16.饥蛮巨汉(4费/20/50)：【迟缓】、【磐龙】、英雄恢复生命时:自身+10/+10。（lv16）
   饥蛮巨汉(4费/18/48)：【迟缓】、【磐龙】、英雄恢复生命时:自身+9/+9。（lv15）
   饥蛮巨汉(4费/17/42)：【迟缓】、【磐龙】、英雄恢复生命时:自身+9/+9。（lv14）
   饥蛮巨汉(4费/16/40)：【迟缓】、【磐龙】、英雄恢复生命时:自身+8/+8。（lv13）
   饥蛮巨汉(4费/15/35)：【迟缓】、【磐龙】、英雄恢复生命时:自身+8/+8。（lv12）

17.飞斧狂人(4费/18/33)：回合开始:向对面横排，投掷飞斧，65%几率，再投掷一次。（lv16）
   飞斧狂人(4费/15/33)：回合开始:向对面横排，投掷飞斧，65%几率，再投掷一次。（lv15）
   飞斧狂人(4费/13/30)：回合开始:向对面横排，投掷飞斧，65%几率，再投掷一次。（lv14）
   飞斧狂人(4费/11/29)：回合开始:向对面横排，投掷飞斧，65%几率，再投掷一次。（lv13）
   飞斧狂人(4费/10/26)：回合开始:向对面横排，投掷飞斧，65%几率，再投掷一次。（lv12）

18.霜矛骑士(4费/25/25)：【迟缓】、攻击前:向敌方随机位置投掷长矛、场上有冰封则失去【迟缓】。（lv16）
   霜矛骑士(4费/23/23)：【迟缓】、攻击前:向敌方随机位置投掷长矛、场上有冰封则失去【迟缓】。（lv15）
   霜矛骑士(4费/21/21)：【迟缓】、攻击前:向敌方随机位置投掷长矛、场上有冰封则失去【迟缓】。（lv14）
   霜矛骑士(4费/19/19)：【迟缓】、攻击前:向敌方随机位置投掷长矛、场上有冰封则失去【迟缓】。（lv13）
   霜矛骑士(4费/17/17)：【迟缓】、攻击前:向敌方随机位置投掷长矛、场上有冰封则失去【迟缓】。（lv15）

19.愤怒狂战士(4费/20/42)：回合结束:若本回合受到过伤害，攻击+20、攻击高于30:获得【磐龙】。（lv16）
   愤怒狂战士(4费/18/40)：回合结束:若本回合受到过伤害，攻击+18、攻击高于30:获得【磐龙】。（lv15）

20.石斧头领(5费/25/35)：【践踏】、登场:相邻随机友军+10/+10并获得【践踏】。（lv16）
   石斧头领(5费/22/30)：【践踏】、登场:相邻随机友军+10/+10并获得【践踏】。（lv15）
   石斧头领(5费/20/27)：【践踏】、登场:相邻随机友军+9/+9并获得【践踏】。（lv14）
   石斧头领(5费/18/25)：【践踏】、登场:相邻随机友军+8/+8并获得【践踏】。（lv13）
   石斧头领(5费/16/22)：【践踏】、登场:相邻随机友军+7/+7并获得【践踏】。（lv12）

21.飞斧女豪(5费/20/45)：回合开始、攻击前、死亡:向敌方横排投掷飞斧(20点伤害)。（lv16）
   飞斧女豪(5费/18/42)：回合开始、攻击前、死亡:向敌方横排投掷飞斧(18点伤害)。（lv15）
   飞斧女豪(5费/16/40)：回合开始、攻击前、死亡:向敌方横排投掷飞斧(16点伤害)。（lv14）
   飞斧女豪(5费/14/38)：回合开始、攻击前、死亡:向敌方横排投掷飞斧(14点伤害)。（lv13）
   飞斧女豪(5费/12/36)：回合开始、攻击前、死亡:向敌方横排投掷飞斧(12点伤害)。（lv12）   

22.坚毅大祭司(5费/26/55)：【磐龙】、回合结束：若本回合受到过伤害，全体友军+4/+5。（lv16）
   坚毅大祭司(5费/25/50)：【磐龙】、回合结束：若本回合受到过伤害，全体友军+4/+4。（lv15）
   坚毅大祭司(5费/23/45)：【磐龙】、回合结束：若本回合受到过伤害，全体友军+4/+4。（lv14）
   坚毅大祭司(5费/22/40)：【磐龙】、回合结束：若本回合受到过伤害，全体友军+3/+4。（lv13）
   坚毅大祭司(5费/20/33)：【磐龙】、回合结束：若本回合受到过伤害，全体友军+3/+4。（lv12）

23.荒原牛头怪(6费/35/50)：回合结束:若本回合受到伤害，则自身得+8/+20，获得【践踏】。（lv16）
   荒原牛头怪(6费/33/45)：回合结束:若本回合受到伤害，则自身得+7/+20，获得【践踏】。（lv15）
   荒原牛头怪(6费/30/42)：回合结束:若本回合受到伤害，则自身得+7/+17，获得【践踏】。（lv14）
   荒原牛头怪(6费/27/39)：回合结束:若本回合受到伤害，则自身得+6/+16，获得【践踏】。（lv13）
   荒原牛头怪(6费/25/35)：回合结束:若本回合受到伤害，则自身得+5/+15，获得【践踏】。（lv12）

24.杂斑野猪王(6费/33/33)：登场:召唤13/13斑毛幼猪-lv16、死亡:英雄生命+60。（lv16）
   杂斑野猪王(6费/30/30)：登场:召唤12/12斑毛幼猪-lv15、死亡:英雄生命+50。（lv15）
   杂斑野猪王(6费/26/26)：登场:召唤11/11斑毛幼猪-lv14、死亡:英雄生命+50。（lv14）
   杂斑野猪王(6费/23/23)：登场:召唤10/10斑毛幼猪-lv13、死亡:英雄生命+45。（lv13）
   杂斑野猪王(6费/21/21)：登场:召唤8/8斑毛幼猪-lv12、死亡:英雄生命+40。（lv12）

25.大嘴酋长(6费/33/33)：【回命】、攻击前:召唤8/8蛮石血蜥-lv12。（lv16）
   大嘴酋长(6费/30/30)：【回命】、攻击前:召唤7/7蛮石血蜥-lv11。（lv15）
   大嘴酋长(6费/28/28)：【回命】、攻击前:召唤6/6蛮石血蜥-lv10。（lv14）
   大嘴酋长(6费/25/25)：【回命】、攻击前:召唤5/5蛮石血蜥-lv9。（lv13）
   大嘴酋长(6费/23/23)：【回命】、攻击前:召唤4/4蛮石血蜥-lv8。（lv12）

26.源力苏醒(6费/法术)：目标单位+33/+33，获得【磐龙】、另一友军+10/+10并获得【磐龙】。（lv16）
   源力苏醒(6费/法术)：目标单位+30/+30，获得【磐龙】、另一友军+9/+9并获得【磐龙】。（lv15）
   源力苏醒(6费/法术)：目标单位+28/+28，获得【磐龙】、另一友军+8/+8并获得【磐龙】。（lv14）
   源力苏醒(6费/法术)：目标单位+26/+26，获得【磐龙】、另一友军+7/+7并获得【磐龙】。（lv13）
   源力苏醒(6费/法术)：目标单位+24/+24，获得【磐龙】、另一友军+6/+6获得【磐龙】。（lv12）

27.蛮石独眼巨人(7费/33/90)：【迟缓】、登场、攻击前:向敌方横排投掷巨石，33点伤害。（lv16）
   蛮石独眼巨人(7费/30/80)：【迟缓】、登场、攻击前:向敌方横排投掷巨石，30点伤害。（lv15）
   蛮石独眼巨人(7费/27/70)：【迟缓】、登场、攻击前:向敌方横排投掷巨石，27点伤害。（lv14）
   蛮石独眼巨人(7费/24/65)：【迟缓】、登场、攻击前:向敌方横排投掷巨石，24点伤害。（lv13）
   蛮石独眼巨人(7费/22/55)：【迟缓】、登场、攻击前:向敌方横排投掷巨石，22点伤害。（lv12）

28.贪食白龙(8费/30/80)：登场、英雄获得生命:喷吐7个火球到敌方随机区域，各9点伤害。（lv16）
   贪食白龙(8费/28/75)：登场、英雄获得生命:喷吐7个火球到敌方随机区域，各8点伤害。（lv15）
   贪食白龙(8费/25/70)：登场、英雄获得生命:喷吐7个火球到敌方随机区域，各7点伤害。（lv14）
   贪食白龙(8费/24/66)：登场、英雄获得生命:喷吐7个火球到敌方随机区域，各6点伤害。（lv13）
   贪食白龙(8费/22/60)：登场、英雄获得生命:喷吐7个火球到敌方随机区域，各6点伤害。（lv12）

29.传记·野蛮花园(2费/传记)：回合结束:召唤噬人花-lv16、获得【传记·伤痛记忆】。（lv16）
   传记·野蛮花园(2费/传记)：回合结束:召唤噬人花-lv15、获得【传记·伤痛记忆】。（lv15）

30.传记·伤痛记忆(1费/传记)：随机友军+14/-1，获得【践踏】和【盘龙】。（lv16）
   传记·伤痛记忆(1费/传记)：随机友军+13/-1，获得【践踏】和【盘龙】。（lv15）


橙卡：

1.鸵鸟王·霍利(3费/25/49)：【迟缓】、具有迟缓的其他友军，失去迟缓、命中英雄:另一友军+15/+15，无友军:抓一张牌。（lv16）
  鸵鸟王·霍利(3费/24/40)：【迟缓】、具有迟缓的其他友军，失去迟缓、命中英雄:另一友军+15/+15，无友军:抓一张牌。（lv15）
  鸵鸟王·霍利(3费/22/35)：【迟缓】、具有迟缓的其他友军，失去迟缓、命中英雄:另一友军+15/+15，无友军:抓一张牌。（lv14）
  鸵鸟王·霍利(3费/20/30)：【迟缓】、具有迟缓的其他友军，失去迟缓、命中英雄:另一友军+15/+15，无友军:抓一张牌。（lv13）
  鸵鸟王·霍利(3费/18/26)：【迟缓】、具有迟缓的其他友军，失去迟缓、命中英雄:另一友军+13/+13，无友军:抓一张牌。（lv12）

2.旷野游侠·大羽(3费/16/24)：【践踏】、登场、命中时:射击敌方随机区域、回合结束:66.6%几率射击。（lv16）
  旷野游侠·大羽(3费/15/20)：【践踏】、登场、命中时:射击敌方随机区域、回合结束:65%几率射击。（lv15）
  旷野游侠·大羽(3费/13/20)：【践踏】、登场、命中时:射击敌方随机区域、回合结束:60%几率射击。（lv14）
  旷野游侠·大羽(3费/12/18)：【践踏】、登场、命中时:射击敌方随机区域、回合结束:60%几率射击。（lv13）
  旷野游侠·大羽(3费/11/17)：【践踏】、登场、命中时:射击敌方随机区域、回合结束:55%几率射击。（lv12）

3.比尔&比利(4费/36/36)：【践踏】、【迟缓】、【魔防14】、有践踏友军在场，他失去【迟缓】；有迟缓友军在场，他获得【磐龙】。（lv16）
  比尔&比利(4费/32/32)：【践踏】、【迟缓】、【魔防13】、有践踏友军在场，他失去【迟缓】；有迟缓友军在场，他获得【磐龙】。（lv15）
  比尔&比利(4费/29/29)：【践踏】、【迟缓】、【魔防12】、有践踏友军在场，他失去【迟缓】；有迟缓友军在场，他获得【磐龙】。（lv14）
  比尔&比利(4费/26/26)：【践踏】、【迟缓】、【魔防11】、有践踏友军在场，他失去【迟缓】；有迟缓友军在场，他获得【磐龙】。（lv13）
  比尔&比利(4费/22/22)：【践踏】、【迟缓】、【魔防10】、有践踏友军在场，他失去【迟缓】；有迟缓友军在场，他获得【磐龙】。（lv12）

4.血饮烈斧·凯(5费/23/45)：回合开始:其他所有友军本回合获得【回命】、英雄恢复生命:自身+9/+9、获得【践踏】。（lv16）
  血饮烈斧·凯(5费/21/40)：回合开始:其他所有友军本回合获得【回命】、英雄恢复生命:自身+8/+8、获得【践踏】。（lv15）
  血饮烈斧·凯(5费/19/36)：回合开始:其他所有友军本回合获得【回命】、英雄恢复生命:自身+7/+7、获得【践踏】。（lv14）
  血饮烈斧·凯(5费/17/32)：回合开始:其他所有友军本回合获得【回命】、英雄恢复生命:自身+6/+6、获得【践踏】。（lv13）
  血饮烈斧·凯(5费/15/29)：回合开始:其他所有友军本回合获得【回命】、英雄恢复生命:自身+6/+6、获得【践踏】。（lv12）

5.蛮古撼地兽(6费/40/100)：【迟缓】、【践踏】、【魔防40】、登场:其他迟缓、践踏友军获得生命+24，并获得【磐龙】。（lv16）
  蛮古撼地兽(6费/40/90)：【迟缓】、【践踏】、【魔防40】、登场:其他迟缓、践踏友军获得生命+20，并获得【磐龙】。（lv15）
  蛮古撼地兽(6费/40/80)：【迟缓】、【践踏】、【魔防40】、登场:其他迟缓、践踏友军获得生命+18，并获得【磐龙】。（lv15）
  蛮古撼地兽(6费/35/75)：【迟缓】、【践踏】、【魔防35】、登场:其他迟缓、践踏友军获得生命+15，并获得【磐龙】。（lv14）
  蛮古撼地兽(6费/35/65)：【迟缓】、【践踏】、【魔防30】、登场:其他迟缓、践踏友军获得生命+13，并获得【磐龙】。（lv13）
  蛮古撼地兽(6费/25/60)：【迟缓】、【践踏】、【魔防25】、登场：其他迟缓、践踏友军获得生命+12，并获得【磐龙】。（lv12）

6.原野大祭师·鲁玛(7费/22/80)：登场:另一友军+22/22，获得【践踏】、回合结束:另一友军+10/+10，获得【践踏】。（lv16）
  原野大祭师·鲁玛(7费/20/70)：登场:另一友军+20/20，获得【践踏】、回合结束:另一友军+9/+9，获得【践踏】。（lv15）
  原野大祭师·鲁玛(7费/18/64)：登场:另一友军+18/18，获得【践踏】、回合结束:另一友军+8/+8，获得【践踏】。（lv14）
  原野大祭师·鲁玛(7费/16/60)：登场:另一友军+16/16，获得【践踏】、回合结束:另一友军+7/+7，获得【践踏】。（lv13）
  原野大祭师·鲁玛(7费/15/50)：登场:另一友军+15/15，获得【践踏】、回合结束:另一友军+6/+6，获得【践踏】。（lv12）

7.荒原暴君·血眼(8费/45/70)：【践踏】、【连击】、【磐龙】、【魂歌】、登场若有冰封:获得【回命】2回合。（lv16）
  荒原暴君·血眼(8费/40/65)：【践踏】、【连击】、【磐龙】、【魂歌】、登场若有冰封:获得【回命】2回合。（lv15）
  荒原暴君·血眼(8费/35/60)：【践踏】、【连击】、【磐龙】、【魂歌】、登场若有冰封:获得【回命】2回合。（lv14）
  荒原暴君·血眼(8费/33/50)：【践踏】、【连击】、【磐龙】、【魂歌】、登场若有冰封:获得【回命】2回合。（lv13）
  荒原暴君·血眼(8费/30/45)：【践踏】、【连击】、【磐龙】、【魂歌】、登场若有冰封:获得【回命】2回合。（lv12）

8.炎阳巨龙(9费/90/90)：登场:焚烧全体敌军13点伤害、攻击前:烈焰吐息横排敌军20点伤害。（lv16）
  炎阳巨龙(9费/80/80)：登场:焚烧全体敌军12点伤害、攻击前:烈焰吐息横排敌军20点伤害。（lv15）
  炎阳巨龙(9费/75/75)：登场:焚烧全体敌军10点伤害、攻击前:烈焰吐息横排敌军18点伤害。（lv14）
  炎阳巨龙(9费/66/66)：登场:焚烧全体敌军10点伤害、攻击前:烈焰吐息横排敌军16点伤害。（lv13）
  炎阳巨龙(9费/60/60)：登场:焚烧全体敌军9点伤害、攻击前:烈焰吐息横排敌军15点伤害。（lv12）
  


*/