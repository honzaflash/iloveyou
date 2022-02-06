import './App.css'
import { useState, useRef } from 'react'
import useMouse from '@react-hook/mouse-position'

import { Authorize } from './Authorize'
import Art from './Art'
import Timer from './Timer'
import { ShapeShifter } from './ShapeShifter'
import { normalize, reapply } from './utils'
import { HeaderThird } from './HeaderThird'

const STAIR_SCALE = 1 / 60 * Math.PI
const STAIR_OFFSET = 1/6
const stairFun = (x) => ((x + STAIR_OFFSET)/STAIR_SCALE - Math.sin((x + STAIR_OFFSET)/STAIR_SCALE)) * STAIR_SCALE - STAIR_OFFSET


const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [timerSpawned, setTimerSpawned] = useState(false)
  const [showTimer, setShowTimer] = useState(true)

  const timerRef = useRef(null)

  const appRef = useRef(null)
  const mousePos = useMouse(appRef)
  const [value, setValue] = useState(0.25)
  const selection = {
    value, // 0 - 1
    setValue,
    mousePos,
    appRef,
    cap() {
      if (this.value < 0) {
        this.setValue(0)
      } else if (this.value > 1) {
        this.setValue(1)
      }
    },
    update() {
      // const mouseDist = this.value - mousePos.x
      // const mousePull = 3
      // const accVect = gravityPull - mousePull
      // this.setValue((v) => v + accVect * 0)
      const normMouse = normalize(mousePos.x, appRef.current.offsetWidth)
      this.setValue(reapply(stairFun, 1, normMouse))
      this.cap()
      if (!timerSpawned && this.value > 5/6) {
        setTimerSpawned(true)
        setShowTimer(true)
      }
    },
  }

  const handleClick = (event) => {
    if (event.target !== timerRef.current) {
      setShowTimer(true)
    }
  }

  return (
    <>
      {!authorized && <Authorize setAuthorized={setAuthorized} />}
      <div className="App" ref={appRef} onClick={handleClick}>
        <header className="header">
          <HeaderThird text={"I"} position={1/6} selection={selection} />
          <HeaderThird text={"LOVE"} position={3/6} selection={selection} />
          <HeaderThird text={"YOU"} position={5/6} selection={selection} />
        </header>
        {timerSpawned && <Timer ref={timerRef} shownState={[showTimer, setShowTimer]}/>}
        <Art selection={selection} />
        <ShapeShifter selection={selection} />
      </div>
    </>
  )
}

export default App
