module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  tabWidth: 2,
  semi: false,
}

// printWidth: 100 — длина строки не должна превышать 100 символов.
// singleQuote: true — все двойные кавычки будут преобразованы в одинарные. Подробности об этом можно почитать в руководстве по стилю от Airbnb. Мне очень нравится это руководство, я использую его для повышения качества моего кода.
// trailingComma: 'all' — обеспечивает наличие запятой после последнего свойства объекта. Вот хорошая статья на эту тему.
// bracketSpacing: true — отвечает за вставку пробелов между телом объекта и фигурными скобками в объектных литералах. Если это свойство установлено в true, то объекты, объявленные с использованием объектных литералов, будут выглядеть так: { foo: bar }. Если установить его в false, то такие конструкции будут выглядеть так: {foo: bar}.
// jsxBracketSameLine: false — благодаря этому правилу символ > в многострочных JSX-элементах будет помещён в последней строке. Вот как выглядит код, если это правило установлено в true:
