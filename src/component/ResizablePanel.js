import { React, useState } from 'react';
import dragIcon from '../images/drag.png'

export default function ResizablePanel(props) {
    const [panelHeight, setPanelHeight] = useState(200)
    const [panelHeightAfterDrag, setPanelHeightAfterDrag] = useState(200)
    const [isDragging, setIsDragging] = useState(false)
    const [initialPos, setInitialPos] = useState(0.0)
    const [containerHeight, setContainerHeight] = useState(150)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const [startTime, setStartTime] = useState(0)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50
    var swipeTime = 500

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientY)
    }

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
        // add your conditional logic here
    }

    const resizePanel = (event) => {
        if (isDragging) {
            const delta = initialPos - event.targetTouches[0].clientY
            let height = panelHeightAfterDrag + delta
            // if condition to stop max height at 80% of the screen size
            // and min height to 30 pixel so that the drag button is always visible
            if (height <= (document.documentElement.clientHeight - (.2 * document.documentElement.clientHeight))
                && height >= 30) {
                setPanelHeight(height)
                setContainerHeight(height - 60) // setting footer's inside content height to 60 pixel less than the actual footer height
            }
            console.error("clientY", event.targetTouches[0].clientY)
            console.error("delta", delta)
            console.error("height", height)

            // if (!touchStart || !touchEnd) return
            // const distance = touchStart - touchEnd
            // const isLeftSwipe = distance > minSwipeDistance
            // const isRightSwipe = distance < -minSwipeDistance
            // let estTime = new Date().getTime() - startTime
            // console.log("est time", estTime)
            // if (estTime <= swipeTime) {
            //   if (isLeftSwipe) setPanelHeight(1000)
            //   if (isRightSwipe) setPanelHeight(200)
            // }
        }
    }

    const stopResize = (event) => {
        // setTouchEnd(event.targetTouches[0].clientY)
        setTimeout(() => setIsDragging(false))
        setTimeout(() => setPanelHeightAfterDrag(panelHeight))
    }

    const startResize = (event) => {
        console.error(event)
        setIsDragging(true)
        setInitialPos(event.targetTouches[0].clientY)

        // setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        // setTouchStart(event.targetTouches[0].clientY)
        // setStartTime(new Date().getTime())
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

    // useEffect(() => {
    //   window.addEventListener('mousemove', resizePanel);
    //   window.addEventListener('mouseup', stopResize);
    //   window.addEventListener('mouseleave', stopResize);

    //   return () => {
    //     window.removeEventListener('mousemove', resizePanel);
    //     window.removeEventListener('mouseup', stopResize);
    //     window.removeEventListener('mouseleave', stopResize);
    //   };
    // }, [isDragging]);

    // useEffect(() => {
    //   window.addEventListener('onTouchMove', resizePanel);
    //   window.addEventListener('onTouchEnd', stopResize);

    //   return () => {
    //     window.removeEventListener('onTouchMove', resizePanel);
    //     window.removeEventListener('onTouchEnd', stopResize);
    //   };
    // }, [isDragging]);

    return (
        <div id="footer" className="footer" style={{ height: panelHeight }}>
            {/* <div onMouseDown={startResize} ><img src={dragIcon} style={{ height: '40px', width: '40px', display: 'block', margin: 'auto', pointerEvents: 'none' }} /></div> */}
            <div
                onTouchStart={startResize}
                onTouchMove={resizePanel}
                onTouchEnd={stopResize} >
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