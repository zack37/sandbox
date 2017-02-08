#!/usr/bin/env node

const optionator = require('optionator');
const R = require('ramda');

const package = require('./package');
const skills = require('./skills');

const getUniqueTags = R.pipe(R.chain(x => x.tags), R.uniq);

const getSkillsWithTags = tags => R.pipe(
  R.filter(x => R.all(t => R.isEmpty(t) || R.contains(t, x.tags), tags)),
  R.map(R.pick(['name', 'description']))
);

const uniqueTags = getUniqueTags(skills);

const configuration = optionator({
  prepend: 'Usage: roll-check [options]',
  append: `Version ${package.version}`,
  options: [
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      description: 'Displays this message'
    },
    {
      option: 'tags',
      alias: 't',
      type: 'String',
      description: 'Comma separated list of tags to search for: '+ uniqueTags.join(', '),
    }
  ]
});

const options = configuration.parseArgv(process.argv);

if(options.help) {
  return console.log(configuration.generateHelp());
}

const tags = (options.tags || '').split(',');

console.log(getSkillsWithTags(tags)(skills));
