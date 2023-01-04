export type Moderation = {
  flagged: boolean;
  categories: { [key: string]: string }[];
  categoryScores: { [key: string]: number }[];
};
