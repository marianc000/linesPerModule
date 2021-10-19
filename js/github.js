import {isScript,isPackageJson}from './files.js';
import {reverse} from './strings.js';

const TOKEN='oV1dA4TXrRaLwX6qjy4aeHyVCF9Wy71AsZP9_phg';

 function authFetch(url){
    return fetch(url,{headers: {
        'Authorization': 'token '+reverse(TOKEN)
      } })
}

export function file(url){
    return authFetch(url).then(res=>res.json()).then(o=>atob(o.content));
}

function defaultBranch(owner,repo){
   return authFetch(`https://api.github.com/repos/${owner}/${repo}`)
    .then(res=>res.json())
    .then(o=>o.default_branch);
}

function filesOnBranch(owner,repo,branch){
    return authFetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`)
    .then(res=>res.json())
    .then(o=>{
        if (o.truncated) console.error("Truncated list");
        return o.tree;
    });
}

function onlyJsFiles(objs){
    return objs.filter(o=>o.type==='blob'&&(isScript(o.path)||isPackageJson(o.path)));
}

export default function files(owner,repo){
   return defaultBranch(owner,repo)
    .then(branch=>filesOnBranch(owner,repo,branch))
    .then(os=>onlyJsFiles(os));
}