---
title: "Python learnings"
date: 2024-03-14
tags: ["python", "tech"]
---

# Python learnings

_Published on: 14/3/2024_

I have always disliked woking on a python project. The lack of type safety and thus intellisense always made working with it frustrating. I never know what inputs a function takes, and what it returns. And of course, that's because I never did it properly. Here's some things I have learn to make python development more enjoyable.

## Dependency management

Previously, I had always used **virtual environments** and **pip** as the package manager, using a `requirements.txt` file and `pip freeze` to track dependencies. However, this is extremely prone to errors.

### Poetry

Poetry is a python dependency and package manager that is a lot more user friendly and has more functionalities than pip. It manages the virtual envrionment for you, and allows for easier versioning, as well as dependency grouping. It has a similar feel to the `package.json` of Node.js, and has a lock file that tracks the exact versions of the dependencies you are using. This creates a reproducible environment, and makes it easier to share your project with others.

## Formatting and linting

I always used Prettier as the default formatter, but there are many other options.

- Black
- isort
- flake8

## Typing

### Type hints

Python has a type hinting system that is similar to TypeScript. It does not do type narrowing as well as TypeScript (due to Python's objects model), but it is still useful. It allows for better intellisense and makes the code more readable. It also allows for better error checking, and can be used to generate documentation.

### mypy

mypy is a static type checker for Python. It checks for type errors and can help you pick up on errors that you might have missed. (Although it is not as updated with the latest features of Python)

### pydantic

I used this library when working with FastAPI and I loved it. It helps with data validation and runtime type checking, similar to that of the **Zod** library in Typescript, and is especially useful when working with APIs and data serialization. The dataclasses library greatly reduces the boilerplate code needed to create classes with type hints.

## Built-in functions

Python has lots of great built-in tools for many specific yet common tasks. Just to name a few:

- functools
- pathlib
- tempfile
- shutil
- urllib
- textwrap
