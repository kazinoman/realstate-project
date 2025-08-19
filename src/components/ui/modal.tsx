import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top" | "bottom" | "left" | "right";
  backdropBlur?: boolean;
  containerClassName?: string;
  closeOnBackdropClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  position = "center",
  backdropBlur = true,
  containerClassName = "",
  closeOnBackdropClick = true,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionClasses = {
    center: "items-center justify-center",
    "top-left": "items-start justify-start",
    "top-right": "items-start justify-end",
    "bottom-left": "items-end justify-start",
    "bottom-right": "items-end justify-end",
    top: "items-start justify-center",
    bottom: "items-end justify-center",
    left: "items-center justify-start",
    right: "items-center justify-end",
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${backdropBlur ? "backdrop-blur-sm" : ""}`}
        onClick={closeOnBackdropClick ? onClose : undefined}
      />

      {/* Modal container */}
      <div
        className={`flex min-h-screen p-4 ${positionClasses[position]} ${containerClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
