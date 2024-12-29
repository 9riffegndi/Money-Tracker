import { Link } from "react-router-dom";
import LogoApp from "./LogoApp";
export default function Sidebar({ className='' }) {
    return (
        <div className="flex z-30   justify-between items-center  w-full md:w-max">
            <div className={`drawer lg:drawer-open   ${className}`}>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn  rounded-none rounded-br-lg  btn-primary drawer-button lg:hidden">
                    <img width="20" src="https://img.icons8.com/?size=100&id=3096&format=png&color=000000" />
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-primary text-base-content rounded-r-xl   h-screen   p-0 w-64 ">
                    <div className="flex p-2 gap-2 justify-start bg-primary rounded-tr-xl border-b-2 items-center">
                        <LogoApp className="w-[100px]"/>
                        <p className="font-bold">Cash Flow </p>
                    </div>
                    {/* Sidebar content here */}
                    <Link className="p-3 flex gap-2 items-center hover:bg-primary  hover:pl-11   delay-100  transition-all ease-linear " to="/">
                        <img className=" w-[30px]" src="https://img.icons8.com/?size=100&id=37930&format=png&color=000000"  />
                        <p>Records</p>
                    </Link>
                    <Link className="p-3  flex gap-2 items-center hover:bg-primary  hover:pl-11   delay-100  transition-all ease-linear " to="/analytics">
                        <img className="w-[30px]" src="https://img.icons8.com/?size=100&id=15&format=png&color=000000" />
                        <p>Analytics</p>
                    </Link>
                    <Link className="p-3 flex gap-2 items-center hover:bg-primary  hover:pl-11  delay-100  transition-all ease-linear " to="/history">
                        <img className="w-[30px]" src="https://img.icons8.com/?size=100&id=58761&format=png&color=000000"  />
                        <p>History</p>
                    </Link>
                </ul>
            </div>
            </div>
            <p className="font-bold block sm:hidden p-2 ">Hallo world</p>
        </div>

    )
    
}