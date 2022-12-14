import { error } from '@sveltejs/kit';
import { exmInstance } from '$lib/exm';
import { functionId } from '$lib/contracts/functionId.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    if (params.id) {
        const inputs = [{
            type: 'fetchPost',
            postId: params.id
        }];
        //console.log(params.id);
        const res = await exmInstance.functions.write(functionId, inputs);
        const posts = res.data?.execution?.state?.posts || null;
        const key = Object.keys(posts)[0];
        const { [key]: record } = posts;
        return { record };
    }

    throw error(404, 'Not found');
}