# MatInputAutosize

[![NPM](https://nodei.co/npm/mat-input-autosize.png?compact=true)](https://nodei.co/npm/mat-input-autosize/)  
mat-input-autosize is an Angular directive that allows Material input elements to fit the width of their contents.  

## Details

This directive uses CSS styles to resize a matInput element dynamically. It removes the hard coded width from the matInput, and adds an invisible text element to set the width.

## Usage  

* Import the module with: `import { MatInputAutosizeModule } from 'mat-input-autosize'`.  
* Add `MatInputAutosizeModule` to your NgModule's imports array.  
* Apply the directive `matInputAutosize` to your <input> element that has a `matInput` directive on it.  

## Configuration  

The `matInputAutosize` directive has three optional inputs, which all take CSS styles:  
* `matInputAutosizeMinWidth` - Sets the minimum width the input will shrink to. (default: 120px)  
* `matInputAutosizeMaxWidth` - Sets the maximum width the input will grow to.  
* `matInputAutosizeFontStyle` - If the automatic width is incorrect, pass the computed `font` style of the input box to fix it.  

## Config Example  

```
<input matInput
       matInputAutosize
       matInputAutosizeMinWidth='80px'
       matInputAutosizeMaxWidth='160px'
       matInputAutosizeFontStyle='12px Roboto, sans-serif'>
```


