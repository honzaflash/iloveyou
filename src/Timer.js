import './Timer.css'

import { intervalToDuration, formatDuration } from 'date-fns'
import { animated, useSpring } from 'react-spring'
import { forwardRef } from 'react'

const THE_THING_HAPPENED = new Date('Aug 07 2021 15:00:00 GMT+0200')

const Timer = forwardRef(({shownState}, ref) => {
  const [shown, setShown] = shownState
  const styles = useSpring({ opacity: shown ? 1 : 0 })
  
  const handleClick = () => {
    setShown(false)
  }

  return (
    <animated.div
      className='Timer'
      style={styles}
      onClick={handleClick}
      ref={ref}
    >
      Svoji už {
        formatDuration(intervalToDuration({
          start: THE_THING_HAPPENED,
          end: Date.now(),
        }),{
          format: ['years', 'months', 'days', 'hours', 'minutes', 'seconds']
        })
      }
    </animated.div>
)})

export default Timer
