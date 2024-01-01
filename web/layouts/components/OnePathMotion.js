import { motion } from 'framer-motion';

const PathAnimation = () => {
  const pathVariants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      }
    }
  };

  const icon = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
    }
  }

  return (
    <div className='mt-12 font-semibold' 
      style={{width: '600px',
              fontSize: '8rem',
              textAlign: 'right',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
    >
      kubectl
      <motion.svg width="100" height="100" style={{float: 'right', marginTop: '46px', marginLeft: '10px'}}>
        <motion.path
          d="M 20 100 V 20 H 0 V 10 C 12 10 10 0 20 0 H 40 V 100 H 20 Z"
          variants={icon}
          stroke="rgb(102 225 151 / var(--tw-text-opacity))"
          strokeWidth="3"
          fill="transparent"
          initial="hidden"
          animate="visible"
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 10 }}
        />
      </motion.svg>
    </div>
  );
}

export default PathAnimation;