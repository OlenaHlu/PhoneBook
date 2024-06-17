import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modal/slice";
import { deleteContact } from "../../redux/contacts/operations";
import {
  selectIsModalOpen,
  selectContactDeleteId,
} from "../../redux/modal/selectors";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const infoToast = (message, type) => {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: type === "success" ? "light" : "colored",
    type: type,
  });
};

const ModalForm = () => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const contactDeleteId = useSelector(selectContactDeleteId);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleConfirmModal = () => {
    if (contactDeleteId) {
      dispatch(deleteContact(contactDeleteId))
        .unwrap()
        .then(() => {
          infoToast("Contact  deleted successfully!", "success");
        })
        .catch(() => {
          infoToast("Contact  deleted failed!", "error");
        });
      dispatch(closeModal());
    }
  };

  return (
    <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
      <p>This contact will be deleted. Continue?</p>
      <div>
        <button onClick={handleConfirmModal}>Yes</button>
        <button onClick={handleCloseModal}>No</button>
      </div>
    </Modal>
  );
};

export default ModalForm;
