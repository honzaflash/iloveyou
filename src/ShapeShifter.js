import { useEffect } from "react";
import { animated, useSpring } from "react-spring"
import { SHAPE_I, SHAPE_HEART, SHAPE_FLOWER, SHAPE_FLOWER_STEM_HIDDEN, SHAPE_FLOWER_STEM } from './shapes'
import { FIRST_FG_COLOR, SECOND_FG_COLOR, THIRD_FG_COLOR } from "./Art"


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
      width="600"
      height="1200"
      viewBox="0 0 158.75 158.75"
    >
      <g
        id="layer1"
        transform="translate(0,-138.24998)">
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
            fill: "#EEEEEE",
            stroke: "none",
          }}
        />
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
            fill: x.interpolate({
              range: [0, 1/6, 3/6, 5/6, 1],
              output: [
                FIRST_FG_COLOR,
                FIRST_FG_COLOR,
                SECOND_FG_COLOR,
                THIRD_FG_COLOR,
                THIRD_FG_COLOR,
              ]
            }),
            stroke: "none",
          }}
        />
      </g>
    </svg>
  )
}
