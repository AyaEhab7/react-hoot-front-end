// src/components/CommentForm/CommentForm.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as hootService from '../../services/hootService';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const { hootId, commentId } = useParams();


  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      const commentData = hootData.comments.find((comment) => comment._id === commentId);
      setFormData(commentData);
    };
  
    if (hootId && commentId) fetchHoot();
  }, [hootId, commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (hootId && commentId) {
      hootService.updateComment(hootId, commentId, formData);
      navigate(`/hoots/${hootId}`);
    } else {
      props.handleAddComment(formData);
    }
    setFormData({ text: '' });
  };



  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;