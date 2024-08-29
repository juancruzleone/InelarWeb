/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/solicitar-instalacion',
        destination: '/SolicitarInstalaciones',
      },
      {
        source: '/solicitar-provision',
        destination: '/SolicitarProvisiones',
      },
      {
        source: '/solicitar-servicio-tecnico',
        destination: '/SolicitarServicioTecnico',
      },
      {
        source: '/solicitar-mantenimiento',
        destination: '/SolicitarMantenimiento',
      },
      {
        source: '/preguntas-frecuentes',
        destination: '/PreguntasFrecuentes',
      },
      {
        source: '/servicios',
        destination: '/Servicios',
      },
      {
        source: '/instalaciones',
        destination: '/Instalaciones',
      },
      {
        source: '/servicio-tecnico',
        destination: '/ServicioTecnico',
      },
      {
        source: '/productos',
        destination: '/Productos',
      },
      {
        source: '/register',
        destination: '/Register',
      },
      {
        source: '/login',
        destination: '/Login',
      },
      {
        source: '/contacto',
        destination: '/Contacto',
      },
      {
        source: '/certificaciones',
        destination: '/Certificaciones',
      },
      {
        source: '/carrito',
        destination: '/Carrito',
      },
      {
        source: '/mantenimientos',
        destination: '/Mantenimientos',
      },
      {
        source: '/provisiones',
        destination: '/Provisiones',
      },
      {
        source: '/quienes-somos',
        destination: '/QuienesSomos',
      },
      {
        source: '/panel',
        destination: '/Panel',
      },
    ];
  },
};

module.exports = nextConfig;
