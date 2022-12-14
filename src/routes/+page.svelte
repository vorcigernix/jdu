<main class="pt-20 min-h-screen">
	<section class="body-font">
		<div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
			<div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
				<img class="object-cover object-center " alt="hero" src="party.svg" />
			</div>
			<div
				class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"
			>
				<h1 class="title-font sm:text-4xl text-5xl mb-4 font-bold ">
					Zjisti jestli se <span class="text-amber-500">sejdete</span>!
				</h1>
				<p class="mb-8 leading-relaxed">
					Tahle aplikace slouží k vytvoření opakujících se akcí jako jsou například tréninky.
					Jakmile založíš akci, ostatní se na ní budou moct přihlásit.
				</p>
				<div class="flex w-full md:justify-start justify-center items-end">
					<div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
						<label for="hero-field" class="leading-7 text-sm text-zinc-400">Najdi událost:</label>
						<input
							type="text"
							id="hero-field"
							name="hero-field"
							class="w-full bg-zinc-800  border bg-opacity-40 border-zinc-700 focus:ring-2 focus:ring-amber-900 focus:bg-transparent focus:border-amber-500 text-base outline-none text-zinc-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out h-10"
						/>
					</div>
					<button
						class="h-10 inline-flex text-zinc-900 bg-amber-500 border-0 py-2 px-6 focus:outline-none hover:bg-amber-600 "
						><svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="w-6 h-6 mr-2"
						>
							<path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
							<path
								fill-rule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z"
								clip-rule="evenodd"
							/>
						</svg>
						Hledej</button
					>
				</div>
			</div>
		</div>
	</section>
</main>
