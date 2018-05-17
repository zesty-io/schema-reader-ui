# Zesty.io YAML Schema Reader

Frontend Interface to Test Zesty.io Schema YAML Files against the remote cloud function https://us-central1-zesty-dev.cloudfunctions.net/schemaReader

Visit the url: https://zesty-io.github.io/schema-reader-ui/

### Examples

Examples dynamically load from json files in the Examples folder. The master file is [examples.json](assets/examples/examples.json). This file points to other files that dynamically load the examples panel, each example points to a remote Zesty.io YAML Schema files.

We encourage other to make pull requests against examples. Add your own and help other devs.

### Project

The goal is to keep this very lightweight, no build process with few dependencies.

### Dependencies
* ACE Editor with YAML mode and XCODE theme
* JQuery 3.3.1
* Bulma CSS framework
