Object Versions
===============

Lets you diff two objects, store the changes, and resolve them back into an object. Allows you to track every version of an object over time. 

Examples
--------

	var history = require('object-diff-history')

Get a deep difference between two objects. 

	history.diff(null, {name: "sean"}) 		
	// {name: "sean"}
	
	history.diff({name: "sean"}, {name: "sean", age: 32})
	// {age: 32}
	
	history.diff({name: "sean"}, {name: "bobby"})
	// {name: "bobby"}
	
Use this to keep track of every version of your object

	// this array was generated from diffs
	var versions = [
		{name: "sean"},
		{age: 32},
		{name: "bobby"}
	]
	
	history.resolve(versions)
	// {name: "bobby", age: 32}
	
Nested objects are deeply differenced

	history.diff({
		mood:{cheerful:true}
	}, {
		mood:{cheerful:true, annoying:true}
	})
	// {mood:{annoying:true}}
	
Nested arrays are completely replaced.

	history.diff({likes: ['food']}, {likes: ['food', 'games']})
	// {likes: ['food', 'games']}
	
