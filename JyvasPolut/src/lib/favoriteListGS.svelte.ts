import type { ItrailTypes } from './trailInfo';
class FavoriteList {
	favorites: ItrailTypes[];
	constructor() {
		this.favorites = $state([]);
	}

	init(list: ItrailTypes[]) {
		this.favorites = [...list];
	}

	// Adds the trail to the favorite list and sets the trails visited to true
	add(p: ItrailTypes) {
		p.favorite = true;
		this.favorites.push(p);
	}

	// Removes the trail from the favorite list and sets the trails visited to false
	remove(p: ItrailTypes) {
		p.favorite = false;
		this.favorites = this.favorites.filter((x) => x.id !== p.id);
	}

	// Tells if the trail is in the favorite list
	isFavorite(p: ItrailTypes) {
		if (this.favorites.find((x) => x.id === p.id)) {
			return true;
		} else {
			return false;
		}
	}

	get getFavoriteList() {
		return this.favorites;
	}
}

export const favoriteList = new FavoriteList();
