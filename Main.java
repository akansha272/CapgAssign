package pack.cap.module45;

public class Main {
    // Bank Account Class
    static class BankAccount {
        private String accountNumber;
        private double balance;

        public BankAccount(String accountNumber, double initialBalance) {
            this.accountNumber = accountNumber;
            this.balance = initialBalance;
        }

        public void deposit(double amount) {
            if(amount > 0) {
                balance += amount;
                System.out.println("Deposited: " + amount);
            } else {
                System.out.println("Deposit amount must be positive.");
            }
        }

        public void withdraw(double amount) {
            if(amount > 0 && amount <= balance) {
                balance -= amount;
                System.out.println("Withdrawn: " + amount);
            } else {
                System.out.println("Insufficient balance or invalid amount.");
            }
        }

        public double getBalance() {
            return balance;
        }

        @Override
        public String toString() {
            return "Account Number: " + accountNumber + ", Balance: " + balance;
        }
    }

    // Trading Account Class
    static class TradingAccount extends BankAccount {
        private String tradingAccountNumber;

        public TradingAccount(String bankAccountNumber, double initialBalance, String tradingAccountNumber) {
            super(bankAccountNumber, initialBalance);
            this.tradingAccountNumber = tradingAccountNumber;
        }

        public void buyStock(double amount) {
            if (getBalance() >= amount) {
                withdraw(amount);
                System.out.println("Stock purchased for: " + amount);
            } else {
                System.out.println("Not enough balance to buy stock.");
            }
        }

        public void sellStock(double amount) {
            deposit(amount);
            System.out.println("Stock sold for: " + amount);
        }

        @Override
        public String toString() {
            return "Trading Account Number: " + tradingAccountNumber + ", " + super.toString();
        }
    }

    // SIP (Systematic Investment Plan) Class
    static class SIP {
        private String sipAccountNumber;
        private double amountInvested;
        private double sipAmountPerMonth;
        private int months;

        public SIP(String sipAccountNumber, double sipAmountPerMonth) {
            this.sipAccountNumber = sipAccountNumber;
            this.sipAmountPerMonth = sipAmountPerMonth;
            this.amountInvested = 0;
            this.months = 0;
        }

        public void investMonthly() {
            amountInvested += sipAmountPerMonth;
            months++;
            System.out.println("Invested " + sipAmountPerMonth + " in SIP for month " + months);
        }

        public double getTotalInvestment() {
            return amountInvested;
        }

        public void printSipDetails() {
            System.out.println("SIP Account Number: " + sipAccountNumber);
            System.out.println("Total Amount Invested: " + amountInvested);
            System.out.println("Total Months: " + months);
        }
    }

    public static void main(String[] args) {
        // Create a bank account
        BankAccount bankAccount = new BankAccount("12345678", 1000.0);
        System.out.println(bankAccount);

        // Deposit and withdraw money from bank account
        bankAccount.deposit(500);
        bankAccount.withdraw(200);
        System.out.println(bankAccount);

        // Create a trading account with a reference to the bank account
        TradingAccount tradingAccount = new TradingAccount("12345678", bankAccount.getBalance(), "T12345");
        System.out.println(tradingAccount);

        // Buy and sell stocks using the trading account
        tradingAccount.buyStock(300);
        tradingAccount.sellStock(200);
        System.out.println(tradingAccount);

        // Create an SIP account
        SIP sip = new SIP("SIP123", 100);
        sip.investMonthly();
        sip.investMonthly();
        sip.printSipDetails();
    }
}
