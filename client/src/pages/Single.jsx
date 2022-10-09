import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Menu from "../components/Menu";
import Delete from "../img/delete.png";
import Edit from "../img/edit.png";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${id}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${id}`, {
          withCredentials: true,
        });
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  return (
    <div className='single'>
      <div className='content'>
        <img src={`../upload/${post?.img}`} alt='' />
        <div className='user'>
          {post.userImg && <img src={post.userImg} alt='' />}
          <div className='info'>
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser !== null && currentUser.username === post.username && (
            <div className='edit'>
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={Edit} alt='' />
              </Link>
              <img onClick={handleDelete} src={Delete} alt='' />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        {getText(post.desc)}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
