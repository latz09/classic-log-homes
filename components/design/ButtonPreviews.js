import ButtonLink from '../ui/ButtonLink';

const ButtonPreviews = () => {
	return (
		<div className='my-3'>
			{/* Light background buttons */}
			<div className='max-w-5xl bg-white py-4 mx-auto px-2 grid place-items-center border-t'>
				<div className='py-1 flex gap-1'>
					<ButtonLink variant='primary-on-light' href='#'>
						Primary on Light
					</ButtonLink>
					<ButtonLink variant='secondary-on-light' href='#'>
						Secondary on Light
					</ButtonLink>
					<ButtonLink variant='tertiary-on-light' href='#'>
						Tertiary on Light
					</ButtonLink>
				</div>
			</div>

			{/* Dark background section */}
			<div className='bg-dark py-4 grid place-items-center'>
				<div className='max-w-5xl mx-auto px-2'>
					<div className='py-1 flex gap-1'>
						<ButtonLink variant='primary-on-dark' href='#'>
							Primary on Dark
						</ButtonLink>
						<ButtonLink variant='secondary-on-dark' href='#'>
							Secondary on Dark
						</ButtonLink>
						<ButtonLink variant='tertiary-on-dark' href='#'>
							Tertiary on Dark
						</ButtonLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ButtonPreviews;