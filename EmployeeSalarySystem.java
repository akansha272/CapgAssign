package empsalarysystem;

public class EmployeeSalarySystem {
	
	
	static final double PERK_RATE = 0.10;
	static final double TAX_PERCENTAGE = 0.15;
	
	
	private String employeeName;
	private String employeeDepartment;
	private double baseSalary;
	private double houseRentAllowance;
	private double travelAllowance;
	private double dearnessAllowance;
	private double employeePerks;
	
	public EmployeeSalarySystem(String employeeName, String employeeDepartment, double baseSalary) {
		this.employeeName = employeeName;
		this.employeeDepartment = employeeDepartment;
		this.baseSalary = baseSalary;
		this.houseRentAllowance = calculateHouseRentAllowance();
		this.travelAllowance = calculateTravelAllowance();
		this.dearnessAllowance = calculateDearnessAllowance();
		this.employeePerks = calculatePerks();
	}
	
	public double calculateHouseRentAllowance() {
		return 0.20 * baseSalary;
	}
	
	public double calculateTravelAllowance() {
		return 0.15 * baseSalary;
	}
	
	public double calculateDearnessAllowance() {
		return 0.10 * baseSalary;
	}
	
	
	public double calculatePerks() {
		return baseSalary * PERK_RATE;
	}
	
	public double calculateGrossSalary() {
		return baseSalary + houseRentAllowance + travelAllowance + dearnessAllowance + employeePerks;
	}
	
	// Static method to calculate company-wide deductions (e.g., Tax)
	public static double calculateTax(double grossSalary) {
		return grossSalary * TAX_PERCENTAGE; // Company-wide tax rate
	}
	
	// Instance method to calculate the net salary (after tax deduction)
	public double calculateNetSalary() {
		double grossSalary = calculateGrossSalary();
		double tax = calculateTax(grossSalary); // Static method for tax calculation
		return grossSalary - tax; // Net salary after tax
	}
	
	public void displaySalaryDetails() {
		System.out.println("Employee Name: " + employeeName);
		System.out.println("Department: " + employeeDepartment);
		System.out.println("Base Salary: " + baseSalary);
		System.out.println("House Rent Allowance (HRA): " + houseRentAllowance);
		System.out.println("Travel Allowance (TA): " + travelAllowance);
		System.out.println("Dearness Allowance (DA): " + dearnessAllowance);
		System.out.println("Perks: " + employeePerks);
		System.out.println("Gross Salary: " + calculateGrossSalary());
		System.out.println("Tax Deduction: " + calculateTax(calculateGrossSalary()));
		System.out.println("Net Salary: " + calculateNetSalary());
	}
	
	public static void main(String[] args) {
		EmployeeSalarySystem employee1 = new EmployeeSalarySystem("John Doe", "IT", 50000);
		EmployeeSalarySystem employee2 = new EmployeeSalarySystem("Jane Smith", "HR", 45000);
		System.out.println("Salary Details for Employee 1:");
		employee1.displaySalaryDetails();
		System.out.println("\nSalary Details for Employee 2:");
		employee2.displaySalaryDetails();
	}
}