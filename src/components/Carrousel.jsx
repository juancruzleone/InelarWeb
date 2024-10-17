import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import styles from "@/styles/Home.module.css";

// import required modules
import { Pagination, Navigation, EffectFade } from 'swiper/modules';

export default function Carrousel() {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        style={{
          '--swiper-navigation-color': 'black',
          '--swiper-pagination-color': 'white',
        }}
        direction={'vertical'}
        speed={600}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, EffectFade]}
        effect="fade"
        slidesPerView={1}
        className={styles.carrousel}
      >
        <SwiperSlide 
          className={styles.carrouselSlide}
          style={{
            backgroundImage: 'url(/garrahan.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={styles.contenidoObras}>
            <div className={styles.tituloObras}>
              <h3>Hospital Garrahan</h3>
            </div>
            <div className={styles.categoriaObras}>
              <h4>Mantenimiento</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide 
          className={styles.carrouselSlide}
          style={{
            backgroundImage: 'url(/credicoop.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={styles.contenidoObras}>
            <div className={styles.tituloObras}>
              <h3>Banco Credicoop</h3>
            </div>
            <div className={styles.categoriaObras}>
              <h4>Instalación</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide 
          className={styles.carrouselSlide}
          style={{
            backgroundImage: 'url(/enel.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={styles.contenidoObras}>
            <div className={styles.tituloObras}>
              <h3>Enel, El chocón</h3>
            </div>
            <div className={styles.categoriaObras}>
              <h4>servicio técnico</h4>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}