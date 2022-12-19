import { exmInstance } from '$lib/exm';
import { functionId } from '$lib/contracts/functionId.js';
import { startOfWeek, addDays, addHours } from 'date-fns';
import { newEventStore } from '$lib/localStore.js';


/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const uuid = crypto.randomUUID();
    const weekstart = addHours(startOfWeek(new Date()), 12);
    const data = await request.formData();
    const inputs = [{
      type: 'createPost',
      post: {
        id: uuid,
        author: data.get('username'),
        eventname: data.get('eventname'),
        freq: data.get('frequency'),
        interval: data.get('interval'),
        dtstart: addDays(weekstart, Number(data.get('day'))),
        description: data.get('description'),
      }
    }];
    console.log(inputs);
    try {
      const res = await exmInstance.functions.write(functionId, inputs);
      console.log(res.status);
      newEventStore.set(data);
      return { success: true, url: uuid };
    }
    catch (error) {
      console.log(error);
      return { success: false };
    }
  }
};