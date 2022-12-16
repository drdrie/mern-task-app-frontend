import TaskList from "./components/TaskList";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import Pusher from "pusher-js";
import { useEffect } from "react";

// const pusher = new Pusher("d70a8216dbd129b8d9ed", { cluster: 'ap1' });
// const channel = pusher.subscribe('my-channel');
// channel.bind("my-event", (data) => {
//   // Method to be dispatched on trigger.
//   console.log("YES")
// });

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const pusher = new Pusher(URL);
  useEffect(() => {
    const pusher = new Pusher("d70a8216dbd129b8d9ed", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("my-channel");
    channel.bind("pusher:subscription_succeeded", function (data) {
      console.log(JSON.stringify(data));
      //Pusher.log = (msg) => {     console.log(msg);   };
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
  return (
    <div className="app">
      <div className="task-container">
        <TaskList/>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
