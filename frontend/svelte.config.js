import adapterNode from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapterNode(),
		alias: {
			"admin-comps": "src/admin-components",
			"comps": "src/components"
		}
	},
	
	preprocess: [
		vitePreprocess({
			postcss: true
		})
	],
	//preprocess: preprocess(),

	vitePlugin: {
		experimental: {
			inspector: {
				holdMode: true,
			}
		}
	}		

};

export default config;
