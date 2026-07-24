import {
	getHotspotStyles,
	getSanityImageUrl,
	IMAGE_PRESETS,
} from '@/utils/cms/getSanityImageUrl';
import Image from 'next/image';

const SanityImage = ({
	image,
	alt,
	preset = 'fullWidth',
	customSize = null,
	className = '',
	objectFit = 'cover',
	fill = false,
	priority = false,
	sizes = '100vw',
	unoptimized = true, // Sanity's CDN already resized + re-encoded this
	...props
}) => {
	if (!image?.asset) return null;

	const sizeOptions = customSize || IMAGE_PRESETS[preset] || IMAGE_PRESETS.fullWidth;
	const imageUrl = getSanityImageUrl(image, sizeOptions);
	if (!imageUrl) return null;

	// object-position only matters when we're cropping
	const hotspotStyles = objectFit === 'cover' ? getHotspotStyles(image) : undefined;
	const resolvedAlt = alt ?? image.alt ?? '';

	const shared = {
		src: imageUrl,
		alt: resolvedAlt,
		sizes,
		className: `object-${objectFit} ${className}`,
		style: hotspotStyles,
		priority,
		unoptimized,
		...props,
	};

	if (fill) return <Image {...shared} fill />;

	return (
		<Image
			{...shared}
      alt={resolvedAlt}
			width={sizeOptions.width}
			height={sizeOptions.height ?? undefined}
		/>
	);
};

export default SanityImage;