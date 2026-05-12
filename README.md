# JyväsPolut

The idea for this app was inspired by our shared passion for the outdoors. From that passion came a simple question: how can we make it easier for everyone to discover naturetrails around Jyväskylä?

Our main goal was to create an app that is easy to use, straightforward, and above all, user-friendly.

## Description

JyväsPolut is an easy to use nature trail search app.

The filter within the app helps you find your desired trail based off length or property.

You can easily keep yourself up to date by marking which trails you have already visited and which ones were your favorite.

Expanded info view shows the user images, properties and how to travel to the trail.

You can also see what other hikers thought about the trail and you can leave your own experience.

## Getting Started

### Dependencies

- The app uses MapBox map

### Installing

- Clone this repo
- You need to add the API key to the .env file

### Executing program
```
npm install
npm run dev -- --open
```
Close program Ctrl + C

## Help

After you pull the app from Github ->

```
npm install
```

## Authors

Sami Kemppainen, Venla Nuutinen ja Jami Salonen

## Version History

- 0.1
  - Initial Release

## License

This project is licensed under the CC BY-SA 4.0 License - see the LICENSE.md file for details

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png

## Acknowledgments

Git feature-branch
Creation:
```
git checkout main
git pull
git checkout –b branchname
```
If '-b' doesn't work:
```
git branch branchname
git checkout branchname
```
Working:
```
git push -u origin branchname
```
(changes)
```
git add .
git commit -m "text"
```
Connecting main branch:
```
git checkout main
git pull
git checkout branchname
git merge main
git push
```

Connecting to main branch:
```
git checkout main
git pull
git merge branchname
git push
```

Delete branch:
```
git branch -d branchname
git push origin --delete branchname
```
