// <⚠️ DONT DELETE THIS ⚠️>
import './styles.css';
// <⚠️ /DONT DELETE THIS ⚠️>

const country = localStorage.getItem('country');
const select = document.querySelector('select');

for (const option of select.options) {
    if (option.value === country) {
        option.selected = true;
        break;
    }
}

select.addEventListener('change', (event) => {
    const { value } = event.target;

    window.localStorage.setItem('country', value);
});
