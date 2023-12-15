export type millisecondDateTime = "millisecond";

export type kindOfDateTime =
	"year" |
	"month" |
	"day" |
	"hour" |
	"minute" |
	"second" |
	millisecondDateTime;

export type timeAssociate = {begin: kindOfDateTime, end: kindOfDateTime}