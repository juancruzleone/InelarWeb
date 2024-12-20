import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head'
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import { useTheme } from '@/components/ThemeProvider'

const Custom404 = () => {
    const { theme } = useTheme()

    return(
        <Layout data-theme={theme}>
            <Head>
                <title>Error 404 | Inelar</title>
                <meta name="description" content="Descripción de mi aplicación" />
                <link rel="icon" href="/inelar.ico" />
            </Head>
            <section className='contenedor404'>
                <h1>Código 404</h1>
                <p>Página no encontrada</p>
                <div className='contenedorImg404'>
                    <Image src='/manguera.svg' alt="Icono de manguera" width={100} height={100}/>
                </div> 
                <Link href="/">Ir al inicio</Link>
            </section>
            <Footer />
        </Layout>
    )
}

export default Custom404