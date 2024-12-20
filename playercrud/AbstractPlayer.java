package com.playercrud;

public abstract class AbstractPlayer {
    protected int id;
    protected String name;
    protected String skill;
    protected int exp;
    protected String country;
    protected double overallScore;

    // Abstract methods (optional)
    public abstract void printDetails();
}
