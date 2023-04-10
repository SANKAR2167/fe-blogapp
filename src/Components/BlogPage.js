import { Button, Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Counter } from "./Counter";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { API } from "./global";

export function BlogPage() {


  const [blogData, setBlogData] = useState([]);


  const getblogs = () => {
    fetch(`${API}/blogs`, { method: "GET" })
      .then((data) => data.json())
      .then((blogs) => setBlogData(blogs))
  }
  useEffect(() => getblogs(), []);

  const deleteBlog = (id) => {
    fetch(`${API}/blogs/${id}`, { method: "DELETE" })
      .then((data) => getblogs())
  };

  const navigate = useNavigate();
  return (
    <div className="blog-page">
      <Button variant="contained" className="create" onClick={() => navigate(`/create/blog`)}>Create Blog +</Button>
      <div className="blogs-container">
        {blogData.map((BD) => (<Blog
          key={BD._id}
          blog={BD}
          id={BD._id}
          deleteButton={<IconButton color="error" onClick={() => deleteBlog(BD._id)} sx={{ marginLeft: "auto" }}><DeleteIcon /></IconButton>}
          editButton={ 
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() => navigate(`/edit/blog/${BD._id}`)}
            aria-label="edit"
            color="primary"
          >
            <EditIcon />
          </IconButton>}/>))}
      </div>
    </div>
  );
}

function Blog({ blog, id, deleteButton, editButton }) {


  const navigate = useNavigate();

  return (
    <Card className="blog-container">
      <img src={blog.image} alt={blog.title} className='blog-image' />
      <CardContent>
        <div className="blog-specs">
          <h3 className='blog-name'>{blog.title}
          <IconButton onClick={() => navigate(`/blogs/${id}`)} aria-label='toggle' color='primary'>
              <InfoIcon />
            </IconButton></h3>
        </div>
      </CardContent>
      <CardActions className='footer'><Counter />{editButton}{deleteButton}</CardActions>
    </Card>
  )
}
