const ajax = new __ajax('config/itemTemplate.html');
const ajaxSearch = new __ajax('search.php', {
  method: 'post'
});
const ajaxKey = new __ajax('config/main.json');
let searchKey = null;


let template = null;
ajax.get().then(data => {
  template = data;
});

const ajaxItems = new __ajax('data.json');

window.onload = () => {

  const $results = document.getElementById('auto-results');
  const $input = document.getElementById('auto-input');

  $input.focus();


  ajaxKey.get().then(data => {
    searchKey = JSON.parse(data)['searchKey'];
   

    $input.addEventListener('keyup', (e) => {
      let $children = $results.querySelectorAll('li');
      if (e.key === 'Enter') {

        for (let i = 0, max = $children.length; i < max; i++) {
          if ($children[i].classList.contains('highlighten')) {
            handleSelected($children[i]);
            $results.innerHTML = '';
            return;
          }
        }
      }


      if (e.key === 'ArrowDown') {
        e.preventDefault();
        for (let i = 0, max = $children.length; i < max - 1; i++) {

          if ($children[i].classList.contains('highlighten')) {

            $children[i].classList.remove('highlighten');
            $children[i + 1].classList.add('highlighten');
            return;
          }

        }

      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        for (let i = 1, max = $children.length; i < max; i++) {

          if ($children[i].classList.contains('highlighten')) {
            $children[i].classList.remove('highlighten');
            $children[i - 1].classList.add('highlighten');
          }

        }
        return;
      }



      if ($input.value.length > 2) {

        ajaxItems.setParameters({
          [`${searchKey}`]: $input.value
        });


        $results.innerHTML = '';
        ajaxSearch.setParameters({
          [`${searchKey}`]: $input.value
        });

        ajaxSearch.get().then(data => {
          $results.innerHTML = data;
          $input.classList.add('active');
        });


      } else {
        $results.innerHTML = '';
        $input.classList.remove('active');
      }
    }, false);

  });
}


function handleSelected(selected) {
  console.log(selected.innerText);
  document.getElementById('auto-input').value = selected.innerText.split(': ').pop();
}