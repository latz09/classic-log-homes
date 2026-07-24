import { urlFor } from './sanityConnection';

export function getSanityImageUrl(image, options = {}) {
	if (!image?.asset) return null;

	const {
		width = 1920,
		height = 1080,
		quality = 90,
		format = 'webp',
		fit = 'crop',
	} = options;

	let builder = urlFor(image)
		.width(width)
		.quality(quality)
		.format(format)
		.fit(fit);

	// Only lock height when one is actually requested. Passing width + height
	// together makes the builder emit a rect= crop from the hotspot — that's
	// what was cutting the blueprints off.
	if (height) builder = builder.height(height);

	return builder.url();
}

// Sanity encodes source dimensions in the asset ref:
// image-<hash>-1000x869-jpg
export function getImageDimensions(image) {
	const ref = image?.asset?._ref || image?.asset?._id;
	if (!ref) return null;
	const [w, h] = (ref.split('-')[2] || '').split('x').map(Number);
	return w && h ? { width: w, height: h } : null;
}

const SRCSET_WIDTHS = [640, 1024, 1600, 2400];

// Responsive candidates for the lightbox. Capped at the native width so we
// never advertise a size Sanity can't actually deliver with fit:'max'.
export function getSanityImageSrcSet(image, options = {}) {
	const { widths = SRCSET_WIDTHS, quality = 85, format = 'webp' } = options;
	const dims = getImageDimensions(image);
	if (!dims) return [];

	const ratio = dims.height / dims.width;
	const maxWidth = Math.min(dims.width, Math.max(...widths));
	const candidates = Array.from(
		new Set([...widths.filter((w) => w < maxWidth), maxWidth]),
	).sort((a, b) => a - b);

	return candidates.map((width) => ({
		src: getSanityImageUrl(image, {
			width,
			height: null,
			quality,
			format,
			fit: 'max',
		}),
		width,
		height: Math.round(width * ratio),
	}));
}

export function getHotspotStyles(image) {
	if (!image?.hotspot) return { objectPosition: 'center center' };
	const { x, y } = image.hotspot;
	return { objectPosition: `${x * 100}% ${y * 100}%` };
}

export function getResponsiveImageUrls(image, breakpoints = {}) {
	if (!image?.asset) return {};

	const defaultBreakpoints = {
		mobile: { width: 640, height: 360 },
		tablet: { width: 1024, height: 576 },
		desktop: { width: 1920, height: 1080 },
		...breakpoints,
	};

	const urls = {};
	Object.entries(defaultBreakpoints).forEach(([key, { width, height }]) => {
		urls[key] = getSanityImageUrl(image, { width, height });
	});
	return urls;
}

export const IMAGE_PRESETS = {
	whatYourBuying: { width: 1360, height: 630, quality: 90 },
	millwork: { width: 1360, height: 372, quality: 90 },
	support: { width: 1188, height: 1024, quality: 90 },
	// Uncropped: width only, fit:'max'. Use this for anything where losing
	// edges is unacceptable — plans, documents, diagrams.
	lightbox: { width: 2400, height: null, quality: 90, fit: 'max' },
	document: { width: 1200, height: null, quality: 85, fit: 'max' },
	hero: { width: 1920, height: 1080, quality: 90 },
	card: { width: 400, height: 300, quality: 85 },
	cardWide: { width: 600, height: 400, quality: 85 },
	thumbnail: { width: 200, height: 150, quality: 80 },
	gallery: { width: 800, height: 600, quality: 90 },
	fullWidth: { width: 1200, height: 800, quality: 90 },
	square: { width: 600, height: 600, quality: 85 },
	portrait: { width: 600, height: 800, quality: 85 },
};