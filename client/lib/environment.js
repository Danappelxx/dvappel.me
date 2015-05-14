// Configuration of any client side packages

Accounts.ui.config({
	requestPermissions: {},
	passwordSignupFields: "EMAIL_ONLY"
});

Blog.config({
	comments: {
		disqusShortname: 'dvappel',
	},
	blogIndexTemplate: 'blogIndexTemplate',
	blogShowTemplate: 'showBlogTemplate',
//	blogNotFoundTemplate: 'blogNotFound',
	syntaxHighlighting: true,
	syntaxHighlightingTheme: 'github',
	adminRole: 'blogAdmin',
	authorRole: 'blogAuthor',
});
