import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from './global';

export function BlogDetails() {

  const { id } = useParams();
  // const movie = movieList[id];
  const [Blog, setBlogData] = useState([]);

  useEffect(() => {
    fetch(`${API}/blogs/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((Blog) => setBlogData(Blog));
  }, []);

  return (
    <div className="detail">
      <div className="detail-blog">
        <img src={Blog.image} alt={Blog.title} className='detail-image' />
        <h2>{Blog.title}</h2>
        <p>{Blog.description}</p>
        <span>Writen by, {Blog.writer}</span>
      </div>
    </div>
  );
}
