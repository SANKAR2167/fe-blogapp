import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-blog">
      <h1>Welcome to My Blog page</h1>
      <Button variant='contained' color='error' onClick={() => navigate(`/blogs`)}>View Blog's</Button>
    </div>
  );
}
