import { error } from '@sveltejs/kit';
import { exmInstance } from '$lib/exm';
import { functionId } from '$lib/contracts/functionId.js';
import pkg from 'rrule';
//import { RRule } from 'rrule';

const { RRule } = pkg;

const returnFrequency = (freq) =>
    [
        RRule.DAILY,
        RRule.WEEKLY,
        RRule.MONTHLY,
        RRule.YEARLY
    ][freq];



/** @type {import('./$types').PageServerLoad} */
export async function load({ params, parent }) {
    if (params.id) {
        const { posts } = await parent();
        let data = (posts[params.id]);
        //if (posts[params.id]) { return posts[params.id]; }
        const inputs = [{
            type: 'fetchEvent',
            postId: params.id
        }];
        if (!data) {
            console.warn("need to refetch");
            const res = await exmInstance.functions.write(functionId, inputs, true, false);
            data = await res.data.execution.result;
        }
        if (!data) { throw error(404, 'Not found'); }
        const rule = new RRule({
            freq: returnFrequency(data.freq),
            interval: data.interval,
            dtstart: new Date(data.dtstart)
        });
        data = { ...data, lastevent: rule.before(new Date(), false), nextevent: rule.after(new Date(), true) };
        return data;
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
        const newAttendance = addOrReplace(attendance, { username: username, attending: attending, date: (new Date).toJSON() });
        //console.log("newAttServer", newAttendance);

        const inputs = [{
            type: 'updatePost',
            post: {
                id: postdata.id,
                author: postdata.author,
                eventname: postdata.eventname,
                freq: postdata.freq,
                interval: postdata.interval,
                dtstart: postdata.dtstart,
                description: postdata.description,
                attendance: newAttendance
            }
        }];
        try {
            await exmInstance.functions.write(functionId, inputs);
        }
        catch (err) {
            throw error(500, err);
        }
        return { formdata: JSON.stringify(formdata) };
    }
};