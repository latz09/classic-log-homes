'use client';

import { motion } from 'framer-motion';

const container = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.12, delayChildren: 0.05 },
	},
};

export const fadeUp = {
	hidden: { opacity: 0, y: 28 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
	},
};

const RevealStagger = ({ children, className, ...props }) => (
	<motion.div
		className={className}
		variants={container}
		initial='hidden'
		whileInView='show'
		viewport={{ once: true, amount: 0.2 }}
		{...props}
	>
		{children}
	</motion.div>
);

export default RevealStagger;