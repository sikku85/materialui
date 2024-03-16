import CreatePost from "./components/CreatePost";
import './App.css'
import { GetallPosts } from "./components/GetallPosts";
import Blog from "./components/Blog";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
    <div >
    <Routes>
      <Route path="/" element={<Blog></Blog>}></Route>
      <Route path="/createpost" element={<CreatePost></CreatePost>}></Route>
    </Routes>

    {/* <CreatePost></CreatePost> */}
    {/* <Blog></Blog> */}
    </div>
      
    </>
  );
}

export default App;
