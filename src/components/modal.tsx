import React, { ReactNode, useEffect } from "react";
import ReactPortal from "./ReactPortal";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      e.key === "Escape" ? handleClose() : null;
      document.body.addEventListener("keydown", closeOnEscapeKey);
      return () => {
        document.body.removeEventListener("keydown", closeOnEscapeKey);
      };
    };
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen  bg-slate-800 bg-opacity-50 ">
          <div className="fixed rounded flex flex-col box-border w-[294px] overflow-hidden bg-transparent h-full inset-y-[32%] inset-x-[35%] opacity-100">
            <div className="box-border h-5/6">{children}</div>
          </div>
        </div>
      </>
    </ReactPortal>
  );
};
export default Modal;
