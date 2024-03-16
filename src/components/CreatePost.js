import React, { useState } from 'react';
import { GetallPosts } from './GetallPosts';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      setIsSubmitted(true);
      setError(null);

      const responseData = await response.json();
      console.log('Post created:', responseData);

      setTimeout(() => {
        setFormData({ title: "", body: "" });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Error while creating post');
      setIsSubmitted(false);

      setTimeout(() => {
        setFormData({ title: "", body: "" });
        setError(null);
      }, 3000);
    }
  };

  return (
    <>
         <form onSubmit={handleSubmit}>
        <div>
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
            <label>Body:</label>
            <textarea name="body" rows={20} cols={100} value={formData.body} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>

        {isSubmitted ? (<h1>Post Created</h1>) : null}
        {error ? (<h1>Error: {error}</h1>) : null}
    </form>

    <GetallPosts isSubmitted={isSubmitted}></GetallPosts>
    </>
   
  );
};

export default CreatePost;
