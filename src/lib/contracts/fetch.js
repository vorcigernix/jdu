import { exmInstance } from './exmInstance.js';
import { functionId } from './functionId.js';

const inputs = [{
  type: 'fetchPost',
  postId: process.argv[2]
}];

const res = await exmInstance.functions.write(functionId, inputs);
//console.log(res);
const posts = res.data?.execution?.state?.posts || null;
console.log(posts);
//const key = Object.keys(posts)[0];
//const { [key]: record } = posts;
//console.log(record);