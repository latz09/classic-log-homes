'use client';

import { motion } from 'framer-motion';
import RevealStagger, {fadeUp} from '@/components/animations/RevealStagger';

const Pillars = ({ data }) => {
	const { items } = data;

	return (
		<RevealStagger className='grid grid-cols-2 xl:grid-cols-4 gap-0.75 lg:gap-2 xl:gap-4 3xl:gap-5 backdrop-blur-sm bg-black/10 z-50'>
			{items.map((item, i) => (
				<motion.div
					key={i}
					variants={fadeUp}
					className='bg-white/10 p-0.5 lg:p-1.25 3xl:p-2 border border-white rounded-lg space-y-0.5 lg:space-y-0.75 text-center xl:text-start'
				>
					<h4>{item.value}</h4>
					<p className='text-paragraph'>{item.label}</p>
				</motion.div>
			))}
		</RevealStagger>
	);
};

export default Pillars;