import Sketch from 'react-p5'
import './Art.css'

const FIRST_BG_COLOR = "#1C0F0D"
const SECOND_BG_COLOR = "#CA2E55"
const THIRD_BG_COLOR = "#FFE0B5"

const FRAME_RATE = 30


function App({selection}) {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef)
    p5.frameRate(FRAME_RATE)
  }
  
  const triplepolate = (p5, color1, color2, color3, x) => (
    x < 0.5
      ? p5.lerpColor(p5.color(color1), p5.color(color2), x * 2)
      : p5.lerpColor(p5.color(color2), p5.color(color3), x * 2 - 1)
  )
  
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

    // dev marker TODO remove
    p5.fill("#333399")
    p5.circle(selection.value * p5.windowWidth, p5.windowHeight - 70, 20, 20)
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }
  
  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}

export default App
