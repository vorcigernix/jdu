<script>
	import { getDay } from 'date-fns';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { userNameStore } from '$lib/localStore.js';

	/** @type {import('./$types').ActionData} */
	export let form;
	let submitting = false;
	let today = getDay(new Date());
	async function handleClick() {
		await navigator.clipboard.writeText(`https://${$page.url.host}/events/${form.url}`);
	}
	//console.log($page.url.host)
</script>

{#if form?.success}
	<section class="py-6 pt-20 md:pt-32 text-zinc-50">
		<div
			class="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48"
		>
			<h1
				class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 background-animate text-center"
			>
				Jop, máš to tam.
			</h1>
			<div class="text-xl font-medium text-center flex">
				Tvoje nová parádní událost je připravená. Bylo by dobrý tu adresu zkopírovat a poslat
				kámošům, protože určitě zapomeneš jak si to pojmenoval a už to nikdy nenajdeš. Máme na to
				tlačítko, ale Ctrl+V v mailu už musíš zmáčknout sám/sama.
			</div>
			<div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
				<button
					class="px-8 py-3 text-lg font-semibold  bg-amber-500 text-zinc-900 rounded-full"
					on:click={handleClick}>Zkopíruj adresu</button
				>
				<a
					href={`https://${$page.url.host}/events/${form.url}`}
					class="px-8 py-3 text-lg font-normal border  bg-zinc-100 text-zinc-900 border-zinc-300 rounded-full"
					>Jdi na událost</a
				>
			</div>
		</div>
	</section>
{:else}
	<section class="flex flex-wrap lg:h-screen pt-20 md:pt-32">
		<div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8">
			<div class="mx-auto max-w-lg text-center">
				<h1 class="text-2xl font-bold sm:text-3xl">Založ novou událost!</h1>

				<p class="mt-4 text-zinc-500">
					Potřebujem vědět nějaký základní věci, aby ostatní co se chtěj přihlásit věděli na co se
					to jako hlásí.
				</p>
			</div>

			<form
				method="POST"
				class="mx-auto mt-8 mb-0 max-w-md space-y-6 text-zinc-900 {submitting && `opacity-10`}"
				use:enhance={({ form, data, action, cancel }) => {
					submitting = true;
					return async ({ result, update }) => {
						if (result.type === 'success') {
							$userNameStore = data.get('username');
							form.reset();
						}
						update();
					};
				}}
			>
				<div class="flex flex-col space-y-2">
					<label for="username" class="text-sm text-zinc-400">Tvoje jméno</label>

					<div>
						<input
							type="text"
							name="username"
							value={$userNameStore}
							class="w-full border-zinc-200 p-4 pr-12 text-sm shadow-sm rounded-full"
							placeholder="takhle tě uvidí ostatní"
							required
						/>
					</div>
				</div>

				<div class="flex flex-col space-y-2">
					<label for="eventname" class="text-sm text-zinc-400">Jméno události</label>
					<div>
						<input
							type="text"
							name="eventname"
							class="w-full border-zinc-200 p-4 pr-12 text-sm shadow-sm rounded-full"
							placeholder="podle čeho ostatní poznaj kam jdou"
							required
						/>
					</div>
				</div>

				<div>
					<fieldset class="flex flex-col space-y-2">
						<legend class="text-sm text-zinc-400">Každej</legend>
						<div
							class="inline-flex items-center justify-center p-2 rounded-md cursor-pointer w-full"
						>
							<input
								type="number"
								class="text-center border-zinc-200 text-sm shadow-sm rounded-full outline-none appearance-none w-10 h-10 spin-button-none mr-4"
								name="interval"
								value="1"
								min="1" step="1" max="31"
								required
							/>

							<div class="">
								<input
									type="radio"
									id="frequencyChoice1"
									name="frequency"
									value={1}
									checked
									class="hidden peer"
									required
								/>
								<label
									for="frequencyChoice1"
									class="px-4 py-2 rounded-l-full peer-checked:bg-amber-500 bg-zinc-800 peer-checked:text-zinc-900 text-zinc-50 cursor-pointer"
									>Tejden</label
								>
							</div>
							<div class="">
								<input
									type="radio"
									id="frequencyChoice2"
									name="frequency"
									value={2}
									class="hidden peer"
									required
								/>
								<label
									for="frequencyChoice2"
									class="px-4 py-2 rounded-r-full bg-zinc-800 peer-checked:bg-amber-500 peer-checked:text-zinc-900 text-zinc-50 cursor-pointer"
									>Měsíc</label
								>
							</div>
						</div>
					</fieldset>
				</div>
				<div>
					<fieldset class="w-full">
						<legend class="text-sm text-zinc-400 mb-2">Dny</legend>
						<div class="gap-4 flex justify-between" required>
							<div class="flex flex-col ">
								<input
									type="radio"
									id="mo"
									class="hidden peer"
									name="day"
									value={1}
									checked={today === 1}
								/>
								<label
									for="mo"
									class="rounded-full w-8 h-8 justify-center items-center flex font-bold bg-zinc-900 text-zinc-50 cursor-pointer flex-grow p-2 text-center peer-checked:bg-amber-500 peer-checked:font-bold peer-checked:text-zinc-900"
									>Po</label
								>
							</div>

							<div class="flex flex-col">
								<input
									type="radio"
									id="tue"
									class="hidden peer"
									name="day"
									value={2}
									checked={today === 2}
								/>
								<label
									for="tue"
									class="rounded-full w-8 h-8 justify-center items-center flex font-bold bg-zinc-900 text-zinc-50 cursor-pointer flex-grow p-2 text-center peer-checked:bg-amber-500 peer-checked:font-bold peer-checked:text-zinc-900"
									>Út</label
								>
							</div>

							<div class="flex flex-col">
								<input
									type="radio"
									id="wed"
									class="hidden peer"
									name="day"
									value={3}
									checked={today === 3}
								/>
								<label
									for="wed"
									class="rounded-full w-8 h-8 justify-center items-center flex font-bold bg-zinc-900 text-zinc-50 cursor-pointer flex-grow p-2 text-center peer-checked:bg-amber-500 peer-checked:font-bold peer-checked:text-zinc-900"
									>St</label
								>
							</div>

							<div class="flex flex-col">
								<input
									type="radio"
									id="thu"
									class="hidden peer"
									name="day"
									value={4}
									checked={today === 4}
								/>
								<label
									for="thu"
									class="rounded-full w-8 h-8 justify-center items-center flex font-bold bg-zinc-900 text-zinc-50 cursor-pointer flex-grow p-2 text-center peer-checked:bg-amber-500 peer-checked:font-bold peer-checked:text-zinc-900"
									>Čt</label
								>
							</div>

							<div class="flex flex-col">
								<input
									type="radio"
									id="fri"
									class="hidden peer"
									name="day"
									value={5}
									checked={today === 5}
								/>
								<label
									for="fri"
									class="rounded-full w-8 h-8 justify-center items-center flex font-bold bg-zinc-900 text-zinc-50 cursor-pointer flex-grow p-2 text-center peer-checked:bg-amber-500 peer-checked:font-bold peer-checked:text-zinc-900"
									>Pá</label
								>
							</div>

							<div class="flex flex-col">
								<input
									type="radio"
									id="sat"
									class="hidden peer"
									name="day"
									value={6}
									checked={today === 6}
								/>
								<label
									for="sat"
									class="rounded-full w-8 h-8 justify-center items-center flex font-bold bg-zinc-900 text-zinc-50 cursor-pointer flex-grow p-2 text-center peer-checked:bg-amber-500 peer-checked:font-bold peer-checked:text-zinc-900"
									>So</label
								>
							</div>

							<div class="flex flex-col">
								<input
									type="radio"
									id="sun"
									class="hidden peer"
									name="day"
									value={0}
									checked={today === 0}
								/>
								<label
									for="sun"
									class="rounded-full w-8 h-8 justify-center items-center flex font-bold bg-zinc-900 text-zinc-50 cursor-pointer flex-grow p-2 text-center peer-checked:bg-amber-500 peer-checked:font-bold peer-checked:text-zinc-900"
									>Ne</label
								>
							</div>
						</div>
					</fieldset>
				</div>
				<div class="flex flex-col space-y-2">
					<label for="description" class="text-sm text-zinc-400">Popis</label>
					<textarea
						id="description"
						name="description"
						rows={3}
						placeholder="nějakej popis, o co tam jako jde"
						class="w-full text-zinc-800 text-sm rounded-xl"
						required
					/>
				</div>

				<div class="flex items-center justify-between">
					<p class="text-sm text-zinc-500">
						<a href="/about" class="underline">Jak to funguje?</a>
					</p>

					<button
						class="ml-3 inline-block  bg-amber-500 px-5 py-3 font-bold text-zinc-900 rounded-full"
					>
						Založit
					</button>
				</div>
			</form>
		</div>

		<div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 md:p-12">
			<img alt="ilustrace běžce" src="runner.svg" class=" h-full w-full object-contain" />
		</div>
	</section>
{/if}
