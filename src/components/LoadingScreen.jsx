import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <motion.div
            className="loader-content"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loader-badge">MIRZA HAMMAD ALI</div>
            <h1>MIRZA HAMMAD ALI</h1>
            <p>MERN STACK DEVELOPER</p>
            <div className="progress-shell" aria-label="Loading progress">
              <motion.div
                className="progress-bar"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
