export function getRandomCoordinates(minX: number, maxX: number, minY: number, maxY: number) {
	const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
	const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
	return { x, y };
}
