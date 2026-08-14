// PageHeader.jsx - the title block at the top of every inner page.
// Keeps the eyebrow / heading / subtitle rhythm identical site-wide.
import { motion } from 'framer-motion'

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-12">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="eyebrow mb-4"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
        style={{ letterSpacing: '-0.02em' }}
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#a89e91]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default PageHeader
