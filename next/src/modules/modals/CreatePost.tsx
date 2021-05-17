import React from "react";
import Modal from "react-modal";
import { X } from "react-bootstrap-icons";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
  },
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: 8,
    padding: "40px 40px 40px 40px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--color-primary-100)",
    border: "none",
    maxHeight: "80vh",
    width: "90%",
    maxWidth: 530,
  },
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: any;
  content: string;
  setContent: any;
}

export const CreatePostModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  content,
  setContent,
}) => {
  return (
    <Modal
      shouldCloseOnEsc
      shouldFocusAfterRender
      isOpen={open}
      style={customStyles}
    >
      <div className="flex justify-end absolute top-3 right-3">
        <button
          onClick={onClose}
          className="rounded-lg p-0.5 hover:bg-primary-200"
        >
          <X className="text-3xl" />
        </button>
      </div>
      <form onSubmit={onSubmit} className="grid grid-cols-3 gap-4 w-full">
        <div className="col-span-3 block">
          <h4>Create Post</h4>
        </div>
        <div className="flex h-full w-full col-span-2">
          <input
            placeholder="Title"
            className="outline-none w-full bg-primary-200 p-2 rounded-lg"
          />
        </div>
        <div className="block w-full h-11 col-span-3">
          <textarea
            placeholder="What's new, Alex?"
            value={content}
            onChange={(e: any) => setContent(e.target.value)}
            className="outline-none resize-none w-full h-full bg-primary-200 p-2 rounded-lg"
          />
        </div>
        <div className="flex pt-2 space-x-3 col-span-full items-center">
          <button className="focus outline-none focus:ring-4 focus:ring-secondary-ring font-serif text-sm text-white font-bold py-2 px-6 rounded-lg transition duration-200 ease-in-out bg-gradient-to-r from-secondary-200 to-secondary-100 hover:to-secondary-100-hover hover:from-secondary-200-hover">
            Create Post
          </button>
        </div>
      </form>
    </Modal>
  );
};
