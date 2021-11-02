const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayMs = 86400000;
const twoDaysMs = 172800000;
const weekMs = 604800000;

export function getDateString(date: Date): string {
	let resultDateString: string;
	const passedTimeMs = Date.now() - date.getTime();

	if (passedTimeMs < dayMs) {
		resultDateString = `${date.getHours()}:${date.getMinutes()}`;
	} else if (passedTimeMs > dayMs && passedTimeMs < twoDaysMs) {
		resultDateString = 'Yesterday';
	} else if (passedTimeMs > twoDaysMs && passedTimeMs < weekMs) {
		resultDateString = getWeekDay(date);
	} else {
		resultDateString = date.toLocaleDateString();
	}

	return resultDateString;
}

function getWeekDay(date: Date) {
	return days[date.getDay()];
}

