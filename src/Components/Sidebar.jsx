import { Link } from "react-router-dom";

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
                
                <ul className="menu bg-base-200   h-screen  text-base-content p-0 w-64 ">
                {/* Sidebar content here */}
                <Link className="p-3 hover:bg-slate-400" to="/">Records</Link>
                <Link className="p-3 hover:bg-slate-400" to="/analytics">Analytics</Link>
                <Link className="p-3 hover:bg-slate-400" to="/history">History</Link>
                </ul>
            </div>
            </div>

            <p className="font-bold block sm:hidden p-2 ">Hallo world</p>
        </div>

    )
    
}