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
		// MDX component usage (e.g. <LinkCard href="/spec/api/">) and raw JSX <a href>
		// arrive as mdxJsxFlowElement / mdxJsxTextElement with an attributes array.
		if (
			(node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
			Array.isArray(node.attributes)
		) {
			for (const attr of node.attributes) {
				if (
					attr &&
					attr.type === 'mdxJsxAttribute' &&
					(attr.name === 'href' || attr.name === 'src') &&
					fix(attr.value)
				) {
					attr.value = BASE + attr.value;
				}
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
				'A research-backed product and build dossier for a pure-software, employee-first expense-reimbursement SaaS for India.',
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
						{ slug: 'start/vision-and-scope' },
						{ slug: 'start/how-to-read' },
					],
				},
				{
					label: 'Phase 1 · Employee Reimbursement',
					items: [
						{ slug: 'phase-1/overview' },
						{ slug: 'phase-1/personas-and-journeys' },
						{ slug: 'phase-1/end-to-end-flow' },
						{
							label: 'Capture',
							items: [
								{ slug: 'phase-1/capture/camera' },
								{ slug: 'phase-1/capture/ocr-itemisation' },
								{ slug: 'phase-1/capture/manual-entry' },
								{ slug: 'phase-1/capture/submit-and-track' },
							],
						},
						{
							label: 'The Web App',
							items: [
								{ slug: 'phase-1/web/employee-portal' },
								{ slug: 'phase-1/web/approver-experience' },
								{ slug: 'phase-1/web/approval-engine' },
								{ slug: 'phase-1/web/finance-console' },
							],
						},
						{
							label: 'Onboarding & Config',
							items: [
								{ slug: 'phase-1/onboarding/company-onboarding' },
								{ slug: 'phase-1/onboarding/configuration-model' },
								{ slug: 'phase-1/onboarding/policy-and-rules' },
							],
						},
						{ slug: 'phase-1/credits-and-metering' },
						{ slug: 'phase-1/payouts' },
						{ slug: 'phase-1/edge-cases' },
						{ slug: 'phase-1/ops-runbooks' },
					],
				},
				{
					label: 'Engineering Spec',
					items: [
						{ slug: 'spec/architecture' },
						{ slug: 'spec/capture-pipeline' },
						{ slug: 'spec/data-model' },
						{ slug: 'spec/api' },
						{ slug: 'spec/state-machines' },
						{ slug: 'spec/config-schema' },
						{ slug: 'spec/rule-schema' },
						{ slug: 'spec/integrations' },
						{ slug: 'spec/security-and-compliance' },
						{ slug: 'spec/non-functionals' },
					],
				},
				{
					label: 'Phase 2 · Vendors',
					items: [
						{ slug: 'phase-2/overview' },
						{ slug: 'phase-2/vendor-onboarding' },
						{ slug: 'phase-2/vendor-tax-engine' },
						{ slug: 'phase-2/payouts-and-ap' },
					],
				},
				{
					label: 'Compliance',
					items: [
						{ slug: 'compliance/regulatory-map' },
						{ slug: 'compliance/money-movement' },
						{ slug: 'compliance/data-protection' },
						{ slug: 'compliance/audit-and-retention' },
					],
				},
				{
					label: 'Strategy',
					items: [
						{ slug: 'strategy/the-problem' },
						{ slug: 'strategy/market' },
						{ slug: 'strategy/competitors' },
						{ slug: 'strategy/pain-points' },
						{ slug: 'strategy/whitespace' },
						{ slug: 'strategy/pricing' },
						{ slug: 'strategy/gtm' },
						{ slug: 'strategy/unit-economics' },
						{ slug: 'strategy/verdict' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ slug: 'reference/bank-files' },
						{ slug: 'reference/glossary' },
						{ slug: 'reference/sources' },
					],
				},
			],
		}),
	],
});
