package singleInheritance;

//Base class Vehicle
class Vehicle {
 String brand;
 String model;
 int speed;  // Speed in km/h

 // Constructor for Vehicle
 public Vehicle(String brand, String model, int speed) {
     this.brand = brand;
     this.model = model;
     this.speed = speed;
 }

 // Method to display vehicle details
 public void displayDetails() {
     System.out.println("Brand: " + brand + ", Model: " + model + ", Speed: " + speed + " km/h");
 }

 // Method to simulate vehicle running
 public void run() {
     System.out.println(brand + " " + model + " is running at " + speed + " km/h.");
 }
}

//Subclass Car inherits from Vehicle
class Car extends Vehicle {
 int doors;  // Number of doors

 // Constructor for Car
 public Car(String brand, String model, int speed, int doors) {
     super(brand, model, speed);  // Call superclass constructor
     this.doors = doors;
 }

 // Overriding run method for Car
 @Override
 public void run() {
     System.out.println(brand + " " + model + " (Car) is running at " + speed + " km/h with " + doors + " doors.");
 }
}

//Subclass ElectricCar inherits from Car
class ElectricCar extends Car {
 int batteryCapacity;  // Battery capacity in kWh

 // Constructor for ElectricCar
 public ElectricCar(String brand, String model, int speed, int doors, int batteryCapacity) {
     super(brand, model, speed, doors);  // Call superclass constructor
     this.batteryCapacity = batteryCapacity;
 }

 // Overriding run method for ElectricCar
 @Override
 public void run() {
     System.out.println(brand + " " + model + " (Electric Car) is running at " + speed + " km/h with " + doors + " doors and " +
                        batteryCapacity + " kWh battery.");
 }
}

//Subclass Bike inherits from Vehicle
class Bike extends Vehicle {
 int wheels;  // Number of wheels

 // Constructor for Bike
 public Bike(String brand, String model, int speed, int wheels) {
     super(brand, model, speed);  // Call superclass constructor
     this.wheels = wheels;
 }

 // Overriding run method for Bike
 @Override
 public void run() {
     System.out.println(brand + " " + model + " (Bike) is running at " + speed + " km/h with " + wheels + " wheels.");
 }
}

//Subclass TypesOfBike inherits from Bike
class TypesOfBike extends Bike {
 String bikeType;  // Type of bike (e.g., Mountain, Racing, etc.)

 // Constructor for TypesOfBike
 public TypesOfBike(String brand, String model, int speed, int wheels, String bikeType) {
     super(brand, model, speed, wheels);  // Call superclass constructor
     this.bikeType = bikeType;
 }

 // Overriding run method for TypesOfBike
 @Override
 public void run() {
     System.out.println(brand + " " + model + " (Type: " + bikeType + ") is running at " + speed + " km/h with " + wheels + " wheels.");
 }
}

//Main class to test the inheritance
public class multiLevelInheritance {
 public static void main(String[] args) {
     // Create objects of ElectricCar, Car, and TypesOfBike
     ElectricCar electricCar = new ElectricCar("Tesla", "Model S", 250, 4, 100);
     Car car = new Car("Toyota", "Corolla", 180, 4);
     TypesOfBike mountainBike = new TypesOfBike("Trek", "Marlin 7", 30, 2, "Mountain");

     // Display details and run the electric car
     electricCar.displayDetails();
     electricCar.run();

     // Display details and run the car
     car.displayDetails();
     car.run();

     // Display details and run the bike
     mountainBike.displayDetails();
     mountainBike.run();
 }
}
