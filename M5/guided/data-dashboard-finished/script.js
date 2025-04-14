async function main() {
    // Load JSON data
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

    const tooltipFormatter = function(eventData) {
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

    // Draw bar chart
    drawBarChart(
        'chart1', 
        [{
            name: 'Product Sales',
            data: productSales.map(item => item.revenue)
        }],
        productSales.map(item => item.product_name), tooltipFormatter);
}

main();
