import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper'
import { Swiper, SwiperSlide as Slide } from 'swiper/react'
import Image from 'next/image'
import styles from './slider.module.scss'

SwiperCore.use([Navigation, Pagination])

const swiperOptions: SwiperOptions = {
  slidesPerView: 1,
  grabCursor: true,
  navigation: true,
  pagination: {
    clickable: true
  }
}

const slideOptions = [
  {
    path: '/imgs/handshake.webp'
  },
  {
    path: '/imgs/brain.webp'
  },
  {
    path: '/imgs/living-room.webp'
  },
  {
    path: '/imgs/starry-sky.webp'
  }
]

export default function Slider() {
  return (
    <div className={styles.container}>
      <div className={styles.limiter}>
        <Swiper {...swiperOptions}>
          {slideOptions.map(({ path }) => (
            <Slide key={path}>
              <Image src={path} width={1280} height={720}/>
            </Slide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
