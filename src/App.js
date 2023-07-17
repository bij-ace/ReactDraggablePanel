import { React, ReactDOM, useEffect, useState } from 'react';
import './App.css';
import ResizablePanel from './component/ResizablePanel';
import logo from './logo.svg'
import loremIpsum from './txt/lorem_ipsum'

function App() {
  const [panelHeight, setPanelHeight] = useState(200)
  const [isDragging, setIsDragging] = useState(false)
  const [initialPos, setInitialPos] = useState(0.0)

  const resizePanel = (event) => {
    if (isDragging) {
      const delta = initialPos - event.clientY
      let height = panelHeight + delta
      setPanelHeight(height)
      console.error("clientY", event.clientY)
      console.error("delta", delta)
    }
  }

  const stopResize = () => {
    setTimeout(() => setIsDragging(false))
  }

  const startResize = (event, index) => {
    console.error(event)
    setIsDragging(true)
    setInitialPos(event.clientY)
  }

  const onDraggerClick = (event) => {
    if (!isDragging) {
      if (panelHeight == 800) {
        setPanelHeight(200)
      } else {
        setPanelHeight(800)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', resizePanel);
    window.addEventListener('mouseup', stopResize);
    window.addEventListener('mouseleave', stopResize);

    return () => {
      window.removeEventListener('mousemove', resizePanel);
      window.removeEventListener('mouseup', stopResize);
      window.removeEventListener('mouseleave', stopResize);
    };
  }, [isDragging]);

  return (
    <div>
      <h1>ReactJS Resizable Panels</h1>
      {/* <div className="footer">
        <div onMouseDown={startResize}><img src={logo} style={{ height: '40px', width: '40px', display: 'block', margin: 'auto', pointerEvents: 'none' }} /></div>
        <div style={{ height: panelHeight + "px" }}>This is the first panel. It will use the rest of the available space.</div>
      </div> */}
      <ResizablePanel>
        {loremIpsum}
      </ResizablePanel>
    </div>
  );
}

export default App;
