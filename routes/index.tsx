import {getXataClient} from "../lib/xata.ts";

async function getPostTitles() {
    const xata = getXataClient();

    return await xata.db.posts.select(["title"]).getAll();
}

export default async function Home() {
    const postTitles = await getPostTitles();

    return (
        <div class="px-4 py-8 mx-auto bg-[#86efac]">
            <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
                <h1 class="text-4xl font-bold">Welcome to MTG Deck Builder</h1>
                <p class="my-4">
                    This is an example and will be removed later on.
                </p>
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postTitles.map(({title}) => (
                        <tr><td>{title}</td></tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
