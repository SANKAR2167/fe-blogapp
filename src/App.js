import { AppBar, Button, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { BlogPage } from './Components/BlogPage';
import { CreateBlog } from './Components/CreateBlog';
import { Home } from './Components/Home';
import { EditBlog } from './Components/EditBlog';
import { API } from './Components/global';
import { BlogDetails } from './Components/BlogDetails';
import SignUp from './Components/SignUp';
import Login from './Components/Login';


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
    fetch(`${API}/blogs`)
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
          <Button className='menu' color='inherit' onClick={() => navigate(`/users/login`)}>Login</Button>
        </Toolbar>
      </AppBar>

      {/* Route Setup */}
      <Routes>
        <Route path='/' element={<ProductedRoute><Home /></ProductedRoute>} />
        <Route path='/blogs' element={<ProductedRoute><BlogPage /></ProductedRoute>} />
        <Route path='/create/blog' element={<ProductedRoute><CreateBlog /></ProductedRoute>} />
        <Route path='/edit/blog/:id' element={<ProductedRoute><EditBlog /></ProductedRoute>} />
        <Route path='/blogs/:id' element={<ProductedRoute><BlogDetails /></ProductedRoute>} />
        <Route path='/users/login' element={<Login />} />
        <Route path='/users/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}


function ProductedRoute({ children }) {
  const isAuth = localStorage.getItem("token");
  // console.log(isAuth);
  return isAuth ? children : <Navigate replace to={"/users/login"} />;
}

export default App;
