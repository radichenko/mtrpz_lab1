# Markdown to HTML Converter

## Description

This application is a command-line tool designed to convert Markdown files to HTML format. It can be used for quickly and conveniently generating HTML code from text written in Markdown format.

## Building and Running the Project

1. Clone the repository to your local machine:

```bash
    git clone https://github.com/radichenko/mtrpz_lab1.git
```
2. Open a terminal and navigate to the root directory of the project:

```bash
    cd mtrpz_lab1
```

3. Run the command `npm install` to install the necessary dependencies:

```bash
    npm install
```

4. Execute the program using one of the commands:

```bash
    node index.js test.md
```
```bash
    node index.js test.md --out out.html --format=bash
```
   
It will convert Markdown to HTML (or bash). If only the input file path is specified, the HTML will be outputted to the console.

## Tests

After project setup you can simply run `npx test` to get results

## Links

[Link to the revert commit](https://github.com/radichenko/mtrpz_lab1/commit/47560f626e107eb60e00eda463cbb9ca593b9eea)
[Link to commit with ci](https://github.com/radichenko/mtrpz_lab1/commit/c3d42695d7e17cce1f20616bbb8f8023f71303a1)
[Link to pull request with ci](https://github.com/radichenko/mtrpz_lab1/pull/1)
[Link to commit with broken ci](https://github.com/radichenko/mtrpz_lab1/commit/c6baa7b9bf2872bd440dbc355c218ea12eac1cb1)

## Conclusion

Тести можуть бути корисними, але мені не доводилось багато з ними працювати. Але все ж я вважаю, що вони так само необхідні, як і рефакторинг і займають схоже місце в екосистемі розробки ПЗ, але є значно менш популяризованим. Тобто, без нього код буде працювати, а на початку розробка буде вестись навідь швидше, але надалі можуть виникнути проблеми