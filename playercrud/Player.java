package com.playercrud;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Player extends AbstractPlayer implements PlayerOperations {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/player_db";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "Admin1234";

    // No-argument constructor
    public Player() {
        // Set default values for a new player
        this.id = 0;
        this.name = "";
        this.skill = "";
        this.exp = 0;
        this.country = "";
        this.overallScore = 0.0;
    }

    // Parameterized constructor
    public Player(int id, String name, String skill, int exp, String country, double overallScore) {
        this.id = id;
        this.name = name;
        this.skill = skill;
        this.exp = exp;
        this.country = country;
        this.overallScore = overallScore;
    }

    @Override
    public void createPlayer(Player player) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "INSERT INTO players (name, skill, exp, country, overall_score) VALUES (?, ?, ?, ?, ?)";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, player.name);
                stmt.setString(2, player.skill);
                stmt.setInt(3, player.exp);
                stmt.setString(4, player.country);
                stmt.setDouble(5, player.overallScore);
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Player readPlayer(int id) {
        Player player = null;
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "SELECT * FROM players WHERE id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, id);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        player = new Player(
                                rs.getInt("id"),
                                rs.getString("name"),
                                rs.getString("skill"),
                                rs.getInt("exp"),
                                rs.getString("country"),
                                rs.getDouble("overall_score")
                        );
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return player;
    }

    @Override
    public void updatePlayer(Player player) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "UPDATE players SET name = ?, skill = ?, exp = ?, country = ?, overall_score = ? WHERE id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, player.name);
                stmt.setString(2, player.skill);
                stmt.setInt(3, player.exp);
                stmt.setString(4, player.country);
                stmt.setDouble(5, player.overallScore);
                stmt.setInt(6, player.id);
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deletePlayer(int id) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "DELETE FROM players WHERE id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, id);
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Player> getPlayersBySkill(String skill) {
        List<Player> players = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "SELECT * FROM players WHERE skill = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, skill);
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        players.add(new Player(
                                rs.getInt("id"),
                                rs.getString("name"),
                                rs.getString("skill"),
                                rs.getInt("exp"),
                                rs.getString("country"),
                                rs.getDouble("overall_score")
                        ));
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return players;
    }

    @Override
    public List<Player> getPlayersByCountry(String country) {
        List<Player> players = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "SELECT * FROM players WHERE country = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, country);
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        players.add(new Player(
                                rs.getInt("id"),
                                rs.getString("name"),
                                rs.getString("skill"),
                                rs.getInt("exp"),
                                rs.getString("country"),
                                rs.getDouble("overall_score")
                        ));
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return players;
    }

    @Override
    public List<Player> getPlayersByExperience() {
        List<Player> players = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "SELECT * FROM players ORDER BY exp DESC";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        players.add(new Player(
                                rs.getInt("id"),
                                rs.getString("name"),
                                rs.getString("skill"),
                                rs.getInt("exp"),
                                rs.getString("country"),
                                rs.getDouble("overall_score")
                        ));
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return players;
    }

    @Override
    public void printDetails() {
        System.out.println("Player ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Skill: " + skill);
        System.out.println("Experience: " + exp + " years");
        System.out.println("Country: " + country);
        System.out.println("Overall Score: " + overallScore);
    }
}
