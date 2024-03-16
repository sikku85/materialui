import React, { useEffect, useState } from 'react';

export const GetallPosts = ({isSubmitted}) => {
    const [data, setData] = useState([]);
    const [foamdata,setFoamdata]=useState({post:"",user:"sikku",body:""})

    async function getAllData() {
        try {
            const response = await fetch("http://localhost:3000/api/v1/getallPost");
            const result = await response.json();
            console.log(result);
            setData(result.data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function clickHandler() {
        getAllData();
    }
    useEffect(() => {
        getAllData() 
     }, [isSubmitted,foamdata]);



     const changehandler = (e) => {
        setFoamdata({ ...foamdata, [e.target.name]: e.target.value });
      };

      async function commentpostrequest(){
        try {
            const response = await fetch('http://localhost:3000/api/v1/createComment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(foamdata)
            });
      
            if (!response.ok) {
              throw new Error('Failed to create post');
            }
      
           
            const responseData = await response.json();
            console.log('Post created:', responseData);
      
            setTimeout(() => {
                setFoamdata({ post: "", body: "" });
            }, 3000);
          } catch (error) {
            console.error('Error creating post:', error);      
            setTimeout(() => {
                setFoamdata({ post: "", body: "" });
            }, 3000);
          }
      }

      function clickhandlers(post_id){
        foamdata.post=post_id;
        console.log(foamdata)
        commentpostrequest();


      }




     
    return (
        <>
            <button onClick={clickHandler}>refresh</button>
            <div>
                {data.length > 0 ? (
                    <ul>
                    {data.map((post) => (
    <li key={post._id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <input type='text' name="body" onChange={changehandler}></input>
        <span>
            <button onClick={() => clickhandlers(post._id)}>comment</button>
        </span>
        <p>
            {post.comment.map((ele) => (
                <div>{ele.body}</div>
            ))}
        </p>
    </li>
))}

                    </ul>
                ) : (
                    <p>No posts found</p>
                )}
            </div>
        </>
    );
};
