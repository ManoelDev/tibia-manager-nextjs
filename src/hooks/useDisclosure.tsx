import { useState } from 'react';

const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const onToggle = () => setIsOpen((prev) => !prev);

  const getDisclosureProps = () => ({ isOpen });
  const getButtonProps = () => ({
    onClick: onToggle,
    'aria-expanded': isOpen,
  });

  return {
    isOpen,
    onClose,
    onOpen,
    onToggle,
    getDisclosureProps,
    getButtonProps,
  };
};

export default useDisclosure;