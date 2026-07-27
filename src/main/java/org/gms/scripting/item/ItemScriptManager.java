/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation version 3 as published by
the Free Software Foundation. You may not use, modify or distribute
this program under any other version of the GNU Affero General Public
License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package org.gms.scripting.item;

import org.gms.client.Client;
import org.gms.scripting.npc.NPCScriptManager;
import org.gms.server.ItemInformationProvider.ScriptedItem;

import java.io.File;

public class ItemScriptManager {

    private static final ItemScriptManager instance = new ItemScriptManager();

    public static ItemScriptManager getInstance() {
        return instance;
    }

    public void runItemScript(Client c, ScriptedItem scriptItem) {
        NPCScriptManager.getInstance().start(c, scriptItem, null);
    }
	
	public void runItemScript(Client c, int itemId, ScriptedItem scriptItem) {
		String pad8 = String.format("%08d", itemId); // 02430033
		String raw = Integer.toString(itemId); // 2430033

		// 兼容两种命名：02430033.js / 2430033.js / item_02430033.js / item_2430033.js
		String[] candidates = { pad8, raw, "item" + pad8, "item" + raw };

		for (String name : candidates) {
			if (itemScriptExists(name)) {
			// 这里调用的是我们第3步要加到 NPCScriptManager 的方法
			NPCScriptManager.getInstance().startItemScript(c, itemId, scriptItem, name, null);
			return;
			}
		}
		
		if(c.getPlayer().isGM()){
			c.getPlayer().message("itemId :" + itemId + " script : " + scriptItem.getScript() + " npc : " + scriptItem.getNpc());
		}
		// fallback：走 MHL 指定脚本
		NPCScriptManager.getInstance().start(c, scriptItem, itemId, null);
	}
	
	
	private boolean itemScriptExists(String name) {
		// 兼容两种运行工作目录：
		// A) 从项目根目录启动（BeiDou-Server-master）
		// B) 从 gms-server 目录启动
		String[] dirs = {
			"gms-server/scripts-zh-CN/item/",
			"scripts-zh-CN/item/",
			"gms-server/scripts/item/",
			"scripts/item/"
		};

		for (String d : dirs) {
			if (new File(d + name + ".js").exists()) {
				return true;
			}
		}
		return false;
	}
	
}