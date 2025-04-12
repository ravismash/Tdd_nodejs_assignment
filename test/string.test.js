const StringCalculator = require('../src/string');

let calculator;

beforeEach(() => {
    calculator = new StringCalculator();
});

test.each([
    { input: "", expected: 0, description: "return 0 for an empty string" },
    { input: "1", expected: 1, description: "return the number itself for a single number" },
    { input: "1,3", expected: 4, description: "return the sum of two numbers separated by a comma" },
    { input: "1\n2", expected: 3, description: "return the sum of two numbers separated by a newline" },
    { input: "1\n2,3", expected: 6, description: "return the sum of numbers separated by both commas and newlines" },
    { input: "1\n4,1005", expected: 5, description: "ignore numbers greater than 1000" },
    { input: "//;\n1;4;8", expected: 13, description: "support custom delimiters (e.g., ';')" },
    { input: "//**.\n1**.4**.8", expected: 13, description: "support custom delimiters with special characters (e.g., '**.')" }
])('should $description', ({ input, expected }) => {
    expect(calculator.add(input)).toBe(expected);
});

test('should throw an error for negative numbers', () => {
    expect(() => calculator.add("1,-2,3,-4")).toThrow("Negative numbers not allowed: -2, -4");
});