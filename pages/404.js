import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';

export default function Custom404() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle + "404 Not Found"}</title>
            </Head>
            <h1>404 - Page Not Found</h1>
            <Link href="/">go to top</Link>
        </Layout>
    )
}