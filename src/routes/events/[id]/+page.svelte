<script>
	/** @type {import('./$types').PageData} */
	import { userNameStore } from '$lib/localStore.js';
	import { getWeekOfMonth } from 'date-fns';
	export let data;
	console.log('client', data);

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
		<div>
			<label for="username" class="text-sm text-zinc-400">Tvoje jméno</label>
			<div class="flex">
				<input
					type="text"
					name="username"
					value={$userNameStore}
					class="w-full border-zinc-200 p-4 pr-12 text-sm shadow-sm text-zinc-900"
					placeholder="takhle tě uvidí ostatní"
					required
				/>
				<button
					class="ml-3 inline-block  bg-amber-500 px-5 py-3 font-bold text-zinc-900 hover:bg-amber-600"
				>
					Jdu
				</button>
				<button
					class="ml-3 inline-block  bg-zinc-50 px-5 py-3 font-bold text-zinc-900 hover:bg-amber-500"
				>
					Nejdu
				</button>
			</div>
		</div>
	</div>
</section>
