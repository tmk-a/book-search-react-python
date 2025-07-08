import React, { useEffect, useState } from "react";
import "./Modal.scss";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BASE_CLASS = "modal";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else if (showModal) {
      setIsClosing(true);

      const timeout = setTimeout(() => {
        setShowModal(false);
        setIsClosing(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <div
      className={`${BASE_CLASS} ${isOpen ? "open" : ""} ${
        isClosing ? "closing" : ""
      }`}
    >
      <div className={`${BASE_CLASS}__panel`}>
        <button className={`${BASE_CLASS}__close`} onClick={onClose}>
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
