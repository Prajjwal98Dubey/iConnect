import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import './App.css'
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";

function App() {
  return (
    <>
    <div className="App">
    <RouterProvider router={appRouter}/>
    </div>
    </>
  );
}
const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>
  },
  {
    path:'/chats',
    element:<ChatPage/>
  }
])

export default App;
