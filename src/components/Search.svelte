<script>
	export let data;

	const dataVals = Object.values(data?.posts);
	//console.log(dataVals);
	const eventNamesAndIds = dataVals.map((event) => ({
		id: event.id,
		eventname: event.eventname,
		author: event.author
	}));
	let searchTerm = '';
	$: filteredList = eventNamesAndIds.filter((item) => item.eventname.indexOf(searchTerm) !== -1);
</script>

<fieldset class="w-full space-y-1 text-zinc-100">
	<label for="Search" class="hidden">Hledej</label>
	<div class="relative">
		<span class="absolute inset-y-0 left-0 flex items-center pl-2">
			<button type="button" title="search" class="p-1 focus:outline-none focus:ring">
				<svg fill="currentColor" viewBox="0 0 512 512" class="w-4 h-4 text-zinc-100">
					<path
						d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"
					/>
				</svg>
			</button>
		</span>
		<input
			type="search"
			name="Search"
			bind:value={searchTerm}
			placeholder="Hledej..."
			class="w-52 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none border-zinc-800 bg-zinc-800 text-zinc-100 focus:bg-zinc-900 focus:border-yellow-400"
		/>
		{#if searchTerm.length > 1}
			<div
				class="absolute right-0 z-50 w-full md:w-64 bg-zinc-800 border border-zinc-900 rounded-md text-zinc-50 shadow-lg mt-2"
			>
				<ul class="p-2 space-y-1 overflow-auto max-h-64">
					{#each filteredList as e (e.id)}
						<li>
							<a
								on:click={() => {
									searchTerm = '';
								}}
								class="flex flex-col md:flex-row items-center justify-between px-4 py-4 font-medium rounded-md hover:text-zinc-900 hover:bg-zinc-100 focus:bg-zinc-50"
								href={`/events/${e.id}`}
								><span>{e.eventname}</span><span
									class="block rounded bg-black px-1.5 py-0.5 text-[10px] text-white"
									>{e.author}</span
								></a
							>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</fieldset>
