
package org.gms.client.command.commands.gm2;

import org.gms.client.Character;
import org.gms.client.Client;
import org.gms.client.Job;
import org.gms.client.Skill;
import org.gms.client.SkillFactory;
import org.gms.client.command.Command;
import org.gms.provider.Data;
import org.gms.provider.DataProviderFactory;
import org.gms.provider.wz.WZFiles;
import org.gms.util.I18nUtil;
public class MaxMonsterBookCommand extends Command {
    {
        setDescription("Max Monster Book.");
    }
 
    @Override
    public void execute(Client c, String[] params) {
 
        for (int i = 2380000; i <= 2380019; i++) {
            for (int y = 0; y < 5; y++) {
                c.getPlayer().getMonsterBook().addCard(c, i);
            }
        }
        for (int i = 2381000; i <= 2381083; i++) {
            for (int y = 0; y < 5; y++) {
                c.getPlayer().getMonsterBook().addCard(c, i);
            }
        }
        for (int i = 2382000; i <= 2382096; i++) {
            for (int y = 0; y < 5; y++) {
                c.getPlayer().getMonsterBook().addCard(c, i);
            }
        }
        for (int i = 2383000; i <= 2383059; i++) {
            for (int y = 0; y < 5; y++) {
                c.getPlayer().getMonsterBook().addCard(c, i);
            }
        }
        for (int i = 2384000; i <= 2384040; i++) {
            for (int y = 0; y < 5; y++) {
                c.getPlayer().getMonsterBook().addCard(c, i);
            }
        }
        for (int i = 2385000; i <= 2385025; i++) {
            for (int y = 0; y < 5; y++) {
                c.getPlayer().getMonsterBook().addCard(c, i);
            }
        }
        for (int i = 2386000; i <= 2386024; i++) {
            for (int y = 0; y < 5; y++) {
                c.getPlayer().getMonsterBook().addCard(c, i);
            }
        }
        for (int i = 2387000; i <= 2387013; i++) {
            for (int y = 0; y < 5; y++) {
                c.getPlayer().getMonsterBook().addCard(c, i);
            }
        }
        for (int i = 2388000; i <= 2388070; i++) {
            for (int y = 0; y < 5; y++) {
                c.getPlayer().getMonsterBook().addCard(c, i);
            }
        }
    }
}