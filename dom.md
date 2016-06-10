## Create a DOM Element

```
var element = document.createElement(tagName);
```

## Add a created DOM Element to DOM

```
var child = element.appendChild(child);
```

## Styling

```
element.style.color = "#ff3300";
element.style.marginTop = "30px";
element.style.paddingBottom = "30px";
```

## Getting / setting HTML

```
// get the HTML of "element"
var content = element.innerHTML;
// set the HTML of "otherElement"
otherElement.innerHTML = content;
```

## Getting / setting the class name

```
// get the class name of "element"
var cName = element.className;
// set the class name of "otherElement"
otherElement.className = cName;
```

## Getting / setting id

```
// get the id of "element"
var idStr = element.id;
// set the id of "otherElement"
otherElement.id = idStr;
```

## Accessing DOM Element

### By Class Name

```
elements = document.getElementsByClassName(names); // or:
elements = rootElement.getElementsByClassName(names);
```

### By Tag Name

```
var elements = document.getElementsByTagName(name);
```

### Accessing First Found Selector

```
element = document.querySelector(selectors);
var el = document.querySelector(".myclass");
```

### Accessing an Array of Selectors

```
elementList = document.querySelectorAll(selectors);
elementList = document.querySelectorAll(selectors);
```

## Relationships

### Children of given element

```
var ndList = elementNodeReference.childNodes;
```

### Next Sibling of a Given Element

```
nextNode = node.nextSibling
```

### Child Elements of a Given Object

```
var elList = elementNodeReference.children;
```

### Element Immediately Following Specified Element

```
var nextNode = elementNodeReference.nextElementSibling;
```

## Manipulate classes

```
var elementClasses = elementNodeReference.classList;
div.classList.remove("foo");
div.classList.add("anotherclass");
div.classList.toggle("visible");
alert(div.classList.contains("foo"));
```
