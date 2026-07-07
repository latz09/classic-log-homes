// /utils/email-configuration/client-config/clientConfig.js
export const clientConfig = {
	branding: {
		name: 'Classic Log Homes',
		logoUrl: 'https://cdn.sanity.io/images/.../classic-log-homes-logo.png', // TODO: swap in real asset URL
		colors: {
			headerBackground: '#FFFDF9',
			bodyBackground: '#FFFDF9',
			detailsBoxBackground: '#F5EFE6',
			descriptionBackground: '#FFFDF9',
			descriptionBorderLeft: '#D39F4A',
			footerBackground: '#FFFDF9',
			footerText: '#1A1614',
			textPrimary: '#1A1614',
			textMuted: '#8A7E72',
		},
		contactInfo: {
			phone: '(715) 887-2550',
			email: process.env.CLIENT_EMAIL,
		},
	},
	formFields: [
		{ name: 'name', label: 'Name', required: true, type: 'text' },
		{ name: 'phoneNumber', label: 'Phone Number', required: true, type: 'tel' },
		{ name: 'email', label: 'Email', required: true, type: 'email' },
		{ name: 'floorPlan', label: 'Floor Plan', required: false, type: 'select' },
		{
			name: 'description',
			label: 'Project Details',
			required: false,
			type: 'textarea',
		}, // was 'message'
		{
			name: 'projectType',
			label: 'Project Type',
			required: false,
			type: 'radio',
			options: [
				{ value: 'owner_builder', label: "I'm an owner-builder" },
				{ value: 'contractor', label: "I'm a contractor" },
				{ value: 'unsure', label: 'Still figuring it out' },
			],
		},
	],
	messaging: {
		clientEmailSubject: (name) => `New Website Inquiry from ${name}`,
		autoResponseSubject: (name) => `${name}, We Received Your Message`,
		autoResponseGreeting: (name) => `Thanks for reaching out, ${name}!`,
		autoResponseBody:
			"We've received your message and will be in touch within 1-2 business days.",
		autoResponseClosing: 'Jeff<br/>Classic Log Homes',
	},
};
