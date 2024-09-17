import styles from "@/styles/Home.module.css";

const MapaContacto = () => {
  return (
    <div className={styles.contenedorMapa}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.404858958719!2d-58.47978142368489!3d-34.56862105564657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb6630a0d71f3%3A0x920faa5ac0bfc339!2sAv.%20Monroe%204191%2C%20C1430%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1726589514053!5m2!1ses!2sar"
        width="100%"
        height="400"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapaContacto;
