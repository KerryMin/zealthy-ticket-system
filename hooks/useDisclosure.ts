import { useState } from "react";

interface IUseDisclosure {
  onOpen?: () => void;
  onClose?: () => void;
}
export function useDisclosure(props?: IUseDisclosure) {
  const { onOpen = () => {}, onClose = () => {} } = props || {};
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    onOpen();
    setIsOpen(true);
  }
  function closeModal() {
    onClose();
    setIsOpen(false);
  }
  return { isOpen, openModal, closeModal };
}
