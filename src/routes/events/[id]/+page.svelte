<script>
	/** @type {import('./$types').PageData} */
	/** @type {import('./$types').ActionData} */
	import { userNameStore } from '$lib/localStore.js';
	import { getWeekOfMonth, getDay } from 'date-fns';
	import { enhance } from '$app/forms';

	export let form;
	export let data;

	let submitting = false;

	//console.log('client', data);

	const days = [
		'Každá neděle',
		'Každé pondělí',
		'Každé úterý',
		'Každá středa',
		'Každý čtvrtek',
		'Každý pátek',
		'Každá sobota'
	];
	const frequency = ['denně', 'týdně', 'měsíčně', 'ročně'];
	const addOrReplace = (arr, newObj) => [
		...arr.filter((o) => o.username !== newObj.username),
		{ ...newObj }
	];
	//this is horrible, but the new entry does not have attendance array
	let currentAttendance = data.attendance
		? data.attendance.filter((att) => {
				return new Date(data.lastevent) < new Date(att.date) < new Date(data.nextevent);
		  })
		: [];
	$: attendingCount =
		currentAttendance &&
		currentAttendance.filter((a) => {
			return a.attending === 'true';
		}).length;
	//console.log(attendingCount)
</script>

<section>
	<div class="container mx-auto flex flex-col px-4 md:pt-44 pt-28  md:px-10 lg:px-32 xl:max-w-3xl">
		<h1 class="text-4xl font-bold leading-none sm:text-5xl">
			{data.eventname}
			<span class="text-amber-500">{data.author}</span>
		</h1>
		<span class="mt-8 text-lg">{data.description} </span>
		<div class="text-xl mt-2 font-bold mb-12">
			{days[getDay(new Date(data.dtstart))]}
			{data.interval}x
			{frequency[data.freq]}, další je
			<span class=" text-amber-500"
				>{new Date(data.nextevent).toLocaleDateString('cs-CZ', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}</span
			>
		</div>
		<div class="flex p-4 space-x-4 rounded-lg md:space-x-6  text-gray-100">
			<div class="flex justify-center p-2 align-middle rounded-full sm:p-4 bg-amber-500">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-9 w-9 text-zinc-800"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
					/>
				</svg>
			</div>
			<div class="flex flex-col justify-center align-middle">
				<p class="text-3xl font-semibold leading-none">{attendingCount}</p>
				<p>příště jdou</p>
			</div>
		</div>

		<ul class="w-full items-center flex flex-wrap gap-4 mt-4">
			{#each currentAttendance as { username, attending }}
				{#if attending === 'true'}
					<li class="list-none flex font-bold mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 mr-2 text-green-300"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						{username}
					</li>
				{:else}
					<li class="list-none flex font-bold mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 mr-2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						{username}
					</li>
				{/if}
			{/each}
		</ul>

		<div>
			<form
				method="POST"
				class="mt-8 mb-0 max-w-md space-y-4 text-zinc-900"
				use:enhance={({ form, data, action, cancel }) => {
					//console.log('oldAtt', currentAttendance);
					submitting = true;
					currentAttendance = addOrReplace(currentAttendance, {
						username: data.get('username'),
						attending: data.get('attending'),
						date: new Date().toJSON()
					});
					return async ({ result, update }) => {
						if (result.type === 'success') {
							$userNameStore = data.get('username');
							//form.reset();
						}

						submitting = false;
						//console.log('newAtt', currentAttendance);
						//update();
					};
				}}
			>
				<input type="hidden" name="postdata" value={JSON.stringify(data)} />
				<label for="username" class="text-sm text-zinc-400">Tvoje jméno</label>
				<div class="flex">
					<input
						type="text"
						name="username"
						value={form?.username ?? $userNameStore}
						class="w-full border-zinc-200 p-4 pr-12 text-sm shadow-sm text-zinc-900 rounded-full"
						placeholder="takhle tě uvidí ostatní"
						required
					/>
					<button
						name="attending"
						value={true}
						class="ml-3 inline-block rounded-full  bg-amber-500 px-5 py-3 font-bold text-zinc-900 hover:bg-amber-600  {submitting &&
							`opacity-10`}"
					>
						Jdu
					</button>
					<button
						name="attending"
						value={false}
						class="ml-3 inline-block rounded-full  bg-zinc-50 px-5 py-3 font-bold text-zinc-900 hover:bg-amber-500  {submitting &&
							`opacity-10`}"
					>
						Nejdu
					</button>
				</div>
			</form>
		</div>
	</div>
</section>
