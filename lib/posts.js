import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    if (fs.existsSync(fullPath) === false) {
        return {
            id,
            contentHtml: '',
            noSuchFile: true,
        }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
        noSuchFile: false,
    }
}

export function getAllPostIds() {
    // const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    // const json = await res.json()

    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Combine the data with the id
        return {
            params: {
                id,
            },
        }
        //     }
        // });
        // // Sort posts by date
        // return allPostsData.sort((a, b) => {
        //     console.log(a.date, b.date);
        //     if (a.date < b.date) {
        //         return 1;
        //     } else {
        //         return -1;
        //     }
        // });
    });
}


export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

// export async function getSortedPostsData() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
//     const json = await res.json()

//     // Get file names under /posts
//     const fileNames = fs.readdirSync(postsDirectory);
//     const allPostsData = fileNames.map((fileName) => {
//         // Remove ".md" from file name to get id
//         const id = fileName.replace(/\.md$/, '');

//         // Read markdown file as string
//         const fullPath = path.join(postsDirectory, fileName);
//         const fileContents = fs.readFileSync(fullPath, 'utf8');

//         // Use gray-matter to parse the post metadata section
//         const matterResult = matter(fileContents);


//         // Combine the data with the id
//         return {
//             id,
//             body: json.body,
//             ...matterResult.data,
//         };
//     });
//     // Sort posts by date
//     return allPostsData.sort((a, b) => {
//         console.log(a.date, b.date);
//         if (a.date < b.date) {
//             return 1;
//         } else {
//             return -1;
//         }
//     });
// }