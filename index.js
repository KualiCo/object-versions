var _ = require('lodash')
var isEqual = _.isEqual
var keys = _.keys
var isPlainObject = _.isPlainObject
var merge = _.merge


/*

returns the update object of differences between the two objects
deeply nested, but can't do updates to sub-arrays (just replaces them)

var v = diff(null, {name: "sean"})    // returns the whole object
diff(v, {name: "sean", age: 32)       // {age:32}
diff(v, {name: "bobby"})              // {name:"bobby"}

*/

function diff(older, newer) {
    if (!older) return newer
    if (!newer) return null
    return keys(newer).reduce(function(changes, key) {
        var newValue = newer[key]
        var oldValue = older[key]

        // if they are the same, then skip
        if (isEqual(oldValue, newValue))
            return changes

        // if both new values and old values are plain objects we should diff them
        if (isPlainObject(newValue) && isPlainObject(oldValue)) {
            changes[key] = diff(oldValue, newValue)
        }
        else {
            // Arrays, nulls, values, just replace
            changes[key] = newValue
        }

        return changes
    }, {})
}

// resolves a series of diffs. Pass the original object in as the first item
// destroys the diffs in the process!
function resolve(diffs) {
    return diffs.reduce(merge, {})
}

exports.diff = diff
exports.resolve = resolve

// Example:
if (require.main === module) {
    // tests
    var v = diff(null, {name:"sean", likes: ['food'], attributes:{fun:true}})

    // normally you would be diffing the entire object, not just a few properties
    // but it works like this too (doesn't remove fields)
    var v1 = diff(v, {name: "bobby"})
    var v2 = diff(v, {name: "sean", age: 32})
    var v3 = diff(v, {likes: ['food', 'games']})
    var v4 = diff(v, {attributes:{fun:true, angry:true}})

    var changes = [v, v1, v2, v3, v4]
    console.log("CHANGLES", changes)
    console.log("RESOLVED", resolve(changes))
}
