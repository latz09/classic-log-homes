// /utils/email-configuration/client-config/clientConfig.js
export const clientConfig = {
	branding: {
		name: 'Classic Log Homes',
		logoUrl:
			'https://cdn.sanity.io/images/jeiwl3td/production/9ab1df5a3433b9ef05c6d30940a366cc57c85eb7-900x150.png',
		colors: {
			background: '#fcfaf2',
			surface: '#FFF8E3',
			accent: '#704D02',
			text: '#1E1E1E',
			textMuted: '#8A7E72',
		},
		contactInfo: {
			phone: '(715) 887-2550',
			email: process.env.CLIENT_EMAIL,
		},
	},

	features: {
		// Auto-response to the person who filled out the form is a paid add-on.
		// Off by default — flip to true once the client's paid for it.
		autoResponseEmail: false,
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
		},
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
