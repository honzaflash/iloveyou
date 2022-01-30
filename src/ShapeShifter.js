import { useEffect } from "react";
import { animated, useSpring } from "react-spring"
import { SHAPE_I, SHAPE_HEART, SHAPE_FLOWER, SHAPE_FLOWER_STEM_HIDDEN, SHAPE_FLOWER_STEM } from './shapes'


export const ShapeShifter = ({selection}) => {
  const [{ x }, set] = useSpring(() => ({
    x: 0.5,
  }))

  useEffect(() => {
    set({ x: selection.value})
  }, [set, selection.value])

  return (
    <svg
      className="shape"
      width="256"
      height="464"
      viewBox="0 0 256 464"
    >
      <animated.path
        d={x.interpolate({
          range: [0, 1/6, 3/6, 5/6, 1],
          output: [
            SHAPE_I,
            SHAPE_I,
            SHAPE_HEART,
            SHAPE_FLOWER,
            SHAPE_FLOWER,
          ],
        })}
        style={{
          fill: "#444444",
          stroke: "none",
        }}
      />
      <animated.path
        d={x.interpolate({
          range: [0, 1/6, 3/6, 5/6, 1],
          output: [
            SHAPE_FLOWER_STEM_HIDDEN,
            SHAPE_FLOWER_STEM_HIDDEN,
            SHAPE_FLOWER_STEM_HIDDEN,
            SHAPE_FLOWER_STEM,
            SHAPE_FLOWER_STEM,
          ],
        })}
        style={{
          fill: "#444444",
          stroke: "none",
        }}
      />
    </svg>
  )
}
