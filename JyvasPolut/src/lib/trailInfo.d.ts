export interface ItrailTypes {
	name: string;
	description: string;
	description2: string;
	trailLength: number;
	centreTime: string[];
	difficulty: string;
	publicTransport: string[];
	mountain: '✅' | '❌';
	bodyOfWater: BodyOfWater;
	fireplace: '✅' | '❌';
	images: string[] | null;
}

export interface BodyOfWater {
	exist: '✅' | '❌';
	type?: string;
}
