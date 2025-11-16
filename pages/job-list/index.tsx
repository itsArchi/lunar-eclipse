import Image from "next/image";
import Search from "../../components/atoms/Search/Search";
import empty from "../../public/assets/image/empty.svg"

const JobListPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-nunito text-neutral-100">
            <div className="flex justify-between items-center px-8 py-6 border-b border-neutral-50">
                <h1 className="text-18 font-700 leading-28">Job List</h1>
                <div>
                    Avatar
                </div>
            </div>
            <div className="px-8 py-6 border w-[70%]">
                <div>
                    <Search value="" onChange={(value) => {}} />
                </div>
                <div>
                    <Image src={empty} width={200} height={200} alt="empty" />
                </div>
            </div>
        </div>
    );
}

export default JobListPage
