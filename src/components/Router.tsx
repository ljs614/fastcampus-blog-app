import { Route, Routes, Navigate} from "react-router-dom"
import Home from "../pages/home";
import PostsPage from "../pages/posts";
import PostPage from "../pages/posts/detail";
import PostNew from "../pages/posts/new";
import PostEdit from "../pages/posts/edit";
import ProfilePage from "../pages/profile";
import Login from "../pages/login";
import Signup from "../pages/signup";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/posts" element={<PostsPage />}/>
      <Route path="/posts/:id" element={<PostPage />}/>
      <Route path="/posts/new" element={<PostNew />}/>
      <Route path="/posts/edit/:id" element={<PostEdit />}/>
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate replace to ='/'/>}/>
    </Routes>
  );
}

export default Router;
