// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkGfm from 'remark-gfm';

// GitHub Pages project site, served under a subpath:
//   https://javajack.github.io/reimbursement/
// To move to a custom domain served at the root, set BASE = '/' and update SITE.
const SITE = 'https://javajack.github.io';
const BASE = '/reimbursement';

// Starlight base-prefixes its own navigation, but NOT root-relative links written
// inside page content (markdown links, raw <a>, <img>). This rehype plugin prefixes
// BASE onto those so every cross-link keeps working under the /reimbursement/ subpath,
// while the source content stays clean and portable (no hardcoded base).
function rehypeBasePaths() {
	if (BASE === '/' || !BASE) return () => {};
	const fix = (v) =>
		typeof v === 'string' &&
		v.startsWith('/') &&
		!v.startsWith('//') &&
		v !== BASE &&
		!v.startsWith(BASE + '/');
	const walk = (node) => {
		if (node.type === 'element' && node.properties) {
			for (const attr of ['href', 'src']) {
				if (fix(node.properties[attr])) node.properties[attr] = BASE + node.properties[attr];
			}
		}
		if (Array.isArray(node.children)) node.children.forEach(walk);
	};
	return (tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
	site: SITE,
	base: BASE,
	markdown: {
		// Astro 6 + @astrojs/mdx 5 does not apply GFM tables to .mdx by default; enable explicitly.
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeBasePaths],
	},
	integrations: [
		starlight({
			title: 'Kharcha',
			logo: { src: './src/assets/mark.svg', alt: 'Kharcha' },
			favicon: '/favicon.svg',
			description:
				'A research-backed build dossier for an India-first employee & vendor expense-reimbursement SaaS.',
			customCss: ['./src/styles/custom.css'],
			components: {
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			expressiveCode: { themes: ['github-light'] },
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			lastUpdated: false,
			head: [
				{ tag: 'script', content: "document.documentElement.dataset.theme='light';" },
			],
			sidebar: [
				{
					label: 'Start Here',
					items: [
						{ label: 'Overview', link: '/' },
						{ slug: 'overview/executive-summary' },
						{ slug: 'overview/the-problem' },
					],
				},
				{
					label: 'Market & Opportunity',
					items: [
						{ slug: 'market/size' },
						{ slug: 'market/competitors-india' },
						{ slug: 'market/competitors-global' },
						{ slug: 'market/pain-points' },
						{ slug: 'market/whitespace' },
					],
				},
				{
					label: 'Users & Buyers',
					items: [{ slug: 'users/personas' }, { slug: 'users/buyers-icp' }],
				},
				{
					label: 'Product',
					items: [
						{ slug: 'product/workflow' },
						{ slug: 'product/maker-checker' },
						{ slug: 'product/rule-engine' },
						{ slug: 'product/non-reimbursables' },
						{ slug: 'product/ocr' },
						{ slug: 'product/onboarding-kyc' },
						{ slug: 'product/payouts' },
						{ slug: 'product/edge-cases' },
						{ slug: 'product/mvp-scope' },
					],
				},
				{
					label: 'Compliance & Risk',
					items: [
						{ slug: 'compliance/regulatory-map' },
						{ slug: 'compliance/money-movement' },
						{ slug: 'compliance/data-protection' },
						{ slug: 'compliance/audit-retention' },
					],
				},
				{
					label: 'Business',
					items: [
						{ slug: 'business/pricing' },
						{ slug: 'business/freemium' },
						{ slug: 'business/gtm' },
						{ slug: 'business/unit-economics' },
						{ slug: 'business/integrations' },
						{ slug: 'business/roadmap' },
						{ slug: 'business/risks' },
						{ slug: 'business/verdict' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ slug: 'reference/rule-schema' },
						{ slug: 'reference/bank-files' },
						{ slug: 'reference/glossary' },
						{ slug: 'reference/sources' },
					],
				},
			],
		}),
	],
});
