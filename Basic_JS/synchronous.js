// Single thread => One by one data processing (Synchronous manner)

console.log("Step: 1");
console.log("Step: 2"); // Wait for Step 1 to finish
console.log("Start");

setTimeout(() => {
    console.log("Asynchronous Step Done");
}, 2000); // This will run after 2 seconds

console.log("End");

console.log("Step: 3"); 
console.log("Step: 4");

async function fetchData() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        console.log(data);

    }catch(error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();