// /components/sections/shared/contact-form/ContactForm.js
const PROJECT_TYPE_OPTIONS = [
	{ value: 'owner_builder', label: "I'm an owner-builder" },
	{ value: 'contractor', label: "I'm a contractor" },
	{ value: 'unsure', label: 'Still figuring it out' },
];

const baseInputClasses =
	'w-full px-1 py-0.75 border border-black rounded bg-white text-paragraph-sm text-black focus:outline-none focus:border-black transition-all duration-300';

const ContactForm = ({
	formHeading,
	formNote,
	floorPlanOptions = [],
	formData,
	handleInputChange,
	handleProjectTypeChange,
	handleSubmit,
	isLoading,
	error,
	success,
}) => {
	return (
		<form onSubmit={handleSubmit} className='w-full'>
			<div className='mb-1.5 space-y-0.5'>
				<h6 className='text-black'>{formHeading || 'Send a message'}</h6>
				<p className='text-paragraph text-black/80'>
					{formNote || 'Responds within 1-2 business days.'}
				</p>
			</div>

			<div className='grid md:grid-cols-2 gap-1 mb-1.25 lg:mb-2.5'>
				<div>
					<input
						type='text'
						id='name'
						name='name'
						value={formData.name}
						onChange={handleInputChange}
						required
						placeholder='First and last name'
						className={baseInputClasses}
					/>
				</div>

				<div>
					<input
						type='tel'
						id='phoneNumber'
						name='phoneNumber'
						value={formData.phoneNumber}
						onChange={handleInputChange}
						required
						placeholder='(123) 456-7890'
						className={baseInputClasses}
					/>
				</div>

				<div>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						required
						placeholder='you@example.com'
						className={baseInputClasses}
					/>
				</div>

				<div>
					<select
						id='floorPlan'
						name='floorPlan'
						value={formData.floorPlan}
						onChange={handleInputChange}
						className={`${baseInputClasses} text-black/80 `}
					>
						<option value='text-black'>Select a floor plan</option>
						{floorPlanOptions.map((plan) => (
							<option key={plan} value={plan} className='text-black'>
								{plan}
							</option>
						))}
					</select>
				</div>

				<div className='md:col-span-2'>
					<textarea
						id='description'
						name='description'
						value={formData.description}
						onChange={handleInputChange}
						placeholder='Describe your project, include notes about your land, build timeline, and any questions ...'
						rows='5'
						className={`${baseInputClasses} resize-none`}
					/>
				</div>

				<div className='md:col-span-2'>
					<span className='text-caption font-semibold block mb-0.5 text-black/80'>
						Project type:
					</span>
					<div className='flex flex-wrap gap-0.75'>
						{PROJECT_TYPE_OPTIONS.map((option) => {
							const isSelected = formData.projectType === option.value;
							return (
								<label
									key={option.value}
									className={`flex items-center gap-0.5 px-1 py-0.5 border rounded text-paragraph-sm text-black cursor-pointer transition-colors duration-200  ${
										isSelected ? 'border-black bg-darkGold text-snow' : 'border-black/20 hover:bg-gold'
									}`}
								>
									<input
										type='radio'
										name='projectType'
										value={option.value}
										checked={isSelected}
										onChange={() => handleProjectTypeChange(option.value)}
										className='accent-secondary'
									/>
									{option.label}
								</label>
							);
						})}
					</div>
				</div>
			</div>

			<button
				type='submit'
				disabled={isLoading}
				className=' bg-darkGold text-button text-white px-1.25 py-0.75 rounded border border-primary hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
			>
				{isLoading ? 'Sending...' : 'Send message'}
			</button>

			{error && (
				<p className='mt-1 p-1 rounded border border-black/20 text-caption text-black/70 bg-white'>
					{error}
				</p>
			)}
			{success && (
				<p className='mt-1 p-1 rounded border border-secondary text-caption text-primary bg-white'>
					{success}
				</p>
			)}
		</form>
	);
};

export default ContactForm;
