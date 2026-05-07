import type { ItrailTypes } from './trailInfo';
class VisitedList {
	visited: ItrailTypes[];
	constructor() {
		this.visited = $state([]);
	}

	init(list: ItrailTypes[]) {
		this.visited = [...list];
	}

	// Adds the trail to the visited list and sets the trails visited to true
	add(p: ItrailTypes) {
		p.visited = true;
		this.visited.push(p);
	}

	// Removes the trail from the visited list and sets the trails visited to false
	remove(p: ItrailTypes) {
		p.visited = false;
		this.visited = this.visited.filter((x) => x.id !== p.id);
	}

	// Tells if the trail is in the visited list
	wasVisited(p: ItrailTypes) {
		if (this.visited.find((x) => x.id === p.id)) {
			return true;
		} else {
			return false;
		}
	}

	get getVisitedList() {
		return this.visited;
	}
}

export const visitedList = new VisitedList();
