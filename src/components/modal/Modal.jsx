import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './modal.css';
const Modal = ({ modalImage, setModalImage, setIsModal, isModal }) => {
    const modalRef = useRef();
    useEffect(() => {
        const getClickOutside = (e) => {
            if (isModal && e.target === modalRef.current) {
                setIsModal(false);
            }
        };
        document.addEventListener("click", getClickOutside);
        return () => {
            document.removeEventListener("click", getClickOutside);
        };
    }, [isModal, setIsModal]);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ easings: "easeInOut", type: "spring", stiffness: "100", duration: "0.4" }}
            className='modal' ref={modalRef}>

            <button onClick={() => {
                setIsModal(false);
                setModalImage('');
            }}>X</button>

            <motion.img src={modalImage} alt='modal' 
                initial={{ y:"-100%"}}
                animate={{ y:"0" }}
                exit={{ y:"-100%" }}
                transition={{ easings: "easeInOut", type: "spring", stiffness: "100", duration: "0.4" }} />
        
        </motion.div>
    )
}

export default Modal;