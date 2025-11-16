import Search from "../../components/atoms/Search/Search";

const JobListPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-nunito text-neutral-100">
            <div className="flex justify-between items-center px-8 py-6 border-b border-neutral-50">
                <h1 className="text-18 font-700 leading-28">Job List</h1>
                <div>
                    Avatar
                </div>
            </div>
            <Search value="" onChange={(value) => {}} />
        </div>
    );
}

export default JobListPage
