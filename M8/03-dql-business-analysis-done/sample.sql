-- find the profit for each product line
SELECT pl.line_name, SUM(s.quantity * (p.unit_price - p.production_cost)) as profit
FROM sales s
JOIN products p ON s.product_id = p.product_id
JOIN product_lines pl ON p.product_line_id = pl.product_line_id
GROUP BY pl.line_name;

-- find the total spent on R&D for each product line
SELECT pl.line_name, SUM(re.expense) as total_rnd
FROM rnd_expenditures re
JOIN product_lines pl ON re.product_line_id = pl.product_line_id
GROUP BY pl.line_name;

-- calculate the profit to r&d ratio for each product line
SELECT pl.line_name, SUM(s.quantity * (p.unit_price - p.production_cost)) / SUM(re.expense) as profit_to_rnd_ratio
FROM sales s
JOIN products p ON s.product_id = p.product_id
JOIN product_lines pl ON p.product_line_id = pl.product_line_id
JOIN rnd_expenditures re ON pl.product_line_id = re.product_line_id
GROUP BY pl.line_name
ORDER BY profit_to_rnd_ratio DESC;

-- show the amount of profit and r&d ratio for each product line over the years
SELECT
  pl.line_name,
  re.fiscal_year,
  SUM(s.quantity * (p.unit_price - p.production_cost)) AS profit,
  MAX(re.expense)                                    AS total_rnd,
  SUM(s.quantity * (p.unit_price - p.production_cost))
    / MAX(re.expense)                                AS profit_to_rnd_ratio
FROM rnd_expenditures re
JOIN product_lines pl
  ON re.product_line_id = pl.product_line_id
LEFT JOIN products p
  ON p.product_line_id = pl.product_line_id
LEFT JOIN sales s
  ON s.product_id = p.product_id
 AND YEAR(s.sale_date) = re.fiscal_year
GROUP BY
  pl.line_name,
  re.fiscal_year
ORDER BY
  pl.line_name,
  re.fiscal_year;
