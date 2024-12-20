package com.playercrud;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        Player player = new Player(0, "John Doe", "Batsman", 5, "India", 85.5);
        PlayerOperations playerOps = new Player();

        // Create a player
        playerOps.createPlayer(player);

        // Read a player by ID
        Player readPlayer = playerOps.readPlayer(1);
        readPlayer.printDetails();

        // Update a player
        readPlayer.name = "John Smith";
        playerOps.updatePlayer(readPlayer);

        // Delete a player
        playerOps.deletePlayer(1);

        // List players by skill
        List<Player> batsmen = playerOps.getPlayersBySkill("Batsman");
        for (Player p : batsmen) {
            p.printDetails();
        }

        // List players by experience
        List<Player> experiencedPlayers = playerOps.getPlayersByExperience();
        for (Player p : experiencedPlayers) {
            p.printDetails();
        }
    }
}
