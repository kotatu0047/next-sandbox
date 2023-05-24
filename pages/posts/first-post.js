import Link from "next/link"
import Image from "next/image"
import Head from "next/head"
import Layout from "../../components/layout"
// import type { InferGetServerSidePropsType, GetServerSideProps } from "next"

// type Repo = {
//     name: string;
//     stargazers_count: number;
// }

export const getServerSideProps = async () => {
    const res = await fetch("https://api.github.com/repos/vercel/next.js");
    const repo = await res.json();
    return { props: { repo } }
}


export default function FirstPost({ repo }){
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            {/* <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() => console.log('SDK Loaded!')}
            /> */}
            <h1 className="text-3xl font-bold underline" >First Post</h1>
            <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Badge</span>
            <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Badge</span>
            <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Badge</span>
            <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Badge</span>
            <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Badge</span>
            <span class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">Badge</span>
            <span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">Badge</span>
            <span class="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">Badge</span>


            <h2>
                <Link href="/">Back to Home
                </Link>
                <Image
                    src="/images/profile.jpg" // Route of the image file
                    height={144} // Desired size with correct aspect ratio
                    width={144} // Desired size with correct aspect ratio
                    alt="Your Name"
                />
            </h2>

            <h3> stargazers_count : {repo.stargazers_count} </h3>
        </Layout>
    );
}