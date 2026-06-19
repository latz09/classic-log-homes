import HeadingWithOverline from "@/components/ui/HeadingWithOverline";

const ContactSection = ({ data }) => {
	const {
		overline,
		heading,
		body,
		phone,
		availability,
		formHeading,
		formNote,
	} = data;
	return (
		<div>
			<HeadingWithOverline overline={overline} heading={heading} body={body} />
		</div>
	);
};

export default ContactSection;
