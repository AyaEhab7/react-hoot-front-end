import { useParams } from 'react-router-dom';
import * as hootService from '../../services/hootService';
import { useState, useEffect, useContext } from 'react';
import Loading from '../Loading/Loading';
import CommentForm from '../CommentForm/CommentForm';
import { AuthedUserContext } from '../../App';


const HootDetails = (props) => {
    const [hoot, setHoot] = useState(null);
    const { hootId } = useParams();
    const user = useContext(AuthedUserContext);

    useEffect(() => {
        const fetchHoot = async () => {
          const hootData = await hootService.show(hootId);
          setHoot(hootData);
        };
        fetchHoot();
      }, [hootId]);

      const handleAddComment = async (commentFormData) => {
        const newComment = await hootService.createComment(hootId, commentFormData);
        setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
      };
      

      
      if (!hoot) return <Loading />
      
    return (
        <main>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <p>
            {hoot.author.username} posted on
            {new Date(hoot.createdAt).toLocaleDateString()}
          </p>
             {hoot.author._id === user._id && (
               <>
             <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>

               </>
              )}
        </header>
        <p>{hoot.text}</p>
        <section>
        <h2>Comments</h2>
           <CommentForm handleAddComment={handleAddComment} />
            {!hoot.comments.length && <p>There are no comments.</p>}

            {hoot.comments.map((comment) => (
                <article key={comment._id}>
                <header>
                    <p>
                    {comment.author.username} posted on
                    {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                </header>
                <p>{comment.text}</p>
                </article>
            ))}
         </section>
      </main>
  )};
  
  export default HootDetails;