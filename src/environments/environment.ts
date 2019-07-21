// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiBase: 'http://localhost:8080/project2-backend/api',
  homeURI: 'http://localhost:4200/',
  brands: ['Apple', 'Samsung', 'HP', 'Emerson', 'DENAQ'],
  categories: ['Electronics', 'Wearable Electronics', 'Appliances'],
  subCategories: [
    'TVs',
    'Phones',
    'Phone Accessories',
    'Monitors',
    'Printers',
    'Fridges',
    'Watches',
    'Laptops',
    'Smart Trashcans',
    'Computer Accessories'
  ]
};
