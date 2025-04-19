// Utility function to draw a bar chart
function drawBarChart(containerId, seriesData, labels, tooltipFormatter = null, valueFormatter = null, dataLabelFormatter = null, options = {}) {
    // Default options
    const defaultOptions = {
        chart: {
            type: 'bar',
            height: '100%',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                columnWidth: '55%',
                dataLabels:{
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            offsetY: -20, // Position labels above the bars
            style: {
                fontSize: '12px',
                colors: ['#000000']
            },
            formatter: dataLabelFormatter || function(value) {
                return value.toLocaleString();
            }
        },       
        tooltip: {
            enabled: true,
            shared: true,
            intersect: false,
            custom: tooltipFormatter || (v=>v)
        },
        xaxis: {
            type: 'category',
            categories: labels
        },
        yaxis: {
            labels: {
                formatter: valueFormatter || (v=>v)
            }
        },
        fill: {
            opacity: 1
        },
        grid: {
            show: true,
            borderColor: '#e0e0e0',
            position: 'back',
            strokeDashArray: 3
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
    };

    // Merge user options with defaults
    const finalOptions = { ...defaultOptions, ...options };

    // Create and render the chart
    const chart = new ApexCharts(document.querySelector(`#${containerId}`), {
        series: seriesData,
        ...finalOptions
    });
    chart.render();

    return chart;
}

// Utility function to draw a line chart
function drawLineChart(containerId, seriesData, tooltipFormatter = null, valueFormatter = null, options = {}, dataLabelFormatter = null) {
    // Default options for line chart
    const defaultOptions = {
        chart: {
            type: 'line',
            height: '100%',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
            formatter: dataLabelFormatter || function(value) {
                return value.toLocaleString();
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        tooltip: {
            enabled: true,
            shared: true,
            intersect: false,
            custom: tooltipFormatter || (v=>v)  
        },    
        yaxis: {
            labels: {
                formatter: valueFormatter || (v=>v)
            }
        },
        grid: {
            show: true,
            borderColor: '#e0e0e0',
            position: 'back',
            strokeDashArray: 3
        },
        colors: ['#008FFB']
    };

    // Merge user options with defaults
    const finalOptions = { ...defaultOptions, ...options };

    // Create and render the chart
    const chart = new ApexCharts(document.querySelector(`#${containerId}`), {
        series: seriesData,
        ...finalOptions
    });
    chart.render();

    return chart;
}

// Example usage:
// const chart1 = drawBarChart('chart1', [
//     {
//         name: 'Series 1',
//         data: [44, 55, 41, 67, 22, 43, 21]
//     }
// ], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']);

// Get the console output element
const consoleOutput = document.getElementById('console-output');

/**
 * Custom console output function that outputs to the HTML console window
 * @param {...any} args - Arguments to output, similar to console.log
 */
function output(...args) {
    // Create a new div for this output
    const outputDiv = document.createElement('div');
    outputDiv.className = 'console-line';
    
    // Format the arguments
    const formattedArgs = args.map(arg => {
        if (arg === null) return 'null';
        if (arg === undefined) return 'undefined';
        if (typeof arg === 'object' && arg !== null) {
            return JSON.stringify(arg, null, 2);
        }
        return String(arg);
    });
    
    // Add to console output
    outputDiv.innerHTML = `<span class="message">${formattedArgs.join(' ')}</span>`;
    consoleOutput.appendChild(outputDiv);
    
    // Scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

/**
 * Fetches JSON data from a given URL
 * @param {string} url - The URL to fetch data from
 * @returns {Promise<any>} - The parsed JSON data
 * @throws {Error} - If the fetch fails or response is not OK
 */
async function loadJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        output('Error loading JSON data:', error.message);
        throw error;
    }
}

/**
 * Groups data by a property and sums values
 * @param {Array} data - Array of objects to process
 * @param {string} groupKey - Property to group by
 * @param {string} sumKey - Property to sum
 * @returns {Array} - Array of objects with group and sum values
 */
function groupByAndSum(data, groupKey, sumKey) {
    // Initialize our accumulator object
    const tempResult = {};
    
    // Loop through each item in the data array
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const key = item[groupKey];
        
        // If we haven't seen this key before, initialize it to 0
        if (!tempResult[key]) {
            tempResult[key] = 0;
        }
        
        // Add the sumKey value to our accumulator
        tempResult[key] += item[sumKey];
    }
    
    // Convert the object to an array of objects
    const result = [];
    for (const [key, value] of Object.entries(tempResult)) {
        result.push({
            [groupKey]: key,
            [sumKey]: value
        });
    }
    return result;
}
