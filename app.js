// Movie class
class Movie {
    constructor(ID, title, category, date, rate) {
        this.ID = ID;
        this.title = title;
        this.category = category;
        this.date = date;
        this.rate = rate;
    }
}
// UI class
class UI {
    static displayMovies() {

        // const StoredTasks = [{
        //         title: 'Task One',
        //         deadline: '1010101',
        //         description: 'A01'
        //     },
        //     {
        //         title: 'Task Two',
        //         deadline: '1011005',
        //         description: 'Q03'
        //     }
        // ];

        const movies = Store.getMovies();

        movies.forEach((movie) => UI.addMovieToList(movie));
    }

    static addMovieToList(movie) {
        const list = document.querySelector('#Movie-List');
        // console.log(list);
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${movie.ID}</td>
            <td>${movie.title}</td>
            <td>${movie.category}</td>
            <td>${movie.date}</td>
            <td>${movie.rate}</td>
            <td><a gerf="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);

    }

    static clearFields() {
        document.querySelector('#ID').value = '';
        document.querySelector('#title').value = '';
        document.querySelector('#category').value = '';
        document.querySelector('#date').value = '';
        document.querySelector('#rate').value = '';
    }

    static deleteMovie(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    // 
    static showalert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#listform');
        container.insertBefore(div, form);

        // Vanish in 3s
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}
// store class
class Store {
    static getMovies() {
        let movies;
        if (localStorage.getItem('movies') === null) {
            movies = [];
        } else {
            movies = JSON.parse(localStorage.getItem('movies'));
        }

        return movies;
    }

    static addMovie(movie) {
        const movies = Store.getMovies();

        movies.push(movie);

        localStorage.setItem('movies', JSON.stringify(movies));
    }

    static removeMovie(description) {
        const movies = Store.getMovies();

        movies.forEach((movie, index) => {
            if (movie.description === description) {
                movies.splice(index, 1);
            }
        });

        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

// Event:Display movies
document.addEventListener('DOMContentLoaded', UI.displayMovies);

// Event: Add a movie
document.querySelector('#listform').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    //Get form values
    const ID = document.querySelector('#ID').value;
    const title = document.querySelector('#title').value;
    const category = document.querySelector('#category').value;
    const date = document.querySelector('#date').value;
    const rate = document.querySelector('#rate').value;

    // Validate
    if (ID === '' || title === '' || category === '' || date === '' || rate === '') {
        UI.showalert('Please fill in all field !', 'danger');
    } else {
        // Instatiate movie
        const movie = new Movie(ID, title, category, date, rate);

        // Add movie to UI
        UI.addMovieToList(movie);

        //Add movie to store 
        Store.addMovie(movie);

        // Show success message
        UI.showalert('Movie Added', 'success');

        // clear field
        UI.clearFields();
    }
});

// Event: Remove a movie
document.querySelector('#Movie-List').addEventListener('click', (e) => {
    // Remove Movie from UI
    UI.deleteMovie(e.target);

    // Remove success from store
    Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);
    // console.log(e.target.parentElement.previousElementSibling.textContent);
    // Show success message
    UI.showalert('Movie Removed', 'success');
});