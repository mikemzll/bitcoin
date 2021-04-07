import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

const store = createStoreon([
  process.env.NODE_ENV !== 'production' && storeonDevtools
]);

export default store;
