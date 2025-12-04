import { useState } from 'react'
import './App.css'
import List from './components/List'
import Details from './components/Details';

export interface User {
  id: number;
  name: string;
}

function App() {
  const [selected, setSelected] = useState<User | null>(null);

  return (
    <div className='users'>
      <List selected={selected} onSelect={setSelected} />
      <Details info={selected} />
    </div>
  )
}

export default App
