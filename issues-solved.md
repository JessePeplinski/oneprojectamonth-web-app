# Issues Solved

## Firebase Deployment
## Build Folder
Set the build folder to be `dist/opam-angular` in the angular path. We could also set this in firebase rules.

## $RESOURCE_DIR issue
- https://stackoverflow.com/questions/48345315/error-deploying-with-firebase-on-npm-prefix-resource-dir-run-lint


Error messages appear on Windows:
"npm --prefix \"$RESOURCE_DIR\" run lint",
"npm --prefix \"$RESOURCE_DIR\" run build"

Changed to

{
  "functions": {
    "predeploy": [
      "npm --prefix ./functions/ run lint",
      "npm --prefix ./functions/ run build"
    ]
  }
}