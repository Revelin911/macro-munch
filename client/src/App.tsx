import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <main className='container pt-5'>
      </main>
        <Outlet />
      
    </div>
  );
}

export default App;
