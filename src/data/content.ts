export type Trait = {
  number: string;
  title: string;
  text: string;
};

export type Project = {
  type: string;
  title: string;
  description: string;
  accent: 'pink' | 'orange' | 'lilac';
};

export const traits: Trait[] = [
  { number: '01', title: 'What they are', text: 'A bouncy light violet slime with big, doe-like eyes and a soft smile.' },
  { number: '02', title: 'What they do', text: 'A junior giggleologist who turns tiny everyday moments into joy.' },
  { number: '03', title: 'What their story is', text: 'Born beneath a moonlit reef, Zoppy is on a mission to make the world laugh.' },
];

export const projects: Project[] = [
  { type: '01 / identity', title: 'The Giggle Garden', description: 'A playful little world for collecting giggles, good thoughts, and tiny treasures.', accent: 'pink' },
  { type: '02 / experience', title: 'Zoppy Says Hello', description: 'A tiny interactive storybook where every click uncovers a new friendly surprise.', accent: 'orange' },
  { type: '03 / archive', title: 'Moonlight Meadow', description: 'A dreamy field guide to Zoppy’s firefly friend, favorite place, and softest memories.', accent: 'lilac' },
];