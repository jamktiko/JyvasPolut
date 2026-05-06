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
		p.favorite = true;
		this.favorites.push(p);
	}

	remove(p: ItrailTypes) {
		p.favorite = false;
		this.favorites = this.favorites.filter((x) => x.id !== p.id);
	}

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
