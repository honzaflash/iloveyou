import { useState } from 'react'
import Sketch from 'react-p5'
import './Art.css'

export const FIRST_BG_COLOR = "#2F1847"
export const SECOND_BG_COLOR = "#DF1660"
export const THIRD_BG_COLOR = "#F7C96E"
export const FIRST_FG_COLOR = "#FFFFFF"
export const SECOND_FG_COLOR = "#FFFFFF"
export const THIRD_FG_COLOR = "#FFFFFF"


const FRAME_RATE = 30



const triplepolate = (p5, color1, color2, color3, x) => (
  x < 0.5
    ? p5.lerpColor(p5.color(color1), p5.color(color2), x * 2)
    : p5.lerpColor(p5.color(color2), p5.color(color3), x * 2 - 1)
)


// the p5js sketch component
function App({selection}) {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef)
    p5.frameRate(FRAME_RATE)
  }
  
  const draw = (p5) => {
    selection.update()

    // backgroud color
    const bgColor = triplepolate(
      p5,
      FIRST_BG_COLOR,
      SECOND_BG_COLOR,
      THIRD_BG_COLOR,
      (selection.value - 1/6) * 3/2,
    )
    p5.background(bgColor)
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }
  
  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}

export default App
