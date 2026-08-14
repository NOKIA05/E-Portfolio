// Reveal.jsx - the site's one scroll animation, used everywhere.
// Fades + lifts its children the first time they enter the viewport.
//
//   <Reveal delay={0.1}><Card /></Reveal>
//
// Props: delay (seconds), y (px to travel), className, as ('div' | 'section' | ...)
import { motion } from 'framer-motion'

function Reveal({ children, delay = 0, y = 18, className = '', as = 'div', ...rest }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
