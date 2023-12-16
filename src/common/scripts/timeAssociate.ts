export type millisecondDateTime = "millisecond";

export type kindOfDateTime =
	"year" |
	"month" |
	"day" |
	"hour" |
	"minute" |
	"second" |
	"millisecond";

export type timeAssociate = {begin: kindOfDateTime, end: kindOfDateTime}