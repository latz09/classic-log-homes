import HeadingWithOverline from "@/components/ui/HeadingWithOverline";

const Reviews = ({data}) => {
const {overline, heading, testimonials} = data;

    return ( 
        <div>
            <HeadingWithOverline overline={overline} heading={heading} />
        </div>
     );
}
 
export default Reviews;