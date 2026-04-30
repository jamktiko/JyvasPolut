interface Ifilter {
	allItems: boolean;
	difficulty: 'Kevyt' | 'Rasittava' | 'Raskas' | null;
	mountain: boolean;
	bodyOfWater: boolean;
	fire: boolean;
	specificLength: number;
}

export const filterInfo: Ifilter = $state({
	allItems: true,
	difficulty: null,
	mountain: false,
	bodyOfWater: false,
	fire: false,
	specificLength: 0.5
});
