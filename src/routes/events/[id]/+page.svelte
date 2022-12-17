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
	const frequency =
		JSON.stringify(data.weeks) === JSON.stringify([1, 2, 3, 4, 5, 6])
			? 'každej tejden.'
			: 'jednou za dva tejdny.';
	const thisweek = data.weeks.includes(
		getWeekOfMonth(new Date(), {
			weekStartsOn: 1
		})
	);
	const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
	const lastEvent = data.day.reverse().find((e) => e <= getDay(new Date()));
	//console.log('last', lastEvent);

	//this is horrible, but the new entry does not have attendance array
	let currentAttendance = data.attendance
		? data.attendance.filter((att) => {
				if (!thisweek && getWeekOfMonth(att.date) === getWeekOfMonth(new Date())) {
					return true;
				} else {
					return getDay(new Date(att.date)) > lastEvent;
				}
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
	<div class="container mx-auto flex flex-col px-4 py-16 md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
		<h1 class="text-4xl font-bold leading-none sm:text-5xl">
			{data.eventname}
			<span class="text-amber-500">{data.author}</span>
		</h1>
		<span class="mt-8 text-lg">{data.description} </span>
		<div class="text-xl mt-2 font-bold mb-12">
			{data.day.map((day) => {
				return days[Number(day)];
			})} - {frequency}
			{thisweek ? 'Včetně tohoto.' : 'Tenhle tejden ne, až ten příští.'}
		</div>
		<div class="flex">
			<div class="p-6 text-5xl font-bold">
				{attendingCount}
			</div>
			<ul>
				{#each currentAttendance as { username, attending }}
					{#if attending === 'true'}
						<li class="list-none flex font-bold mb-4">
							{username}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 ml-2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</li>
					{:else}
						<li class="list-none flex font-bold mb-4">
							{username}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 ml-2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</li>
					{/if}
				{/each}
			</ul>
		</div>

		<div>
			<form
				method="POST"
				class="mt-8 mb-0 max-w-md space-y-4 text-zinc-900"
				use:enhance={({ form, data, action, cancel }) => {
					//console.log('oldAtt', currentAttendance);
					submitting = true;
					return async ({ result, update }) => {
						if (result.type === 'success') {
							$userNameStore = data.get('username');
							//form.reset();
						}

						currentAttendance = currentAttendance.map((a) => {
							if (a?.username === data.get('username')) {
								return { ...a, attending: data.get('attending') };
							}
							return a;
						});
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
						class="w-full border-zinc-200 p-4 pr-12 text-sm shadow-sm text-zinc-900"
						placeholder="takhle tě uvidí ostatní"
						required
					/>
					<button
						name="attending"
						value={true}
						class="ml-3 inline-block active:background-animate  bg-amber-500 px-5 py-3 font-bold text-zinc-900 hover:bg-amber-600  {submitting &&
							`opacity-10`}"
					>
						Jdu
					</button>
					<button
						name="attending"
						value={false}
						class="ml-3 inline-block active:background-animate  bg-zinc-50 px-5 py-3 font-bold text-zinc-900 hover:bg-amber-500  {submitting &&
							`opacity-10`}"
					>
						Nejdu
					</button>
				</div>
			</form>
		</div>
	</div>
</section>
