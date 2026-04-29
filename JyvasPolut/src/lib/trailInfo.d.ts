export interface ItrailTypes {
	name: string;
	description: string;
	trailLength: number;
	centreTime: string[];
	difficulty: string;
	publicTransport: string[];
	mountain: boolean;
	bodyOfWater: BodyOfWater;
	fireplace: boolean;
	images: string[] | null;
}

export interface BodyOfWater {
	exist: boolean;
	type?: string;
}
