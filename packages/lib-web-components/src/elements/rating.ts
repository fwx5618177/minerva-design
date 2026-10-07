// Registers <minerva-rating> and <minerva-rating-scale>.
import { MinervaRating, MinervaRatingScale } from "../components/rating/rating";
import { defineElement } from "../internal/define";

defineElement(MinervaRating);
defineElement(MinervaRatingScale);

export * from "../components/rating/rating";
