import { useEffect } from "react";
import { animated, useSpring, interpolate } from "react-spring"

import { FIRST_FG_COLOR, SECOND_FG_COLOR, THIRD_FG_COLOR } from "./Art"

export const MAX_SCALE = 200


export const HeaderThird = ({text, position, selection}) => {
  const [{ x }, set] = useSpring(() => ({
    x: 0.5,
  }))

  
  useEffect(() => {
    set({ x: selection.value})
  }, [set, selection.value])
  
  const scale = (dist) => (
    dist < 2/6
      ? 200 - dist * 3 * 100
      : 100
  )
  const transform = interpolate([x], (x) => `scale(${scale(Math.abs(x - position))}%)`)

  return (
    <animated.div
      className="third-header"
      style={{transform}}
    >
      {text}
    </animated.div>
  )
}
