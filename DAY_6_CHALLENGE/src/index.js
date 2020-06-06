// <⚠️ DONT DELETE THIS ⚠️>
import './styles.css';
// <⚠️ /DONT DELETE THIS ⚠️>

const country = localStorage.getItem('country');
const select = document.querySelector('select');

if (country) {
    const cachedOption = document.querySelector(`option[value=${country}]`);
    cachedOption.selected = true;
}

select.addEventListener('change', (event) => {
    const { value } = event.target;

    window.localStorage.setItem('country', value);
});
