export const formatValue = (value: string | number): string => {
	const stringValue = String(value);

	return Number.parseFloat(stringValue).toString();
};
