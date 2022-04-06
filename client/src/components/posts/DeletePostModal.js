import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostContext } from '../../contexts/PostContext';

const DeletePostModal = () => {
  // Context
  const {
    postState: { post },
    showDeletePostModal,
    setShowDeletePostModal,
    deletePost,
  } = useContext(PostContext);

  const closeDialog = () => {
    setShowDeletePostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await deletePost(post._id);
    closeDialog();
  };

  return (
    <Modal show={showDeletePostModal} onHide={closeDialog}>
      <Modal.Header className="bg-info" closeButton>
        <Modal.Title className="text-white">
          Are you sure you want to delete?
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="info" type="submit">
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeletePostModal;
