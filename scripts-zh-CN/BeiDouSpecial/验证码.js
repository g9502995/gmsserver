
var status;

//验证码数据
var code = [1822,1985,2357,2985,3649,3768,3817,4311,4362,4564,4875,4953,5514,5841,5897,6137,6567,7381,7767,8227,8361,9178,9292,9472,9841];

//生成展示效验验证码数据，第一个为正确的
var data = [];

var msgText = "疑似使用作弊程序，已被巡查机器人逮捕！"

var cache = [];


const GameConfig = Java.type('org.gms.config.GameConfig');

function start() {
    status = -1;
    captcha_pass_money = GameConfig.getServerInt('captcha_pass_money');
    captcha_pass_points = GameConfig.getServerInt('captcha_pass_points');
    captcha_pass_voucher = GameConfig.getServerInt('captcha_pass_voucher');
    
    action(1, 0, 0);
}

function action(mode, type, selection) {

	// cm.message(`mode : ${mode}，type : ${type}，selection : ${selection}`);

    if (mode == -1) {
		cm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	
	if(status == 0){

		cache = cm.getPlayer().getData("验证码");
		if(cache){
			cache = JSON.parse(cache);
		}

		

		data = getRandom(code , 4);

		var text = "\r\n\t请你在30秒内做出选择，请问图中的数字是什么？\r\n\t结束会话或选择错误，我将带你去某个地方！\r\n\r\n";

		text += `\t#i404${data[0]}#\r\n\r\n`;

		text += "#b";

		var sortData = shuffleArray(data);
		sortData.forEach((v)=>{
			text += `#L${v}#${v}#l\t\t\t`;
		})

		text += "　\r\n"

		cm.sendSimple(text);

	}else{

		if(selection == -1){
			//点结束了
			movePlayer(cache);
			
		}else{
			//选择了

			if(data[0] == selection){


				
				cm.sendOk("恭喜，你通过的我的测试！");

				cache[1] = 1;
				cache[2] = formatTime();
				cm.getPlayer().saveData("验证码",JSON.stringify(cache));
				cm.getPlayer().serverMessage("受到了巡查机器人的特殊关爱！");
				if(captcha_pass_money)cm.gainMeso(captcha_pass_money);
				if(captcha_pass_points)cm.gainCash(captcha_pass_points);
				if(captcha_pass_voucher)cm.gainCash(2,captcha_pass_voucher);

			}else{
				movePlayer(cache);
				
			}
			
		}
		cm.dispose();
	}

}


//移动角色到牢房
function movePlayer(cache) {

	var limitTime = 10; //关入牢房N分钟
	var mapId = 300000012; //牢房地图Id


	//公告提示
	cm.getPlayer().serverMessage(`${cm.getPlayer().getName()} ${msgText}`);
	
	//如果不是在牢房中被重复惩罚时，记录原地图，为了释放时回归原图
	if(cm.getPlayer().getMapId() !== mapId){
		cm.getPlayer().saveLocation("JAIL");
	}

	//移入牢房
	cm.getPlayer().changeMap(mapId);

	//设置释放时间
	cm.getPlayer().addJailExpirationTime(limitTime * 60 * 1000);
	
	//记录抓起来的时间
	if(cache){
		cache = [cache[0], 2, cache[2] + limitTime];
	}else{
		cache = [formatTime(), 2, limitTime];
	}
	cm.getPlayer().saveData("验证码",JSON.stringify(cache));
	
}


/**
 * 从数据中得到N个不重复的元素
 * @Desc   无
 * @Author Ming
 * @Date   2026-01-09
 * @param  {[type]}   传入数组
 * @param  {[type]}   得到几个
 * @return {[type]}
 */
function getRandom(arr, count) {
    if (count >= arr.length)return [...arr];
    if (count <= 0) return [];
 
    const arrCopy = [...arr];
    const result = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * arrCopy.length);
        const randomElement = arrCopy.splice(randomIndex, 1)[0];
        result.push(randomElement);
    }
    return result;
}


/**
 * 对数组进行随机排序（Fisher-Yates 洗牌算法）
 * @param {Array} arr - 目标数组
 * @returns {Array} 随机排序后的新数组（不修改原数组）
 */
function shuffleArray(arr) {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[randomIndex]] = [newArr[randomIndex], newArr[i]];
    }
    return newArr;
}

/**
 * 格式化本地时间
 * @param {Date} date - 要格式化的Date对象（默认当前时间）
 * @param {string} format - 格式字符串（如 'YYYY-MM-DD HH:mm:ss'）
 * @returns {string} 格式化后的时间
 */
function formatTime(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零：01-12
  const day = String(date.getDate()).padStart(2, '0'); // 补零：01-31
  const hours = String(date.getHours()).padStart(2, '0'); // 补零：00-23
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 补零：00-59
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 补零：00-59

  // 替换格式字符串中的占位符
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}