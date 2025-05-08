document.getElementById('orderForm').addEventListener('submit', function (e) {
    let valid = true;

    const mezok = [
        {
            elem: document.getElementById('nev'),
            feltetel: value => value.length >= 8 && value.length <= 30,
            uzenet: 'A nÃ©v 8â€“30 karakter hosszÃº legyen!'
        },
        {
            elem: document.getElementById('email'),
            feltetel: value => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value),
            uzenet: 'HibÃ¡s e-mail cÃ­m!'
        },
        {
            elem: document.getElementById('darab'),
            feltetel: value => !isNaN(value) && value >= 1 && value <= 10,
            uzenet: 'A darabszÃ¡m 1 Ã©s 10 kÃ¶zÃ¶tti szÃ¡m legyen!'
        }
    ];

    const napElem = document.getElementById('nap');

    // HibÃ¡k tÃ¶rlÃ©se
    mezok.forEach(({ elem }) => {
        elem.style.backgroundColor = '';
        const hiba = document.querySelector(`#hiba-${elem.id}`);
        if (hiba) hiba.remove();
    });

    const mutatHibat = (mezo, uzenet) => {
        const hiba = document.createElement('div');
        hiba.id = 'hiba-' + mezo.id;
        hiba.style.color = 'red';
        hiba.style.fontSize = '0.9em';
        hiba.textContent = uzenet;
        mezo.parentNode.appendChild(hiba);
        mezo.style.backgroundColor = '#f99';
        valid = false;
    };

    // MezÅ‘k ellenÅ‘rzÃ©se
    mezok.forEach(({ elem, feltetel, uzenet }) => {
        const value = elem.value.trim();
        if (!feltetel(value)) {
            mutatHibat(elem, uzenet);
        }
    });

    // Nap ellenÅ‘rzÃ©s
    const napHiba = document.querySelector('#hiba-nap');
    if (napHiba) napHiba.remove();

    if (napElem.value === "") {
        const hiba = document.createElement('div');
        hiba.id = 'hiba-nap';
        hiba.style.color = 'red';
        hiba.style.fontSize = '0.9em';
        hiba.textContent = 'VÃ¡lassz egy napot!';
        napElem.parentNode.appendChild(hiba);
        napElem.style.backgroundColor = '#f99';
        valid = false;
    } else {
        napElem.style.backgroundColor = '';
    }

    if (!valid) e.preventDefault();
});
