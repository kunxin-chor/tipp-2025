drawBarChart('chart1', [
    {
        name: 'Series 1',
        data: [44, 55, 41, 67, 22, 43, 21]
    }
], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']);

output("Hello", "world");  // Outputs: [timestamp] Hello world
output("Data:", { key: "value" });  // Outputs: [timestamp] Data: { "key": "value" }
output("Numbers:", 1, 2, 3);  // Outputs: [timestamp] Numbers: 1 2 3
