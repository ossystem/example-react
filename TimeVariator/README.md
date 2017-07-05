# TimeVariator Component
This component is designed to enter the time and select the time interval (seconds, minutes, hours, etc.) variations of time intervals are taken from the properties
```javascript
variants = []
```
 of the component in the form of an array of objects of type
```javascript
{value: type number,primaryText:type string}
```
are specified in propTypes. Functions also take the properties of the component. Function-property

```javascript
getMultiplyByVariant(variant)
```

must return a multiplier that is multiplied by the entered time, depending on the selected time interval. Function-property
```javascript
getVariantByValue(value)
```
must return the selected type depending on the initial value of the component. Function-property
```javascript
onChange(value)
```
 is called by the component when the time interval or the value changes, and argument of this function is calculated by formula:
 ```javascript
 value*getMultiplyByVariant(variant)
 ```
 Also component has properties:
 - style
 - textFieldStyle
 - textFieldInputStyle
 - selectFieldStyle
 
For styling component.

The component scales well and you can change its work by programming separately each of these properties without having to change the structure of the component itself.

The following packages are also used:
  - material-ui
  - react-redux-i18n
