<script>
	import { blur } from 'svelte/transition';
</script>

<main class="pt-20 min-h-screen" transition:blur={{ amount: 10 }}>
	<section class="body-font">
		<div
			class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center  max-w-screen-xl sm:px-6 lg:px-8"
		>
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
					<a
						href="/new"
						class="h-10 inline-flex text-zinc-900 rounded-full bg-amber-500 border-0 py-2 px-6 focus:outline-none hover:bg-amber-600"
					>
						<span class="text-xl mr-2 font-bold">* </span>Nová událost</a
					>
				</div>
			</div>
		</div>
	</section>
</main>
