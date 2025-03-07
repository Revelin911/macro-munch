import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <div className="MainBody">
      <Navbar />
      <main className='container'>
      </main>
        <Outlet />
      </div>
    </>
  );
}

export default App;
