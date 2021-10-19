import {reverse} from './strings.js';

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

if (process.argv.length > 2) {
    console.log(reverse(process.argv[2]));
}

 