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
                <div>
                    <Breadcrumb
                        dynamicLabels={{
                            "job-list": "Job list",
                        }}
                    />
                </div>
                <div className="flex items-center gap-2 border border-neutral-40 mr-4 rounded-full w-7 h-7">
                    {}
                </div>
            </div>
            {children}
        </div>
    );
};

export default DashboardLayout;
