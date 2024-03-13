
### Words

```javascript
let scriptInject = document.createElement('script');
scriptInject.src = 'https://artanvrajolli.github.io/publicstuff/assets/index.js?x=1709213110';
document.head.appendChild(scriptInject);
```


```html
<script type="module" src="https://artanvrajolli.github.io/publicstuff/assets/index.js?x=1709213110"></script>
```



```javascript

  document.addEventListener('MenuKorePlus:init', function (e) {
    console.log('menu-plus-init event fired');
  });

  document.addEventListener('MenuKorePlus:sidebar', function (e) {
    console.log('MenuKorePlus:changeView event fired::', e.detail.sidebar);
  });

  document.addEventListener('MenuKorePlus:login', function (e) {
    console.log('MenuKorePlus:login event fired::', e.detail.loggedIn);
  });

```


