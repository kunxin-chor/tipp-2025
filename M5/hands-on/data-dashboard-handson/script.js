// Create a value formatter function with two modes: normal and compact
function createValueFormatter(mode = 'normal') {
    if (mode === 'compact') {
        return function(value) {
            if (value < 1000) return value.toLocaleString();
            if (value < 1000000) return (value / 1000).toFixed(1) + 'K';
            if (value < 1000000000) return (value / 1000000).toFixed(1) + 'M';
            return (value / 1000000000).toFixed(1) + 'B';
        };
    }
    return function(value) {
        return value.toLocaleString();
    };
}

// Create a smart data label formatter that adapts based on data characteristics
function createSmartLabelFormatter(seriesData) {
    // Calculate some data characteristics
    const max = Math.max(...seriesData);
    
    // Determine the appropriate formatter based on data characteristics
    if (max > 10000) { // Large values - show compact numbers
        return function(value, index) {
            if (value < 1000) return value.toLocaleString();
            if (value < 1000000) return (value / 1000).toFixed(1) + 'K';
            if (value < 1000000000) return (value / 1000000).toFixed(1) + 'M';
            return (value / 1000000000).toFixed(1) + 'B';
        };
    }
    // Default - simple formatting
    return function(value, index) {
        return value.toLocaleString();
    };
}

async function createSalesChart() {
    const sales = await loadJsonData('data/product_sales_20.json');
    const productDetails = await loadJsonData('data/product_details.json');
    // Create a map of product details for quick lookup
    const productMap = {};
    productDetails.products.forEach(product => {
        productMap[product.product_name] = product;
    });

    // Calculate total revenue
    let total = 0;
    sales.forEach(function (item) {
        total += item.revenue;
    });
    output('Total revenue:', total);

    // Group sales by product
    const productSales = groupByAndSum(sales, 'product_name', 'revenue');

    // Sort by revenue (highest first)
    productSales.sort((a, b) => b.revenue - a.revenue);
    output('Product sales (sorted):', productSales);

    const tooltipFormatter = function (eventData) {
        const dataPointIndex = eventData.dataPointIndex;
        const productSale = productSales[dataPointIndex];
        const product = productMap[productSale.product_name];

        return `
        <div class="custom-tooltip">
            <h4 style="margin: 0; color: #008FFB">${productSale.product_name}</h4>
            <p style="margin: 5px 0"><strong>Revenue:</strong> $${productSale.revenue.toFixed(2)}</p>
            <p style="margin: 5px 0"><strong>Category:</strong> ${product.category}</p>
            <p style="margin: 5px 0"><strong>Base Price:</strong> $${product.base_price}</p>
            <p style="margin: 5px 0">${product.description}</p>                   
        </div>
    `;
    };

    // Create compact value formatter for the chart
    const valueFormatter = createValueFormatter('default');
    const salesLabelFormatter = createSmartLabelFormatter(productSales.map(item => item.revenue));

    // Draw bar chart
    drawBarChart(
        'chart1',
        [{
            name: 'Product Sales',
            data: productSales.map(item => item.revenue)
        }],
        productSales.map(item => item.product_name), tooltipFormatter, valueFormatter, salesLabelFormatter);
}

async function createEmployeeChart() {
    // Load JSON data
    const employeeSales = await loadJsonData('data/employee_sales.json');
    const employeeDetails = await loadJsonData('data/employee_details.json');

    // Group sales by employee name and sum sales_amount
    const employeeSalesByEmployee = groupByAndSum(employeeSales, 'employee_id', 'sales_amount');

    // Sort by total sales (highest first)
    employeeSalesByEmployee.sort((a, b) => b.sales_amount - a.sales_amount);

    // Create tooltip formatter for employee chart
    const employeeTooltipFormatter = function (eventData) {
        const dataPointIndex = eventData.dataPointIndex;
       
        const employeeID = employeeSalesByEmployee[dataPointIndex].employee_id;
        const employee = employeeDetails[employeeID];
        const salesAmount = employeeSalesByEmployee[dataPointIndex].sales_amount;

        return `
            <div class="custom-tooltip">
                <h4 style="margin: 0; color: #00E396">${employee.employee_name}</h4>
                <h4 style="margin: 5px 0">${employee.position}</h4>
                <p style="margin: 5px 0"><strong>Total Sales:</strong> $${salesAmount.toFixed(2)}</p>
            </div>
        `;
    };

    const valueFormatter = createValueFormatter('default');

    // Draw employee sales bar chart
    // Create smart label formatter for employee sales data
    const employeeLabelFormatter = createSmartLabelFormatter(
        employeeSalesByEmployee.map(item => item.sales_amount)
    );

    drawBarChart(
        'chart2',
        [{
            name: 'Employee Sales',
            data: employeeSalesByEmployee.map(item => item.sales_amount)
        }],
        employeeSalesByEmployee.map(item => item.employee_id),
        employeeTooltipFormatter,
        valueFormatter,
        employeeLabelFormatter,
        { colors: ['#00E396'] },
      
    );


}

async function main() {
    createSalesChart();
    createEmployeeChart();
}

main();
