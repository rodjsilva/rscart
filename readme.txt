Observations:
- In fairness, there should be another data file: promos.json. This file would hold the promotions. For simplicity, and as there's a one to one relationship with products, I decided to include it in the product.json file
- The use of "refs" is, somehow an anti-pattern. I decided for it in order to avoid complexity by using Flux / Redux
- The styling is minimal, just quick and easy with Bootstrap
- The tests are implemented with Jest