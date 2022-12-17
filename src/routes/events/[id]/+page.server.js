import { error } from '@sveltejs/kit';
import { exmInstance } from '$lib/exm';
import { functionId } from '$lib/contracts/functionId.js';

/** @type {import('./$types').PageServerLoad} */
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

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const formdata = await request.formData();
        const origdata = formdata.get('postdata');
        const username = formdata.get('username');
        const attending = formdata.get('attending');
        const postdata = JSON.parse(origdata);

        const attendance = postdata.attendance || [];
        const addOrReplace = (arr, newObj) => [...arr.filter((o) => o.username !== newObj.username), { ...newObj }];
        const newAttendance = addOrReplace(attendance, { username: username, attending: attending, date: (new Date) });


        const inputs = [{
            type: 'updatePost',
            post: {
                id: postdata.id,
                author: postdata.author,
                eventname: postdata.eventname,
                weeks: postdata.weeks,
                day: postdata.day,
                description: postdata.description,
                attendance: newAttendance
            }
        }];
        try {
            const res = await exmInstance.functions.write(functionId, inputs);
        }
        catch (err) {
            throw error(500, err);
        }
        return { formdata: JSON.stringify(formdata) };
    }
};