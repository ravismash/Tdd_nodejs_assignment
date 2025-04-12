class StringCalculator {
    constructor() {
        this.defaultDelimiter = /,|\n/;
        this.delimiter = this.defaultDelimiter;
    }

    add(numbers) {
        if (!numbers) return 0; // Return 0 for an empty string

        if (numbers.startsWith("//")) {
            numbers = this.extractCustomDelimiter(numbers); // Handle custom delimiters
        }

        const numArray = this.splitNumbers(numbers); // Split numbers using the delimiter
        this.validateNumbers(numArray); // Check for negative numbers
        return this.calculateSum(numArray); // Calculate and return the sum
    }

    extractCustomDelimiter(numbers) {
        const match = numbers.match(/^\/\/(.*)\n(.*)$/);
        if (match) {
            this.delimiter = new RegExp(match[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // Escape special characters
            return match[2]; // Return the numbers part
        }
        return numbers;
    }

    splitNumbers(numbers) {
        return numbers.split(this.delimiter); // Split numbers using the current delimiter
    }

    validateNumbers(numbers) {
        const negatives = numbers.filter(num => parseInt(num, 10) < 0); // Find negative numbers
        if (negatives.length > 0) {
            throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`); // Throw error for negatives
        }
    }

    calculateSum(numbers) {
        return numbers.reduce((sum, num) => {
            const value = parseInt(num, 10);
            return value <= 1000 ? sum + value : sum; // Ignore numbers greater than 1000
        }, 0);
    }
}

module.exports = StringCalculator;