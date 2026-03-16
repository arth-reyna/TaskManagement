import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: "Homepage"
        },
        {
            path: "/about",
            element: "About"
        },
        {
            path: "/contact",
            element: "Contact"
        }
    ])
  return <RouterProvider router={router}/>
}

export default router