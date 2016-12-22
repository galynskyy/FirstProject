# FirstProject

# Authors

- Andrey Shevtsov
- Vladimir Galynsky
- Timur Chumakov
- Ivan Opanasiuk
- Aleksandr Chernenko
- Anna Sychugina

# Style Guide

## Html:
Закрывать одиночные теги (`<img>`, `<input>` и т.д.)
```html
<img src="static/img/vk-min.svg" alt="111" class="social__image"></img>
```

Не пропускать необязательные закрывающие теги (например, `<li>` или `<body>`):
```html
<li class="social__item social__item__tw">
    <a href="#">
        <img src="static/img/tweet-min.svg" alt="222" class="social__image"></img>
    </a>
</li>
```

Атрибуты типа `required` оформлять в виде кода следующим образом:
```html
<input type="..." required="required">
```

Явно указывать `doctype`, это гарантирует, что страница будет выглядеть единым образом во всех браузерах:
```html
<!DOCTYPE html>
```

Явно указывать кодировку, чтобы обеспечить корректное отображение текста:
```html
<meta charset="UTF-8">
```

Все стилевые файлы проекта подключать внутри `<head>` при помощи `<link>`. Атрибут `type` для `<link>` не указывать:
```html
<head>
    <meta charset="UTF-8">
    <title>FirstProgect / Login</title>
    <link href="static/styles/default.css" rel="stylesheet">
    <link href="static/styles/fonts.css" rel="stylesheet">
</head>
```

Значения атрибутов, отвечающих за логику (например, `checked`, `disabled` ) не указывать, а сами атрибуты указывать последними.

Явно указывать размеры изображений с помощью атрибута в пикселях или процентах.

## CSS:
Каждое объявление писать на новой строке:
```css
.login__item {
	width: 400px;
	height: 40px;
	overflow: hidden;
	margin: 0 auto 19px;
}
```

Для отступов внутри правил использовать 1 tab.

Во всех случаях в стилях использовать двойные кавычки.

После двоеточия помещать один пробел. Перед двоеточием пробел не ставить.

Перед открывающейся фигурной скобкой ставить один пробел. После скобки производить запись с новой строки.

Закрывающую фигурную скобку размещать на новой строке и без отступа. После этого помещать пустую строку.

## Задание цвета:

**Использование формата RGBA:**
в случае создания блоков с полупрозрачным фоном. Для этого последним элементом указываем значение прозрачности:
```css
.opacity {
  background: rgba(0, 0, 0, 0.5);
}
```

**Использование формата RGB/HEX:**
Использовать во всех случаях, не входящих в описанные выше.

**RGB** использовать преимущественно в тех случаях, когда требуется указать цвет в процентах. Например, `rgb(100%,0%,0%)`

**HEX** использовать в виде `#rrggbb`:
```css
.social__item__tw {
	background: #55acef;
}
```
```css
.login__link {
	padding: 5px;
	font: 16px "Roboto-Regular", sans-serif;
	color: #3a8bc0;
}
```
 **Но** использовать запись вида `#rgb` в случае, когда в HEX-числе имеется три пары одинаковых символов. Например:

    #ffdd66	#fd6
    #cccccc	#ccc

## JS:
	"no-tabs" : 0,
	"strict" : 0,
	"arrow-body-style": [0],
	"padded-blocks": 0,
	"indent": [4, "tab", {"SwitchCase": 1}],
	"class-methods-use-this": 0,
	"no-underscore-dangle": 0,
	"func-names" : 0,
	"no-trailing-spaces": 0,
	"prefer-template": 0,
	"no-extra-semi": 0,
	"semi": 0,
	"no-undef": 0,
	"comma-dangle": 0,
	"no-multiple-empty-lines": 0,
	"no-mixed-spaces-and-tabs": 0,
	"no-useless-escape": 0,

## Наименование классов:
В наименовании классов используется сокращенный вариант методологии [БЭМ](https://ru.bem.info/methodology/) : `блок__элемент _модификатор: socials__item _vk`
