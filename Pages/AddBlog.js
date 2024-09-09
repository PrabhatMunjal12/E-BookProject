import React, {useState, useEffect}from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../styles/addblog.css';

const AddBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState([null]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/v1/get/allcategory",
        // formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategories(res.data);
    };
    fetchAllCategories();
  },);
  // creating a form data 
  const formdata = new FormData();
  formdata.append("title", input.title);
  formdata.append("category", input.category);
  formdata.append("description", input.description);
  formdata.append("thumbnail", file);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!file){
      alert("please select a file");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/add/newblog",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className="add-blog-page">
      <form onSubmit={handleSubmit}>
        <h2>Add Blog</h2>
        <div className="input-container">
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" placeholder="Enter blog title" 
          value={input.title}
          onChange={(e) => setInput({...input, [e.target.name]: e.target.value})
        }
          />
        </div>

        <div className="input-container">
          <label for="category">Category:</label>
          <select id="category" name="category"
          onChange={(e) => setInput({...input, [e.target.name]: e.target.value})
        }
          >
            <option value="">Select category</option>
            {categories && categories.map((item) => {
              return <option value={item._id}>{item.title}</option>
            })}
          </select>
        </div>

        <div className="input-container">
          <label for="description">Description:</label>
          <textarea id="description" name="description" placeholder="Enter blog description"
          value={input.description}
          onChange={(e) => setInput({...input, [e.target.name]: e.target.value})
        }
          ></textarea>
        </div>

        <div className="input-container">
          <label for="thumbnail">Thumbnail:</label>
          <input type="file" id="thumbnail" name="thumbnail" 
          onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;