import { exmInstance } from '$lib/exm';
import { functionId } from '$lib/contracts/functionId.js';
import { getWeekOfMonth } from 'date-fns';
import { newEventStore } from '$lib/localStore.js';


/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const uuid = crypto.randomUUID();
    const evenweek = ((getWeekOfMonth((new Date), {
      weekStartsOn: 1
    })) % 2 === 0);
    //console.log(evenweek);
    const data = await request.formData();
    const weeks = data.get('frequency') === '1' ? [1, 2, 3, 4] : evenweek ? [2, 4, 6] : [1, 3, 5];
    const inputs = [{
      type: 'createPost',
      post: {
        id: uuid,
        author: data.get('username'),
        eventname: data.get('eventname'),
        eventname: data.get('eventname'),
        weeks: weeks,
        day: data.get('day'),
        description: data.get('description'),
      }
    }];
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