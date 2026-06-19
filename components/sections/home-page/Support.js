import HeadingWithOverline from "@/components/ui/HeadingWithOverline";

const Support = ({ data }) => {
	const { overline, heading, intro, cta, image, items, footnote } = data;

	return (
		<div>
			<HeadingWithOverline
				flexed
				overline={overline}
				heading={heading}
				body={intro}
				cta={{ ...cta, href: '/contact' }}
			/>
		</div>
	);
};

export default Support;