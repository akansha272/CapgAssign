package pack.cap.module45;

import java.util.Scanner;

public class AssignmentMarks {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter the number of assignments: ");
        int numAssignments = scanner.nextInt();
        
        int[] marks = new int[numAssignments];
        int totalMarks = 0;
        
        for (int i = 0; i < numAssignments; i++) {
            System.out.print("Enter marks for assignment " + (i + 1) + ": ");
            marks[i] = scanner.nextInt();
            totalMarks += marks[i];
        }
        
        double averageMarks = (double) totalMarks / numAssignments;
        
        System.out.printf("Total Marks: %d\n", totalMarks);
        System.out.printf("Average Marks: %.2f\n", averageMarks);
        
        scanner.close();
    }
}


