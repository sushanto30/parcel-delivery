 import {
  createBrowserRouter,
 
} from "react-router"; 
import Root from "../root.jsx/Root";
import Home from "../../pages/Home/Home";
import AuthPages from "../../pages/AuthPages/AuthPages";
import Login from "../../pages/AuthPages/Login";
import Register from "../../pages/AuthPages/Register";
import AddParcels from "../../pages/AddParcels/AddParcels";
import DashboardLayout from "../DashboardLayout";
import MyParcels from "../../pages/Dashboard/Home/MyParcels";
import Payment from "../../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../../pages/Dashboard/Payment/PaymentHistory";
import BeARider from "../../pages/BeARider/BeARider";
import PendingRider from "../../pages/Dashboard/Riders/PendingRider";
import ActiveRider from "../../pages/Dashboard/Riders/ActiveRider";
  
  
  
  
  
  
 export  const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:'/addParcels',
          Component:AddParcels
        },
        {
          path:'/beArider',
          Component:BeARider,
          loader: ()=>fetch('/public/warehouses.json')
        }
    ]
     
  },
  {
    path:'/',
    Component:AuthPages,
    children:[
      {
        path:'login',
        Component:Login
      },
      {
        path:'register',
        Component:Register
      }
    ]
  },
  {
    path:'/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children:[
      {
        // index:true,
        path:'myParcel',
        // Component:MyParcels
        element:<MyParcels></MyParcels>
      },
      {
        path:'payment/:id',
        Component:Payment
      },
      {
        path:'parcelHistory',
        Component:PaymentHistory
      },
      {
        path:'pendingRider',
        Component: PendingRider
      },
      {
        path: 'ActiveRider',
        Component: ActiveRider
      }
    ]
    
  }
]);