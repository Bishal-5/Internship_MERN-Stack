const fruits = ["A", "B", "C", "D", "E"];

// For-each loop
fruits.forEach((fruit, index) => {
    console.log(`${index} : ${fruit}`);
})

// Filter method
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(num => num % 2 === 0);

console.log("Even numbers:", evens);

// Key-Value pairs
const person = {
    name: "John",
    age: 30,
    city: "New York"
};

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Destructuring assignment 
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // Output: 1 2 3