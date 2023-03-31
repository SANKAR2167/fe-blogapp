import { AppBar, Button, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { BlogPage } from './BlogPage';
import { CreateBlog } from './CreateBlog';
import { Home } from './Home';
import { EditBlog } from './EditBlog';

// const data = [
//   {
//     "title": "How to Create Thumbnail",
//     "image": "https://www.animaker.com/blog/wp-content/uploads/2018/09/Picmaker-Custom-Thumbnail-banner-image.jpg",
//     "description": "Creating an eye-catching thumbnail is an essential aspect of any successful online content, including videos, blog posts, and social media posts. A thumbnail serves as a visual representation of your content and can significantly impact whether someone decides to click and engage with your content or not. So, how can you create a compelling thumbnail?First, choose an attention-grabbing image that is relevant to your content. Add text overlays that highlight the main message or benefit of your content. Use contrasting colors to make your text stand out, and ensure that the text is easy to read. Consider the size and format of your thumbnail, ensuring it's optimized for the platform you'll be using it on. Lastly, use design tools like Canva to create professional-looking thumbnails that stand out and attract clicks. By following these tips, you can create thumbnails that engage your audience and drive clicks to your content.",
//     "writer": "Sankar"
//   }
// ];

function App() {
  const [BlogData, setBlogData] = useState([]);

  useEffect(() => {
    fetch(`https://6423eba3d6152a4d48023d2b.mockapi.io/blogs`)
      .then((data) => data.json())
      .then((blogs) => setBlogData(blogs))
  }, []);
  const navigate = useNavigate();

  //https://6423eba3d6152a4d48023d2b.mockapi.io/blogs
  return (
    <div className="App">
      <AppBar position='fixed' color='error'>
        <Toolbar className='toolbar'>
          <Button className='menu' color='inherit' onClick={() => navigate(`/`)}>Home</Button>
          <Button className='menu' color='inherit' onClick={() => navigate(`/blogs`)}>Blogs</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<BlogPage BlogData={BlogData}/>} />
        <Route path='/create/blog' element={<CreateBlog setBlogData={setBlogData} BlogData={BlogData}/>} />
        <Route path='/edit/blog/:id' element={<EditBlog />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
      </Routes>
    </div>
  );
}

function BlogDetails(){

  const { id } = useParams();
  // const movie = movieList[id];

  const [Blog, setBlogData] = useState([]);

  useEffect(()=>{
    fetch(`https://6423eba3d6152a4d48023d2b.mockapi.io/blogs/${id}`, {method:"GET"})
      .then((data) => data.json())
      .then((Blog) => setBlogData(Blog))
    }, []);

  return(
    <div className="detail">
    <div className="detail-blog">
      <img src={Blog.image} alt={Blog.title} className='detail-image'/>
      <h2>{Blog.title}</h2>
      <p>{Blog.description}</p>
      <span>Writen by, {Blog.writer}</span>
    </div>
    </div>
  )
}
export default App;
