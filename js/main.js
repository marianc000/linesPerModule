import files from './github.js';
import { groupFilesInProjects, relevantProjects, topProjects } from './arrange.js';
import { projectStats } from './stats.js';
import { containsLowerCasePattern } from './strings.js';

Promise.all([
    load('vercel', 'next.js', ['test', 'example']),
    load('babel', 'babel', ['test']),
    load('facebook', 'jest', ['test']),
    load('vitejs', 'vite', ['test']),
    load('webpack', 'webpack', ['test', 'example']),
    load('rollup', 'rollup', ['test']),
    load('sveltejs', 'svelte', ['test', 'site']),
    load('snowpackjs', 'snowpack', ['test']),
    load('parcel-bundler', 'parcel', ['test'] ),
    load('puppeteer', 'puppeteer', ['test']),
    load('microsoft', 'TypeScript', ['test']),
]).then(display)

function display(data) {
    // console.log(">display:",data)
    const html = data.reduce((t, r) => t + renderRepo(r), '<table>' + header()) + '</table>';
    root.innerHTML = html;
}

function header() {
    return `<tr><th>Repo</th><th>Package</th><th>Script count</th><th>Min bytes</th><th>Max bytes</th><th>Average bytes</th><th>Min lines</th><th>Max lines</th><th>Average lines</th></tr>`;
}

function renderRepo({ repo, projects }) {
    console.log(">renderRepo", repo, projects);
    return projects.reduce((t, p, idx) => t + renderProject(p, repo, idx, projects.length), '<tbody>')
        + '</tbody>';
}
 
function renderProject({ name, avgLines,avgSize,cnt,maxLines,maxSize,minLines, minSize }, repo, idx, rows) {
    const repoCell = idx ? '' : `<td rowspan='${rows}'>${repo}</td>`;
    return `<tr>${repoCell}<td>${name}</td><td>${cnt}</td><td>${minSize}</td><td>${maxSize}</td><td>${avgSize}</td><td>${minLines}</td><td>${maxLines}</td><td>${avgLines}</td></tr>`;
}

async function load(owner, repo, excludeFiles = ['test']) {
    let data = await files(owner, repo);
    data = data.filter(o => !containsLowerCasePattern(o.path, excludeFiles))
    let projects = groupFilesInProjects(data);
    console.log(repo, projects);
    projects = topProjects(projects);
    console.log(repo, projects);

    let results = [];
    for (const [k, v] of projects) {
        const stats = Object.assign({ name: k }, await projectStats(v));
        console.log(stats);
        results.push(stats);
    }

    return { repo, projects:results };
}

