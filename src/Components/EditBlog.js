import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "./global";

const blogValidationSchema = yup.object({
  id: yup.string().required(),
  title: yup.string().required().min(10),
  image: yup.string().required().min(10).url(),
  writer: yup.string().required().min(5),
  description: yup.string().required().min(50)
})
export function EditBlog() {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`${API}/blogs/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((BD) => setBlog(BD));
  }, []);

  console.log(blog);
  return <div className="edit-loading">

    {blog ? <EditBlogForm blog={blog} /> : "Loading..."}
  </div>
}

function EditBlogForm({ blog }) {

  const { handleBlur, handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: {
      id: "",
      title: "",
      image: "",
      writer: "",
      description: "",
    },
    validationSchema: blogValidationSchema,
    onSubmit: async (updateBlog) => {
      await fetch(`${API}/blogs/${blog.id}`, {
        method: "PUT",
        body: JSON.stringify(updateBlog),
        headers: { "Content-type": "application/json" },
      }).then(() => navigate("/blogs"))
    }
  });

  const navigate = useNavigate();

  return (
    <div>
      <h2 className="blog-add">Edit Blog</h2>
      <form className="create-blog" onSubmit={handleSubmit}>
        <TextField
          name="id"
          label="Ref ID"
          variant="outlined"
          onChange={handleChange}
          value={values.id}
          onBlur={handleBlur}
        />
        {touched.id && errors.id ? errors.id : null}
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
        <Button
          variant="contained"
          color="error"
          type="submit"
        >
          Update Blog
        </Button>
      </form>
    </div>
  );
}
