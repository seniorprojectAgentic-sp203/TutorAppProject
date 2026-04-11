import  SideBar  from "./components/SideBar";
import { Outlet } from "react-router-dom";

function Layout(){
    
    return(
        <>
            <SideBar/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout

//For sidebar navigation