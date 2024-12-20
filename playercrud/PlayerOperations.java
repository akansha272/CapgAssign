package com.playercrud;

import java.util.List;

public interface PlayerOperations {
    void createPlayer(Player player);
    Player readPlayer(int id);
    void updatePlayer(Player player);
    void deletePlayer(int id);
    List<Player> getPlayersBySkill(String skill);
    List<Player> getPlayersByCountry(String country);
    List<Player> getPlayersByExperience();
}
