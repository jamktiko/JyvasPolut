export interface ItrailTypes {
	id: number;
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
	favorite: boolean;
	visited: boolean;
	comments: Comment[];
}

export interface BodyOfWater {
	exist: '✅' | '❌';
	type?: string;
}

export interface Comment {
	commenter: string;
	commentTitle: string;
	commentText: string;
}
