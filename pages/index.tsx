import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'

const images = [
  '/2.jpg',
  '/3.jpg',
  '/5.jpg',
  '/6.jpg',
  '/2.jpg?1',
  '/3.jpg?1',
  '/5.jpg?1',
  '/6.jpg?1',
  '/2.jpg?2',
  '/3.jpg?2',
  '/5.jpg?2',
  '/6.jpg?2'
]

const collapsedAspectRatio = 1 / 3
const fullAspectRatio = 3 / 2
const margin = 12
const gap = 2

export default function Home() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const changeImage = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && index > 0) {
        setIndex(i => i - 1)
      } else if (e.key === 'ArrowRight' && index < images.length - 1) {
        setIndex(i => i + 1)
      }
    }

    window.addEventListener('keydown', changeImage)
    return () => window.removeEventListener('keydown', changeImage)
  })

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <main className="h-screen bg-black">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {images.map((image, i) => (
                <motion.img
                  key={image}
                  animate={{ opacity: i === index ? 1 : 0.3 }}
                  src={image}
                  alt="Carousel Image"
                  className="aspect-[3/2] object-cover"
                />
              ))}
            </motion.div>

            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-6 inset-x-0 h-14 flex justify-center overflow-hidden">
            <motion.div
              initial={false}
              animate={{
                x: `-${
                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
                  margin +
                  index * gap
                }%`
              }}
              className="flex gap-1"
              style={{
                aspectRatio: fullAspectRatio,
                gap: `${gap}%`
              }}
            >
              {images.map((image, i) => (
                <motion.button
                  key={image}
                  initial={false}
                  animate={i === index ? 'active' : 'inactive'}
                  whileHover={{ opacity: 1 }}
                  variants={{
                    active: {
                      aspectRatio: fullAspectRatio,
                      marginRight: `${margin}%`,
                      marginLeft: `${margin}%`,
                      opacity: 1
                    },
                    inactive: {
                      aspectRatio: collapsedAspectRatio,
                      marginRight: 0,
                      marginLeft: 0,
                      opacity: 0.5
                    }
                  }}
                  className="shrink-0"
                  onClick={() => setIndex(i)}
                >
                  <Image
                    src={image}
                    alt="Carousel Image"
                    width={84}
                    height={56}
                    className="h-full object-cover"
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
    </MotionConfig>
  )
}
