export function containsLowerCasePattern(path, patterns) {
    return patterns.some(p => path.toLowerCase().includes(p));
}

export function reverse(str){
    return str.split("").reverse().join("");
}