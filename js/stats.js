import { isScript, isPackageJson } from './files.js';
import { file } from './github.js';

function average(ar) {
    return Math.round(ar.reduce((t, v) => t + v, 0) / ar.length);
}

export async function projectStats(project) {
    const scripts = project.filter(f => isScript(f.path));
    const cnt = scripts.length;
    //const sizes = scripts.map(s => s.size);
    let maxSize = 0, minSize = 0, avgSize=0;
    let maxLines = 0, minLines = 0, avgLines=0;

    for (const s of scripts) {
        const txt = await file(s.url);
        const lines = txt.split("\n");
        s.lines = lines.length;
        console.log(s);
    }


    if (cnt) {
        const sizes = scripts.map(s => s.size);
        const lines = scripts.map(s => s.lines);
        maxSize = Math.max(...sizes);
        minSize = Math.min(...sizes);
        avgSize = average(sizes);

        maxLines = Math.max(...lines);
        minLines = Math.min(...lines);
        avgLines = average(lines);
    }
    
    return {
        cnt, maxSize, minSize, avgSize, maxLines, minLines, avgLines
    };
}

function load(url) {
    fetch(url).then(res => res.txt);
}