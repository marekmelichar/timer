## URL

https://timer.sandboxie.eu/

## 1. Introduction

The folder structure repeats at every depth level, meaning when we go from the root, and then look into features, each feature will have the same directory structure.

## 2. Directory Breakdown

### /api

- Implement API integration. Whenever an API is called, it is done here.

### /assets

- Static assets used in the app

### /components

- Only globally used UI components, not feature specific

### /constants

- Place to define all constants for the app

### /features

- Each feature folder is like a mini version of the SRC folder in the project. The structure repeats and relates to the specific feature, meaning feature-specific files are used within each feature, and global-specific files are used in SRC.

### /hooks

- Only global hooks usable throughout the application, such as `useLocalStorage`.

### /i18n

- Implementation of i18n, the translation files are located in `public/locales` folder

### /pages

- Imports features, assembles them into a page, and facilitates communication between features as their superior component.
- Instead of using folder structures here, just use files directly. Each file is one page.

### /routes

- Define all routes for the app in one place

### /theme

- Implementation of Material UI theme, used also for theme overrides of typography, palette, and global MUI components styling

### /types

- All Typescript types definitions

### /lib

- Here we use the so-called facade pattern ([Explained here](https://www.youtube.com/watch?v=fHPa5xzbpaA&ab_channel=WebDevSimplified)), which is used to implement libraries like axios for fetching API requests. The facade pattern is used in the application, and if there is a need to change the fetch library, it is changed in this one place.

### /utils

- Only globally used utility functions.

### index.js file

- This important file exports the entire feature from a single place.
- Only what is used externally in the application is exported from this file.
- Always import the feature only from this file.

## 3. Future Extension

This structure is advantageous for future expansion because each feature has its files in one place, and we know where to find files for modifications according to the feature. If we want to add a new feature because a customer comes up with new feature request, we easily add it to the main features folder and proceed in the same way.

99% of the code will be located in the features folder because each feature will have its code within it. There will be less need to deal with global code, which will not be needed as much and will be minimal.

## 4. Addressing Common Issues

Even though the directory structure may seem nice at first glance, it usually ends up with imports/exports from many different places and directories, causing the code to be scattered all over.

Features do not communicate directly with each other but always have a component above them that facilitates communication, achieving independence of features.

## 5. Local development

### Prepare the env.js file

- copy and paste the `env.example.js` to `env.js` file in root of the project

### Install dependencies

`yarn`

### Start dev

`yarn start`
