// import { useState } from 'react';
import './App.css'; // Import the CSS file
import AddMovie from './components/AddMovie';
import ListMovie from './components/ListMovie';

function App() {
  return (
    <div>
        <AddMovie />
        <ListMovie />
    </div>
);
}

export default App;
