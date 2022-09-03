import './index.css';
import store from './lib/store';

import { Provider } from 'react-redux';
import TaskBox from './integration/TaskBox/TaskBox';

function App() {
  return (
    <Provider store={store}>
      <TaskBox />
    </Provider>
  );
}

export default App;
