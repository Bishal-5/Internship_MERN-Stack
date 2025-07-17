try {
    try {
        nonExistentFunction();
        console.log(1);
    } catch (error) {
        console.error("Error caught:", error.message);
    }
} catch (outerError) {
    console.error("Outer error caught:", outerError.message);
}