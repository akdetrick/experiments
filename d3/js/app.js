// Lesson: 16
// https://egghead.io/lessons/d3-basic-interactivity-with-d3-v4

const DATA_SCORES = [
	{ name: 'Alice', score: 96 },
	{ name: 'Billy', score: 83 },
	{ name: 'Cindy', score: 91 },
	{ name: 'David', score: 96 },
	{ name: 'Emily', score: 88 },
];

const onDOMReady = (cbFn) => document
	.addEventListener('DOMContentLoaded', cbFn);

const containerWidth = 425;
const containerHeight = 625;
const margin = {
	top: 0,
	right: 0,
	bottom: 25,
	left: 25,
};
const width = containerWidth - margin.left - margin.right;
const height = containerHeight - margin.top - margin.bottom;

onDOMReady(() => {
	const svg = d3.select('.chart')
		.append('svg')
			.attr('width', containerWidth)
			.attr('height', containerHeight)
		.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

	svg.append('rect')
		.attr('width', width)
		.attr('height', height)
		.style('fill', 'lightblue')
		.style('stroke', 'green');
});
