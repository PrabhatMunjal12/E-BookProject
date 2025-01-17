import React, {useState} from 'react';
import axios from 'axios';
import '../styles/addcategory.css';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const navigate = useNavigate(); 
  const [input, setInput] = useState({
    title: "",
  })
  const handleCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/add/category", input,
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
  };
  return (
    <div className="add-category-page">
      <form onSubmit={handleCategory}>
        <h2>Add Category</h2>
        <div className="input-container">
          <label for="title">Title:</label>
          <input type="text"
           id="title" 
           name="title"
           value={input.title}
           onChange={(e) => setInput({...input, [e.target.name]: e.target.value})
          } 
           placeholder="Enter category title" />
        </div>

        <button type="submit" className="btn btn-primary">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;