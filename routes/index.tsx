import {getXataClient} from "../lib/xata.ts";

async function getPostTitles() {
    const xata = getXataClient();

    return await xata.db.posts.select(["title"]).getAll();
}

export default async function Home() {
    const postTitles = await getPostTitles();

    return (
        <div class="container columns is-centered">
            <div>
                <h1 class="title">Welcome to MTG Deck Builder</h1>
                <p class="my-4">
                    This is an example and will be removed later on.
                </p>
                <button class="button is-primary">Test button</button>
                <table class="table">
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
