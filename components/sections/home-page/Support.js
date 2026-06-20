import HeadingWithOverline from "@/components/ui/HeadingWithOverline";
import SanityImage from "@/components/ui/SanityImage"; // adjust path to match yours


function highlightLastSentence(text) {
  const sentences = text.match(/[^.]+\.?/g) || [text];
  const last = sentences.pop();
  return (
    <>
      {sentences.join("")}
      <span className="text-gold">{last}</span>
    </>
  );
}

const Support = ({ data }) => {
	const { overline, heading, intro, cta, image, items, footnote } = data;

	return (
		<div className="space-y-2 lg:space-y-4">
			<HeadingWithOverline
				flexed
				overline={overline}
				heading={heading}
				body={intro}
				cta={{ ...cta, href: '#contact' }}
			/>
			<div className="grid lg:grid-cols-2 gap-2.5 lg:gap-5">
				<div className="space-y-1 lg:space-y-1.75">
					<div className="relative w-full aspect-[297/256] overflow-hidden rounded-lg">
						<SanityImage
							image={image}
							alt={heading || ''}
							preset="support"
							fill
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>
				<p className="text-paragraph-lg">{highlightLastSentence(footnote)}</p>
				</div>
				<div className="space-y-1 lg:space-y-1.75">
					{items.map((item, i) => (
						<div key={i} className="bg-black/50 space-y-0.5 lg:space-y-0.75 p-0.75 lg:p-1.25 border rounded">
							<h5>{item.title}</h5>
							<p className="text-paragraph">{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Support;