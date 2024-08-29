import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from "@/styles/Home.module.css";

// import required modules
import { Parallax, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': 'black',
          '--swiper-pagination-color': 'black',
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className={styles.carrousel}
      >
        <div
          slot="container-start"
          className={styles.parallaxBg}
          style={{
            'background-image':
              'url(/garrahan.webp)',
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide className={styles.carrousel}>
          <div className={styles.contenidoObras}>
            <div className={styles.tituloObras} data-swiper-parallax="-300">
              <h3>Hospital Garrahan</h3>
            </div>
            <div className={styles.categoriaObras} data-swiper-parallax="-200">
              <h4>Mantenimiento</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.carrousel}  style={{
            'background-image':
              'url(/credicoop.webp)',
          }}>
          <div className={styles.tituloObras} data-swiper-parallax="-3  00">
            <h3>Banco Credicoop</h3>
          </div>
          <div className={styles.categoriaObras} data-swiper-parallax="-200">
            <h4>Instalación</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.carrousel} style={{
            'background-image':
              'url(/enel.webp)',
          }}>
          <div className={styles.tituloObras} data-swiper-parallax="-300">
            <h3>Enel, El chocón</h3>
          </div>
          <div className={styles.categoriaObras} data-swiper-parallax="-200">
            <h4>servicio técnico</h4>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
