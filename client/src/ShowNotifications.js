import Notification from "./component/Notification";
import React from "react";
import {createRoot} from "react-dom/client";



export const showNotifications = (message, type) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root  = createRoot(container)

    root.render(
        <Notification
        message={message}
        type={type}
        onClose={()=>{
            root.unmount()
            document.body.removeChild(container)
        }}/>
    )
}
