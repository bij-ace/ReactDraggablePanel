import { React, useState, useEffect } from 'react';
import dragIcon from '../images/drag.png'
import { isTouchDevice } from '../util/Utils';

export default function ResizablePanel(props) {
    const [panelHeight, setPanelHeight] = useState(200) // initial panel height
    const [panelHeightAfterDrag, setPanelHeightAfterDrag] = useState(200) // same initial panel height before dragging
    const [containerHeight, setContainerHeight] = useState(150) // initial height of inside content of panel
    const [isDragging, setIsDragging] = useState(false)
    const [initialPos, setInitialPos] = useState(0.0)

    const getClientY = (event) => {
        return isTouchDevice() ? event.targetTouches[0].clientY : event.clientY
    }

    const resizePanel = (event) => {
        if (isDragging) {
            const delta = initialPos - getClientY(event)
            /** 
             * not sure why 'height' logic differs for touch device and desktop
             * (isTouchDevice() ? panelHeightAfterDrag : panelHeight) is added to support both touch device and desktop
            **/
            let height = (isTouchDevice() ? panelHeightAfterDrag : panelHeight) + delta
            // if condition to stop max height at 80% of the screen size
            // and min height to 30 pixel so that the drag button is always visible
            if (height <= (document.documentElement.clientHeight - (.2 * document.documentElement.clientHeight))
                && height >= 30) {
                setPanelHeight(height)
                setContainerHeight(height - 50) // setting footer's inside content height to 50 pixel less than the actual footer height
            }
        }
    }

    const stopResize = (event) => {
        setTimeout(() => setIsDragging(false))
        setTimeout(() => setPanelHeightAfterDrag(panelHeight))
    }

    const startResize = (event) => {
        console.error(event)
        setIsDragging(true)
        setInitialPos(getClientY(event))
    }

    // TO-DO
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
        <div id="footer" className="footer" style={{ height: panelHeight }}>
            <div
                onMouseDown={startResize} // to support desktop
                onTouchStart={startResize} // to support touch devices
                onTouchMove={resizePanel} // to support touch devices
                onTouchEnd={stopResize} // to support touch devices
            >
                <img
                    src={dragIcon}
                    style={{
                        height: '20px',
                        width: '30px',
                        display: 'block',
                        margin: 'auto',
                        marginTop: '5px',
                        marginBottom: '5px',
                        pointerEvents: 'none'
                    }} />
            </div>
            <div style={{ margin: '0 20px', paddingBottom: '20px', overflowY: 'auto', maxHeight: containerHeight }}>
                {props.children}
            </div>
        </div>
    )
}