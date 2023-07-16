import { React } from 'react';
import './App.css';
import ResizablePanel from './component/ResizablePanel';
import loremIpsum from './txt/lorem_ipsum.js'

function App() {
  return (
    <div>
      <h1>ReactJS Resizable Panels</h1>
      <ResizablePanel>
        {loremIpsum}
      </ResizablePanel>
    </div>
  );
}

export default App;
