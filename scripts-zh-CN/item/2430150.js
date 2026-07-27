
//淬炼水礼包发错了。纠正
function start() {
	if(im.getItemQuantity(2430150) && im.canHold(4033007,1) ){
		im.gainItem(4033007)
		im.gainItem(2430150,-1);
	}
}
