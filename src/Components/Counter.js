import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

// user component (declaration)

export function Counter() {
  let [like, setLike] = useState(0);
  let [disLike, setDislike] = useState(0);

  const incrementLike = () => setLike(like + 1);
  const incrementDisLike = () => setDislike(disLike + 1);
  return (
    // camelCase
    <div>
      <IconButton aria-label="like" onClick={incrementLike} color='success'>
      <Badge badgeContent={like} color="success">
      👍
      </Badge>
      </IconButton>
      
      <IconButton aria-label="dislike" onClick={incrementDisLike} color='error'>
      <Badge badgeContent={disLike} color="error">
      👎
      </Badge>
      </IconButton>
    </div>
  );
}
