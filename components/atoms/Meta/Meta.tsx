import Logo from "../../../public/assets/image/Logo.svg";
import Head from "next/head";

const Meta = ({ title }: { title: string }) => {
    return (
        <div>
            <Head>
                <link rel="shortcut icon" href={Logo} />
                <title>{title}</title>
            </Head>
        </div>
    );
};

export default Meta;