# ajaz, ajzx: Did you mean ajax? 



![didyiumean](https://user-images.githubusercontent.com/4636028/53097977-ee9df400-3522-11e9-9e2f-f7b3874a784d.gif)
Clone the repository to the place on the server (php support is required).

If you want to install [require.js](http://requirejs.org/) dependency locally just put into console
```bash
bower install && npm install
```
### Usage
For of all import the database didyoumean.sql which contains the implementation of [Levenshtein distance function](https://en.wikipedia.org/wiki/Levenshtein_distance) (taken from [openquery.blog](https://en.wikipedia.org/wiki/Levenshtein_distance)). In seach.php put the path to the file containing variables: $user and $password containing access data to imported database.
In your index.php file (or the file in which you want to put gallery).
Then put a file named itemTemplate.html into the folder config. It contains (according to it name) a template of an item filled by the values of the records from the database:
filled by the fields from the database. For example:
```html 
<li {{class}}>
    <img src="{{src}}" /><span><span class="bolder">Role:</span>{{role}}</span> <span><a class="bolder">Surname: </a>{{surname}}</span>    
</li>
```
Using input field fuzzy searching is done using the key defined in config/main.json file ('surname' in our case).

### Autopromotion
This project can be treaten as an example of the usage [__ajax library](https://github.com/sfra/__ajax).
