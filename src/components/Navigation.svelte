<script>
	import AutoComplete from 'simple-svelte-autocomplete';
	import { goto } from '$app/navigation';
	export let data;
	let selectedEvent;
	const dataVals = Object.values(data?.posts);
	const eventNamesAndIds = dataVals.map((event) => ({ id: event.id, eventname: event.eventname }));
	function forwardtoevent() {
		//console.log(selectedEvent);
		if (selectedEvent?.id) {
			goto(`/events/${selectedEvent.id}`);
		}
	}
</script>

<header aria-label="Page Header" class="bg-zinc-900/80 backdrop-blur fixed w-full">
	<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="flex items-center justify-end gap-4">
			<div class="flex items-center gap-4 opacity-90">
				<div class="relative">
					<label class="sr-only" for="search"> Hledání </label>

					<AutoComplete
						class="h-10 w-full rounded-full border-none bg-white pl-4 pr-10 text-sm shadow-sm sm:w-56 text-zinc-900"
						items={eventNamesAndIds}
						bind:selectedItem={selectedEvent}
						labelFieldName="eventname"
						hideArrow
						placeholder="hledej"
						noInputStyles
						dropdownClassName="rounded-xl mt-2 [&>*]:rounded-full"
						onChange={forwardtoevent}
					>
						<div slot="item" class="my-2 text-sm" let:label>
							{label}
						</div>
					</AutoComplete>

					<button
						type="button"
						class="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
					>
						<span class="sr-only">Hledej</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
				</div>

				<a
					href="/about"
					class="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
				>
					<span class="sr-only">O co tady jde</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
						/>
					</svg>
				</a>
			</div>

			<span aria-hidden="true" class="block h-6 w-px rounded-full bg-gray-200" />

			<a href="/" class="block shrink-0">
				<span class="sr-only">Domů</span>
				<span
					class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-red-500 to-yellow-500 background-animate"
					>*</span
				>
			</a>
		</div>

		<div class="hidden md:flex">
			<a
				href="/"
				class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-red-500 to-yellow-500 background-animate"
				>JDU</a
			>
		</div>
	</div>
</header>
