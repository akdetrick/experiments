# CSS Catalyst
CSS boilerplate for modern times.

## Core principles
- imagine something that gets configured by a `style-dictionary`
- stay close to standard CSS
- configure with custom properties

## What's included
- cross-browser reset
- smart defaults for base elements
- low-level utility classes
	- margin
	- padding
	- bounds (set by character width unit)
		- widths based on `ch` unit

### Custom properties
- breakpoints
	- useful mobile-first breakpoints via PostCSS `custom-media`
- colors
	- text colors & basic UI needs
- sizes
	- type sizes (adjust based on breakpoints)
		- font-size
		- line-height
		- css locks?
	- "gutter" size
		- based on `ch`?
		- 3 starting sizes: `1` `2` `3`

### Base styles
- via custom properties
- uses `rem` for shit

