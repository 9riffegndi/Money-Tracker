import { Link } from "react-router-dom";

export default function Analytics() {
    
    const transaction = localStorage.getItem("transactions");

    if (!transaction) {
        return (
            <div className="p-2 flex h-screen w-full">
                <p className="badge badge-primary">Analytics</p>
                <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
                    <p className="text-2xl font-bold">No transactions found</p>
                    <Link to="/" className="btn btn-primary">Go to Records</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2 flex bg-red-200 h-screen w-full">
            <p className="badge badge-primary">Records</p>

            <div className="">

            </div>
        </div>
    );
    
}