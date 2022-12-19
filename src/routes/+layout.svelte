<script>
	import '../app.css';
	import Navigation from '../components/Navigation.svelte';
	/** @type {import('./$types').LayoutData} */
	export let data;
	//console.log(data);
</script>

<Navigation {data} />
<slot />
