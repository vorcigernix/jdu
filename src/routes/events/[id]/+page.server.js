import { error } from '@sveltejs/kit';
import { exmInstance } from '$lib/exm';
import { functionId } from '$lib/contracts/functionId.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
    if (params.id) {
        const { posts } = await parent();
        if (posts[params.id]) { return posts[params.id]; }

        const inputs = [{
            type: 'fetchEvent',
            postId: params.id
        }];
        const res = await exmInstance.functions.write(functionId, inputs, true, false);
        const result = await res.data.execution.result;
        if (!result) { throw error(404, 'Not found'); }
        return await res.data.execution.result;

    }
}