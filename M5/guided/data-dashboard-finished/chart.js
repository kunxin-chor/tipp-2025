async function main() {
    // sample code, delete when needed
    drawBarChart('chart1', [
        {
            name: 'Series 1',
            data: [44, 55, 41, 67, 22, 43, 21]
        }
    ], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], null, value => `${value.toLocaleString()} units`);

    // Example of drawing a line chart with hardcoded data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const lineData = [
        { x: 'Jan', y: 100 },
        { x: 'Feb', y: 150 },
        { x: 'Mar', y: 200 },
        { x: 'Apr', 'y': 180 },
        { x: 'May', 'y': 220 },
        { x: 'Jun', 'y': 250 }
    ];

    drawLineChart('chart2', [
        {
            name: 'Sample Data',
            data: lineData
        }
    ]);

    output("Hello", "world");  // Outputs: [timestamp] Hello world
    output("Data:", { key: "value" });  // Outputs: [timestamp] Data: { "key": "value" }
    output("Numbers:", 1, 2, 3);  // Outputs: [timestamp] Numbers: 1 2 3

    // Load JSON data
    const jsonData = await loadJsonData('data/product_sales_20.json');
    output('Loaded JSON data:', jsonData);
}


main();
