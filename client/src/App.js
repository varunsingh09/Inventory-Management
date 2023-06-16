import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

//pages & components

import Home from './pages/Home'
import Receive from './pages/Receive'
import Add from './pages/Add'
import NewCount from './pages/NewCount'
import Navbar from './components/Navbar'
import { ToggleContext } from './context/ToggleContext'

function App() {
  const [toggleReceive, setToggleReceive] = useState(false)
  const [toggleAdd, setToggleAdd] = useState(false)

  return (
    <div className="App">
      <ToggleContext.Provider value={{toggleReceive, setToggleReceive, toggleAdd, setToggleAdd}}>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="receive" element={<Receive />} />
          <Route path="add" element={<Add />} />
          <Route path="new-count" element={<NewCount />} />
        </Routes>
      </div>
      </ToggleContext.Provider>
    </div>
  );
}

export default App;
