import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState ,useEffect} from 'react';

function FeaturedPost(props) {
  const { post,getAllData } = props;
  const [showFullBody, setShowFullBody] = React.useState(false);
  const [likedata,setLikedata]=useState({post:"",user:"random"})
  const [isclicked,setIsclicked]=useState(false)

  // Function to toggle between showing full body or excerpt
  const toggleShowFullBody = () => {
    setShowFullBody(!showFullBody);
  };

  useEffect(() => {
    getAllData()
  }, [isclicked]);

  async function clickHandler(id){
    likedata.post=id;
    setIsclicked(true)
    try {
        const response = await fetch('http://localhost:3000/api/v1/createLike', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(likedata)
        });
  
        if (!response.ok) {
          throw new Error('Failed to create post');
        }
  
        const responseData = await response.json();
        // console.log('like created:', responseData);

      } catch (error) {
        console.error('Error like post:', error);
      }
      setIsclicked(false)

  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea  >
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            {/* Check if showFullBody state is true, display full body, otherwise display excerpt */}
            <Typography variant="subtitle1" paragraph>
              {showFullBody ? post.body : post.body.split(' ').slice(0, 50).join(' ') + '...'}
            </Typography>
            {/* Conditional rendering for "Continue reading..." link */}
            {!showFullBody && (
              <Typography variant="subtitle1" color="primary" onClick={toggleShowFullBody}>
                Continue reading...
              </Typography>
            )}
            {/* Conditional rendering for "Show less" button */}
            {showFullBody && (
              <Button variant="outlined" onClick={toggleShowFullBody}>
                Show less
              </Button>
            )}
            <Button onClick={()=>clickHandler(post._id)} startIcon={<ThumbUpIcon></ThumbUpIcon>}>{post.like.length}</Button>
          </CardContent>
          {/* <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image="../images/aaron-huber-KxeFuXta4SE-unsplash.jpg"
            
          /> */}
        </Card>
      </CardActionArea>
    </Grid>
  );
}



export default FeaturedPost;
