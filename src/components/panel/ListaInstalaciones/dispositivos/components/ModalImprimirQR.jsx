import React from "react";
import Modal from "react-modal";
import { QRCodeSVG } from 'qrcode.react';
import styles from "@/styles/ListaDispositivos.module.css";

Modal.setAppElement('#__next'); 

const ModalImprimirQR = ({ isOpen, onClose, codigoQR }) => {
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir QR</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .qr-code {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="qr-code">
            <div>${document.getElementById('qrCode').outerHTML}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Imprimir Código QR"
      className={styles.ModalPanelDispositivo}
      shouldCloseOnOverlayClick={false}
      closeTimeoutMS={500}
    >
      <h2 className={styles.tituloCodigoQR}>Código QR</h2>
      <div id="qrCode" style={{ textAlign: 'center' }}>
        <QRCodeSVG value={codigoQR} size={180} className={styles.codigoQR}/>
      </div>
      <div className={styles.contenedorBotonesImprimir}>
        <button onClick={handlePrint} className={styles.botonImprimir}>
          Imprimir
        </button>
        <button onClick={onClose} className={styles.botonCancelarModal}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ModalImprimirQR;