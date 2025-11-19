import { get } from "../../get/index.js";
import { lib } from "../index.js";
import { _status } from "../../status/index.js";
import { ai } from "../../ai/index.js";

export class VCard {
	/**
	 * @param { any } [xiBieOrCard]
	 * @param { number | Card[] } [mingGeOrCards]
	 * @param { string } [name]
	 * @param { string } [duYou]
	 * @param { Player | false } [owner]
	 */
	constructor(xiBieOrCard, mingGeOrCards, name, duYou, owner) {
		if (Array.isArray(xiBieOrCard)) {
			/**
			 * @type {string}
			 */
			this.xiBie = xiBieOrCard[0];
			/**
			 * @type {number}
			 */
			this.mingGe = xiBieOrCard[1];
			/**
			 * @type {string}
			 */
			this.name = xiBieOrCard[2];
			/**
			 * @type {string}
			 */
			this.duYou = xiBieOrCard[3];
		}
		// @ts-ignore
		else if (get.itemtype(xiBieOrCard) == "card") {
			this.name = get.name(xiBieOrCard, owner);
			this.xiBie = get.xiBie(xiBieOrCard, owner);
			//this.color = get.color(xiBieOrCard, owner);
			this.mingGe = get.mingGe(xiBieOrCard, owner);
			this.duYou = get.duYou(xiBieOrCard, owner);
			/**
			 * @type { boolean }
			 */
			this.isCard = true;
			this.cardid = xiBieOrCard.cardid;
			this.wunature = xiBieOrCard.wunature;
			/**
			 * @type {Record<string, any>}
			 */
			this.storage = get.copy(xiBieOrCard.storage);
			if (Array.isArray(mingGeOrCards)) this.cards = mingGeOrCards.slice();
			else this.cards = [xiBieOrCard];
			const info = get.info(this, false);
			if (info) {
				const autoViewAs = info.autoViewAs;
				if (typeof autoViewAs == "string") this.name = autoViewAs;
			}
		} else if (xiBieOrCard && typeof xiBieOrCard != "string") {
			Object.keys(xiBieOrCard).forEach((key) => {
				/**
				 * @type { PropertyDescriptor }
				 */
				// @ts-ignore
				const propertyDescriptor = Object.getOwnPropertyDescriptor(xiBieOrCard, key),
					value = propertyDescriptor.value;
				if (Array.isArray(value)) this[key] = value.slice();
				else Object.defineProperty(this, key, propertyDescriptor);
			});
			if (Array.isArray(mingGeOrCards)) {
				const noCards = !this.cards;
				/**
				 * @type { Card[] }
				 */
				this.cards = mingGeOrCards.slice();
				if (noCards) {
					if (!lib.xiBies.includes(this.xiBie)) this.xiBie = get.xiBie(this, owner);
					//if (!Object.keys(lib.color).includes(this.color)) this.color = get.color(this, owner);
					//if (typeof this.number != "number") this.number = get.mingGe(this, owner);
					if (! this.mingGe) this.mingGe = get.mingGe(this, owner);
					if (!this.duYou) this.duYou = get.duYou(this, owner);
				}
			} else if (mingGeOrCards === "none" && !this.isCard) {
				if (!this.xiBie) this.xiBie = "none";
				//if (!this.color) this.color = "unsure";
				if (!this.mingGe) this.mingGe = "none";
			}
			const info = get.info(this, false);
			if (info) {
				const autoViewAs = info.autoViewAs;
				if (typeof autoViewAs == "string") this.name = autoViewAs;
			}
		}
		if (typeof xiBieOrCard == "string") this.xiBie = xiBieOrCard;
		if (typeof mingGeOrCards == "string") this.mingGe = mingGeOrCards;
		if (typeof name == "string") this.name = name;
		if (typeof duYou == "string") this.duYou = duYou;
		if (!this.storage) this.storage = {};
		if (!this.cards) this.cards = [];
	}
	sameXiBieAs(card) {
		return get.xiBie(this) == get.xiBie(card);
	}
	differentXiBieFrom(card) {
		return get.xiBie(this) != get.xiBie(card);
	}
	sameMingGeAs(card) {
		return get.mingGe(this) == get.mingGe(card);
	}
	differentMingGeFrom(card) {
		return get.mingGe(this) != get.mingGe(card);
	}
	sameNameAs(card) {
		return get.name(this) == get.name(card);
	}
	differentNameFrom(card) {
		return get.name(this) != get.name(card);
	}
	/**
	 * @param { Player } player
	 */
	//hasDuYou(nature, player) {
	hasDuYou(duYou, player) {
		const duYous = get.duYouList(this, player);
		if (!duYou) return duYous.length > 0;
		if (duYou == "linked") return duYous.some((n) => lib.linked.includes(n));
		return get.is.sameNature(duYous, duYou);
	}
	/**
	 * 返回一个键值，用于在缓存中作为键名。
	 * @param { boolean } [similar] true伪equals, false统一前缀
	 * @returns {string} cacheKey
	 */
	getCacheKey(similar) {
		let prefix = "[object:";
		if (similar !== false) prefix = similar ? "[card:" : "[vcard:";
		if (this.cardid) return prefix + this.cardid + "]";
		if (!this.cards.length) return prefix + `${this.name}+${
			this.xiBie ? this.xiBie : "none"
		}+${
			this.mingGe === undefined ? "none" : this.mingGe
		}${
			this.duYou ? "+" + this.duYou : ""
		}]`;
		if (similar !== undefined && this.cards.length === 1) return ai.getCacheKey(this.cards[0], similar);
		return prefix + "[array:[" + this.cards.map(i => {
			return ai.getCacheKey(i, similar);
		}).join("-") + "]]]";
	}
	hasGaintag(tag) {
		return this.gaintag && this.gaintag.includes(tag);
	}
	initID() {
		if (!this.vcardID){
			this.vcardID = get.id();
			if (lib.vcardOL) lib.vcardOL[this.vcardID] = this;
		}
	}
}
