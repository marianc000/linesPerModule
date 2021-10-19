import { dir } from './files.js';
import { isPackageJson}from './files.js';
 

function projectsDirsLongestFirst(files) { // longest first
    return files.filter(f =>isPackageJson(f.path))
        .map(f => dir(f.path)).sort((a, b) => b.length - a.length);
}

function fileProject(path, projectPaths) {
    for (let projectPath of projectPaths) {
        if (path.startsWith(projectPath)) return projectPath;
    }
}


export function relevantProjects(map, minFiles){
   const keyVals= Object.entries(map).filter(([k,v])=>  v.length>minFiles);
   return Object.fromEntries(keyVals);
}
export function topProjects(map ){
   return Object.entries(map).sort(([k1,v1],[k2,v2])=>v2.length-v1.length).slice(0,2);
 
 }
 
export function groupFilesInProjects(files ) {
 
    const projects = projectsDirsLongestFirst(files);

    const map = Object.fromEntries(projects.map(p => ([p, []])));
    files.forEach(f => {
        const root = fileProject(f.path, projects);
        if (root !== undefined) {
            let { path, size,url } = f;
            path = path.replace(root, "");
            map[root].push({ path, size,url });
        } else throw f.path;
    });
    
    
    return map;
}


