
# Todo List

[Live Demo](https://jayyzzeezzy.github.io/todo-list)

![Todo live demo gif](./todo-live-demo.gif)

## Description

A personal task manager that helps you organize your projects, plan your day, and make meaningful progress towards your goals.  

This is part of [The Odin Project](https://www.theodinproject.com) curriculum.

## Features

- Dynamically create, edit, and delete todo items. 
- Allows you to group todos into a project.
- View all todos in the home page.
- Quickly display todos that are due on the current day/week with a click of a button.
- Any changes made are saved to `localStorage`

## Built With

- HTML
- Vanilla CSS
- Vanilla JS
- Webpack
- NodeJS

## Challenges I faced

When I was starting out on this project, I struggled on narrowing down to the most optimal design pattern. 

I debated between constructors/classes, function factories, and IIFE module patterns. 

Eventually, I settled on using Function Factories and bundle everything with Webpack.

## What I learned

- DOM manipulation: 
    - Create node
    - Render info into each node
    - Update node
    - Delete node 
- Creating a link between DOM elements and data structures
- Web Storage API (i.e. `localStorage`)
- JS design patterns
- OOP Principles

## Improvements I want to make

- Optimization: fine tune time and space complexities.
- OOP Principles: make more loosely coupled objects. 
- Add more features like todo priority and allowing users to write a description. 

## Credits

- JS library: [date-fns](https://date-fns.org)
- Icons: [Font Awesome](https://fontawesome.com)
- UI inspired by [Notion](https://www.notion.so)