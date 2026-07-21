// /emails/previewData.js
// Mock data for the standalone `react-email dev` / `export` preview tool only.
// Production always passes real values from submitContactForm.js — this file
// never runs outside local preview.

export const previewBranding = {
	name: 'Classic Log Homes',
	logoUrl: 'https://cdn.sanity.io/images/jeiwl3td/production/9ab1df5a3433b9ef05c6d30940a366cc57c85eb7-900x150.png',
	colors: {
		background: '#fcfaf2',
		surface: '#FFF8E3',
		accent: '#704D02',
		text: '#1E1E1E',
		textMuted: '#8A7E72',
	},
	contactInfo: { phone: '(715) 887-2550', email: 'classicloghomes@gmail.com' },
};

export const previewFields = [
	{ name: 'name', label: 'Name', type: 'text' },
	{ name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
	{ name: 'email', label: 'Email', type: 'email' },
	{ name: 'floorPlan', label: 'Floor Plan', type: 'select' },
	{ name: 'description', label: 'Project Details', type: 'textarea' },
	{
		name: 'projectType',
		label: 'Project Type',
		type: 'radio',
		options: [
			{ value: 'owner_builder', label: "I'm an owner-builder" },
			{ value: 'contractor', label: "I'm a contractor" },
			{ value: 'unsure', label: 'Still figuring it out' },
		],
	},
];

export const previewFormData = {
	name: 'Sarah Johnson',
	phoneNumber: '(715) 555-0192',
	email: 'sarah@example.com',
	floorPlan: 'The Northwoods 1800',
	description:
		'Looking to build on 5 acres near Wisconsin Rapids, hoping to break ground next spring.',
	projectType: 'owner_builder',
};

export const previewMessaging = {
	autoResponseGreeting: (name) => `Thanks for reaching out, ${name}!`,
	autoResponseBody:
		"We've received your message and will be in touch within 1-2 business days.",
	autoResponseClosing: 'Jeff<br/>Classic Log Homes',
};

export const previewTimestamp = 'July 21, 2026 at 02:30:00 PM';