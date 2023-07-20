import { Button, Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Counter } from "./Counter";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { API } from "./global";

export function AllBlogPage() {


  const [blogData, setBlogData] = useState([]);


  const getblogs = () => {
    fetch(`${API}/blogs`, { method: "GET" })
      .then((data) => data.json())
      .then((blogs) => setBlogData(blogs))
  }
  useEffect(() => getblogs(), []);
  return (
    <div className="blog-page">
      <div className="blogs-container">
        {blogData.map((BD) => (<Blog
          key={BD._id}
          blog={BD}
          id={BD._id}
          />))}
      </div>
    </div>
  );
}

function Blog({ blog, id, deleteButton, editButton }) {


  const navigate = useNavigate();

  return (
    <Card className="blog-container after">
      <img src={blog.image} alt={blog.title} className='blog-image' />
      <CardContent>
        <div className="blog-specs">
          <h3 className='blog-name'>{blog.title}
          <IconButton onClick={() => navigate(`/blogs/${id}`)} aria-label='toggle' color='primary'>
              <InfoIcon />
            </IconButton></h3>
        </div>
      </CardContent>
      <CardActions className='footer'><Counter /></CardActions>
    </Card>
  )
}
