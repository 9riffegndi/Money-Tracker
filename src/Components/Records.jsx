import Overview from "./Overview";

export default function Records() {
    return (
        <div className="p-1 flex flex-col justify-start gap-2 h-screen w-full">
            <div className="w-full bg-purple-100 p-1 min-h-[130px] rounded-lg flex-col flex gap-2 justify-start items-start">
                <p className="font-bold badge badge-primary">Records</p>
                <p>welcome to your personal finance tracker</p>
                <p className="text-md md:text-[1.5rem] font-extrabold ">Ready to take charge of your finances today?</p>
            </div>
            <Overview/>
        </div>
    );
    
}