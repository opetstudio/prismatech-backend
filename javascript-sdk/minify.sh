
#!/bin/bash
npx terser -c -m -o checkout_confirmation.min.js -- checkout_confirmation.js
npx terser -c -m -o product_catalog.min.js -- product_catalog.js
npx terser -c -m -o product_detail.min.js -- product_detail.js
npx terser -c -m -o shopping_cart.min.js -- shopping_cart.js

