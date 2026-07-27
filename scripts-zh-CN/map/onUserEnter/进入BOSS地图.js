
function start(ms) {
	
	var em = ms.getClient().getEventManager("boss");
	var mapId = ms.getPlayer().getMapId();
	var data = em.getProperty("boss");
	var mapData = JSON.parse(data).filter(item => item.map == mapId);
	
	if(mapData){
		for(let i=0;i < mapData.length; i++){
			var nextTime = em.getProperty(`resetTime${mapId}${mapData[i].id}`);
			if(nextTime){
				if(ms.getItemQuantity(5340100)){
					if( !em.getChannelServer().getMapFactory().getMap(mapId).getMonsterById(mapData[i].id) ){
						ms.message(`[探测器] 本图首领复活时间【${formatTime(nextTime,"HH:mm:ss")}】`)
					}
				}
			}
		}
	}
}

function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
  // 解析时间为 Date 对象（兼容字符串/Date对象）
  const date = typeof time === 'string' 
    ? new Date(time.replace(/-/g, '/')) // 兼容 IE 解析 "2025-12-08" 格式
    : new Date(time);

  // 补零函数：确保单个数字（如 8 → 08，1 → 01）
  const pad = (num) => num.toString().padStart(2, '0');

  // 提取时间各部分
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 月份从 0 开始，需 +1
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  // 替换占位符
  return format.replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}