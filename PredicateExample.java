package singleInheritance;
import java.util.function.*;

public class PredicateExample {
	public static void main(String Args[]) {
		Predicate<Integer> isEven = (num) -> num%2 ==0;
		Predicate<Integer> isGreaterThan = (num) -> num>100;
		
		Predicate<Integer> isEvenAndGreaterThan = isEven.and(isGreaterThan);
		
		Predicate<Integer> isEvenOrGreaterThan = isEven.or(isGreaterThan);

		Predicate<Integer> isNotEven = isEven.negate();
		
		//DEfine a supplier that returns a default message
		Supplier<String> messageSupplier = () -> "Hello, welcome to java 8"
	}
}
