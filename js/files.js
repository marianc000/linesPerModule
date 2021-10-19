export function dir(path) {
    return path.substring(0, path.lastIndexOf("/")+1);
}

export function isScript(path){
   return path.endsWith('.js')|| path.endsWith('.ts');
}

export function isPackageJson(path){
    return path.endsWith('package.json');
 }
 