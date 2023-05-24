import { useEffect } from "react";
import Head from "next/head";
import {useRouter} from 'next/router'
import Layout from "../../components/layout";
import Date from '../../components/date';
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths() {
    const paths = getAllPostIds();
    // console.dir(paths);
    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    if (!postData || postData.noSuchFile) {
        return {
            props: {
                postData: null,
                notFound: true,
            },
        };
    }

    return {
        props: {
            postData,
            notFound: false,
        },
    };
}


const Redirect404 = () => {
    const router = useRouter()

    useEffect(() => {
        router.replace('/404') // ここでリダイレクト
    }, [])

    return null
}

function Post({ postData }) {
    if (!postData || postData.notFound) {
        return <Redirect404></Redirect404>;
    }


    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

//   Post.getInitialProps = async ({ res }) => {

//     // サーバー側でリダイレクト
//     if (typeof window === 'undefined') {
//       res.writeHead(302, { Location: '/404' })
//       res.end()

//       return {} // 空オブジェクトだと警告文が発生するので注意してください！
//     }

//     // クライアント側でリダイレクト
//     Router.push('/404')

//     return {} // 同上
//   }

export default Post;