
### Words

```javascript
let scriptInject = document.createElement('script');
scriptInject.src = '{{script}}';
document.head.appendChild(scriptInject);
```


```html
<script type="module" src="{{script}}"></script>
```



```javascript

  document.addEventListener('MenuKorePlus:init', function (e) {
    console.log('menu-plus-init event fired');
  });

  document.addEventListener('MenuKorePlus:sidebar-change', function (e) {
    console.log('MenuKorePlus:changeView event fired::',e.detail.sidebar);
  });

    document.addEventListener('MenuKorePlus:login', function (e) {
    console.log('login::',e.detail.sidebar);
  });

```


