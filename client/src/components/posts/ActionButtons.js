import Button from 'react-bootstrap/Button';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';

const ActionButtons = ({ url, _id }) => {
  // Context
  const { findPost, setShowUpdatePostModal, setShowDeletePostModal } =
    useContext(PostContext);

  const dialogDelete = () => {
    findPost(_id);
    setShowDeletePostModal(true);
  };

  const choosePost = () => {
    findPost(_id);
    setShowUpdatePostModal(true);
  };

  return (
    <>
      <Button
        variant="success"
        className="post-button"
        href={url}
        target="_blank"
      >
        <img
          className="no-select"
          src={playIcon}
          alt="play"
          width="32"
          height="32"
        />
      </Button>

      <Button variant="warning" className="post-button" onClick={choosePost}>
        <img
          className="no-select"
          src={editIcon}
          alt="edit"
          width="24"
          height="24"
        />
      </Button>

      <Button variant="info" className="post-button" onClick={dialogDelete}>
        <img
          className="no-select"
          src={deleteIcon}
          alt="delete"
          width="24"
          height="24"
        />
      </Button>
    </>
  );
};

export default ActionButtons;
