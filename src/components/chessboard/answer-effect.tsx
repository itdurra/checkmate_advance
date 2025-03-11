import { motion } from 'framer-motion';

interface AnswerEffectProps {
  left: number;
  top: number;
}

export const AnswerEffect = ({ left, top }: AnswerEffectProps) => {
  
  return (
    <>
      <div
        className='absolute font-bold text-green-700'
        style={{
          left: `${left}px`,
          top: `${top}px`,
          zIndex: 50,
        }}
      >
        +1
      </div>

    </>
  );
};

      /*
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: -30, scale: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='absolute font-bold text-green-300'
        style={{
          left: `${left}px`,
          top: `${top}px`,
          zIndex: 50,
        }}
      >
        {text}
      </motion.div>*/
