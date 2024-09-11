# Using Import Aliases and ESLint Configuration

## Requirements

- We have a project with TypeScript and Eslint(with Prettier). So we need the base dependencies as usual:
    - "typescript"
    - "ts-node"
    - "tsconfig-paths"
    - "eslint"
    - "eslint-plugin-prettier"
    - "prettier"
    - "prettier-eslint"
    - "@typescript-eslint/parser"
    - "@typescript-eslint/eslint-plugin"
- The trick to make alias path importation works propertly along with the Rule `import/no-unresolved` that we have it in the eslintrc.json file, we just need to use:
    - "eslint-plugin-import"
    - "eslint-import-resolver-alias"

## How it works

Import aliases are a powerful feature that allows us to simplify module paths in our code. Instead of having long, hard-to-read relative paths like:

- `../../../utils/myUtil`

We can define an alias like `@pom` and use it in our imports:

- `@pom/Login.Page.ts`

### **This makes our code more readable and easier to maintain.**

In the context of this `.eslintrc.json` file, several aliases have been defined in the ESLint configuration:

```json
// Add these values in the extends array in the .eslintrc.json file:
"extends": [ "plugin:import/errors", "plugin:import/warnings", "plugin:import/recommended", "plugin:import/typescript" ],
```

```json
// Add these values in the parserOptions project array in the .eslintrc.json file:
"parserOptions": {
  "project": ["./tsconfig.json", "./tsconfig.eslint.json"]
}
// add this "import" in the plugins array in the .eslintrc.json file:
"plugins": [..."import"],
```

```json
// Add these values in the root object in the .eslintrc.json file:
"settings": {
  "import/resolver": {
    "alias": {
      "map": [
        ["@pom", "./test/pageobjects"],
        ["@utils", "./test/utils"],
        ["@testBase", "./test/TestBase.ts"],
        ["@testPlan", "./test/TestPlan.ts"],
        ["@wdioconf", "./wdio.conf.ts"]
      ],
      "extensions": [".ts", ".js", ".json"]
    }
  }
}
```

Here, each pair of brackets defines an alias. The first element of the pair is the alias, and the second is the actual path that the alias points to. For example,

- `["@pom", "./test/pageobjects"]` defines an alias:
    - `@pom` that points to the path `./test/pageobjects`

The extensions property defines the file extensions that ESLint should consider when resolving these aliases. In this case, `.ts`, `.js`, and `.json` files will be considered.

This configuration allows ESLint to correctly understand and resolve these aliases, meaning it can detect import errors and provide useful real-time feedback. Without this configuration, ESLint would not be able to resolve these aliases and would mark imports that use them as errors, even if they are valid.

If we have a `tsconfig.json` file with a similar alias configuration, we would need to replicate that configuration in our `.eslintrc.json` file.

### For example, if our tsconfig.json file has the following paths configuration

```json
"paths": {
  "@pom/*": ["test/pageobjects/*"],
  "@utils/*": ["test/utils/*"],
  "@testBase": ["test/TestBase.ts"],
  "@testPlan": ["test/TestPlan.ts"],
  "@wdioconf": ["wdio.conf.ts"]
}
```

### We would translate this to the following configuration in our `.eslintrc.json` file

```json
"map": [
  ["@pom", "./test/pageobjects"],
  ["@utils", "./test/utils"],
  ["@testBase", "./test/TestBase.ts"],
  ["@testPlan", "./test/TestPlan.ts"],
  ["@wdioconf", "./wdio.conf.ts"]
]
```

This ensures that both TypeScript and ESLint understand and use the same aliases, leading to consistent behavior across our development environment.
