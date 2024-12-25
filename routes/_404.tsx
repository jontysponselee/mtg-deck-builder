import {Head} from "$fresh/runtime.ts";

export default function Error404() {
    return (
        <>
            <Head>
                <title>404 - Page not found</title>
            </Head>
            <div class="container columns is-vcentered is-centered is-full-page-height">
                <div>
                    <h1 class="title">404 - Page not found</h1>
                    <p class="my-4">
                        The page you were looking for doesn't exist.
                    </p>
                    <a href="/" class="is-underlined">Go back home</a>
                </div>
            </div>
        </>
    );
}
