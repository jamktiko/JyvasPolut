import type { ItrailTypes } from './trailInfo';
class FavoriteList {
	favorites: ItrailTypes[];
	constructor() {
		this.favorites = $state([]);
	}

	init(list: ItrailTypes[]) {
		this.favorites = [...list];
	}

	add(p: ItrailTypes) {
		this.favorites.push(p);
	}

	remove(p: ItrailTypes) {
		this.favorites = this.favorites.filter((x) => x.id !== p.id);
	}

	get getFavoriteList() {
		return this.favorites;
	}
}

export const favoriteList = new FavoriteList();
