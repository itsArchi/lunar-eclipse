import Meta from "../../atoms/Meta/Meta";
import Breadcrumb from "../../molecules/BreadCrumb/BreadCrumb";

const DashboardLayout = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={`min-h-screen bg-white flex flex-col font-nunito text-neutral-100 ${className}`}
        >
            <div>
                <Meta title="Job List" />
            </div>
            <div className="flex justify-between items-center px-8 py-6 border-b border-neutral-50">
                {/* <h1 className="text-18 font-700 leading-28">Job List</h1> */}
                <div>
                    {/* Jika route adalah /job-list/[id], map "[id]" ke label "Manage Candidate" */}
                    <Breadcrumb
                        dynamicLabels={{
                            "job-list": "Job list",
                            // use this key if your segment for id is numeric or dynamic; commonly we can't know actual segment name,
                            // so map by parent route when you want the last crumb to be custom. Another approach is passing explicit prop.
                            // e.g. if path is /job-list/123 -> label for last segment will be "Manage Candidate" if you map "123" key,
                            // but that is not always possible. Instead you can pass dynamicLabels from page level.
                        }}
                    />
                </div>
                <div>Avatar</div>
            </div>
            {children}
        </div>
    );
};

export default DashboardLayout;
