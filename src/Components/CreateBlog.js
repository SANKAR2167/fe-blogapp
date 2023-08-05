import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { API } from "./global";

const userid= localStorage.getItem("Auth")

const blogValidationSchema = yup.object({
  title: yup.string().required().min(10),
  image: yup.string().required().min(10).url(),
  writer: yup.string().required().min(5),
  description: yup.string().required().test('word-count', 'The content must have at least 100 words', (value) => {
    if (!value) return false; // If the value is empty, return false
    const wordCount = value.trim().split(/\s+/).length; // Split by whitespace to count words
    return wordCount >= 100; // Return true if the word count is at least 100
  })
})
export function CreateBlog() {


  const { handleBlur, handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: {
      title: "",
      image: "",
      writer: "",
      description: "",
      userid: userid,
    },
    validationSchema: blogValidationSchema,
    onSubmit: (newBlog) => {
      addBlog(newBlog);
    }
  });

  const navigate = useNavigate();

  const addBlog = (newBlog) => {
    fetch(`${API}/blogs`, {
      method: "POST",
      body: JSON.stringify(newBlog),
      headers: { "Content-type": "application/json" },
    }).then(() => navigate('/blogs'))
  };

  return (
    <div>
      <h2 className="blog-add">Create New Blog</h2>
      <form className="create-blog" onSubmit={handleSubmit} initialValues={{ description: '' }}>
        <TextField
          name="title"
          label="Blog Title"
          variant="outlined"
          onChange={handleChange}
          value={values.title}
          onBlur={handleBlur}
        />
        {touched.title && errors.title ? errors.title : null}
        <TextField
          name="image"
          label="image URL"
          variant="outlined"
          onChange={handleChange}
          value={values.image}
          onBlur={handleBlur}
        />
        {touched.image && errors.image ? errors.image : null}
        <TextField
          name="writer"
          label="Writer"
          variant="outlined"
          onChange={handleChange}
          value={values.writer}
          onBlur={handleBlur}
        />
        {touched.writer && errors.writer ? errors.writer : null}
        <TextField
          name="description"
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={100}
          onChange={handleChange}
          value={values.description}
          onBlur={handleBlur}
        />
        {touched.description && errors.description ? errors.description : null}
        <TextField
          name="userid"
          label="userid"
          variant="outlined"
          value={values.userid}
          onBlur={handleBlur}
        />
        {touched.userid && errors.userid ? errors.userid : null}
        <Button
          variant="contained"
          color="error"
          type="submit"
        >
          Create Blog
        </Button>
      </form>
    </div>
  );
}
