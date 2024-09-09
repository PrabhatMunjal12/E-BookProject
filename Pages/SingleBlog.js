import React , {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import post from "react-router-dom";

const SingleBlog = () => {
    const navigate = useNavigate();
    const {id} = useParams(); 
    const [blog, setBlog] = useState({});
    useEffect(() => {
        const fecthSingleBlog = async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/get/blogs/${id}`,
                {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
            );
            setBlog(res.data);
        };
        fecthSingleBlog();
    }, [id]);
    return (
        <>
        <div className="container shadow my-10">
            <div className="col-md-12 d-flex items-center justify-content-center bg-light">
                <div className="row">
                    <h1 className='my-3'>{blog.title}</h1>
                    <img    
                    src={`http://localhost:9000/${blog.thumbnail}`}
                    // src={`https://imgs.search.brave.com/SPe1Oy4RsZXfCzk391YWv9bQn7G9_3EFBvSssiBBu8U/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/Z2Vyc3Bhc3Npb24u/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAzL0Jlc3Qt/QmxvZ2dpbmctQXBw/cy53ZWJw`}
                    className="img img-responsive img-rounded my-3"
                    alt=""
                    />
                    <p className='my-3'>{blog.description}</p>
                </div>
            </div>
            <button onClick={() => navigate("/")} className="btn btn-primary">
                Back To Post
            </button>
        </div>
        </>
    )
}

export default SingleBlog;