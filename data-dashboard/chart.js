// Utility function to draw a bar chart
function drawBarChart(containerId, seriesData, labels, options = {}) {
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
                columnWidth: '55%'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'category',
            categories: labels
        },
        yaxis: {
            labels: {
                formatter: function(value) {
                    return value;
                }
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

    // Create the chart
    const chart = new ApexCharts(document.querySelector(`#${containerId}`), {
        series: seriesData,
        ...finalOptions
    });

    // Render the chart
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

// Export the function for use in other scripts
window.output = output;