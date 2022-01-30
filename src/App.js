import './App.css'
import { useState, useRef } from 'react'
import useMouse from '@react-hook/mouse-position'

import { Authorize } from './Authorize'
import Art from './Art'
import { ShapeShifter } from './ShapeShifter'
import { normalize, reapply } from './utils'


const STAIR_SCALE = 1 / 60 * Math.PI
const STAIR_OFFSET = 1/6
const stairFun = (x) => ((x + STAIR_OFFSET)/STAIR_SCALE - Math.sin((x + STAIR_OFFSET)/STAIR_SCALE)) * STAIR_SCALE - STAIR_OFFSET


const App = () => {
  // const [authorized, setAuthorized] = useState(false);
  const [authorized, setAuthorized] = useState(true); // TODO

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
    },
  }

  return !authorized
    ? (<Authorize setAuthorized={setAuthorized} />)
    : (
      <div className="App" ref={appRef}>
        <header className="header">
          <div className="third-header">I</div>
          <div className="third-header">LOVE</div>
          <div className="third-header">YOU</div>
        </header>
        <Art selection={selection} />
        <ShapeShifter selection={selection} />
      </div>
    )
}

export default App
