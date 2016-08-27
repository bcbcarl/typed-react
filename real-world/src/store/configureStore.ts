// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./configureStore.prod')
// } else {
//   module.exports = require('./configureStore.dev')
// }

import configureStore from "./configureStore.dev";
export default configureStore;
