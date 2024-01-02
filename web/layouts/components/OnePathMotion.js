import { useState, useEffect } from 'react';
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

  const [width, setWidth] = useState([490, 430, 60, 8, 40, 100, 46]);
  const handleResize = () => {
    if (window.innerWidth < 540) {
      setWidth([260, 235, 25, 4, 20, 50, 22]);
    } else {
      setWidth([490, 430, 60, 8, 40, 100, 46]);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (

    <div className='row mt-0 font-semibold' 
      style={{
        width: `${width[0]}px`,
        fontSize: `${width[3]}rem`,
        userSelect: 'none',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div className='pl-0 pr-0' style={{width: `${width[1]}px`}}>
        kubectl
      </div>
      <div className='pl-0 pr-0' style={{width: `${width[2]}px`, paddingTop: `${width[6]}px`}}>
        <motion.svg width={width[4]} height={width[5]}
            viewBox={'0 0 40 100'}
            preserveAspectRatio={'xMidYMid meet'}
        >
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
    </div>
  );
}

export default PathAnimation;