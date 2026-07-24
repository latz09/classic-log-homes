// src/lib/motion.js
// Single source of truth for motion on Classic Log Homes.
// If a component hardcodes a duration or easing, it's wrong — pull from here.

/**
 * Entrance easing. Fast out of the gate, long quiet settle, zero overshoot.
 * Overshoot/bounce reads playful. This reads expensive.
 */
export const EASE = [0.16, 1, 0.3, 1];

/** For things that move both directions (hover, toggles, accordions). */
export const EASE_SOFT = [0.4, 0, 0.2, 1];

export const DURATION = {
	fast: 0.35, // page fade, micro-interactions
	base: 0.55, // standard section reveal
	slow: 0.85, // hairline rules, large imagery
};

/**
 * Travel distance in px. Keep it small.
 * 40px+ reads like a template. 16–24px reads like intent.
 */
export const DISTANCE = 20;

export const STAGGER = 0.08;
    