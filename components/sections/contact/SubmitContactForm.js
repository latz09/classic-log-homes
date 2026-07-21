// /components/sections/shared/contact-form/SubmitContactForm.js
'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';

const SubmitContactForm = ({
	formHeading,
	formNote,
	floorPlanOptions,
	currentPlanName,
}) => {
	const [formData, setFormData] = useState({
		name: '',
		phoneNumber: '',
		email: '',
		floorPlan: currentPlanName || '',
		description: '',
		projectType: '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleProjectTypeChange = (value) => {
		setFormData((prev) => ({ ...prev, projectType: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		setSuccess('');

		try {
			const response = await fetch('/api/submitContactForm', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (result.success) {
				if (typeof window !== 'undefined' && window.gtag) {
					window.gtag('event', 'form_submit', {
						project_type: formData.projectType || 'not_specified',
					});
				}

				setFormData({
					name: '',
					phoneNumber: '',
					email: '',
					floorPlan: currentPlanName || '',
					description: '',
					projectType: '',
				});
				setSuccess('Message sent successfully!');
			} else {
				setError(result.message || 'Something went wrong. Try again.');
			}
		} catch (err) {
			setError('Failed to send message. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ContactForm
			formHeading={formHeading}
			formNote={formNote}
			floorPlanOptions={floorPlanOptions}
			formData={formData}
			handleInputChange={handleInputChange}
			handleProjectTypeChange={handleProjectTypeChange}
			handleSubmit={handleSubmit}
			isLoading={isLoading}
			error={error}
			success={success}
		/>
	);
};

export default SubmitContactForm;
