# HorizontalScroller

  HorizontalScroller - A quickly built plugin that scrolls lists horizontaly with left/right advancer buttons, needs more work probably

* Vanilla Javascript
* Easy to use

## Usage

Include HorizontalScroller

```html
<script src="hScroller.js"></script>
```
Setup HTML with classes

```html
    <div id="List1" class="hs-Wrapper">
        <nav class="hs-ListWrap">
            <ul class="hs-List">
                <li class="hs-Item"><a href="#">List item</a></li>
                <li class="hs-Item"><a href="#">List item</a></li>
                <li class="hs-Item"><a href="#">List item</a></li>
                <li class="hs-Item"><a href="#">List item</a></li>
            </ul>
        </nav>
        <button class="hs-Advancer hs-Advancer_Left" type="button">
            <svg class="pn-Advancer_Icon" viewbox="0 0 100 100"><path class="arrow" d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z" /></svg>
        </button>
        <button class="hs-Advancer hs-Advancer_Right" type="button">
            <svg class="pn-Advancer_Icon" viewbox="0 0 100 100"><path class="arrow" d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z" transform="translate(85,100) rotate(180)" /></svg>
        </button>
    </div>
```

`HorizontalScroller()` constructor accepts two arguments: the container element ID and an optional SETTINGS object.

```js
    (function() {
      
        var hScroller = new HorizontalScroller('List1');
        
        window.onresize = function(event) {
            hScroller.showHideAdvancers();
        };
        
    })();
```

```html

  SETTINGS
  
  ** @listTravelDistance        distance to travel on advancer click (default:150px)
  ** @paddingWithoutAdvancers   set padding without advancers
  ** @paddingWithAdvancers      set padding with advancers
```