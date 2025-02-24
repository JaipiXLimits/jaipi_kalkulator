const inputBox = document.getElementById('inputBox');
const buttons = document.querySelectorAll('button');
let input = '';

// Load Lottie animation
lottie.loadAnimation({
    container: document.getElementById('logo-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/Animation.json' // Ganti dengan path file JSON Anda
});

// Fungsi untuk menangani input dari tombol kalkulator
function handleButtonClick(buttonText) {
    if (buttonText === 'AC') {
        input = '';
        inputBox.value = '';
    } else if (buttonText === 'DEL') {
        input = input.slice(0, -1);
        inputBox.value = input;
    } else if (buttonText === '=' || buttonText === 'Enter') {
        try {
            // Ganti simbol × dan ÷ kembali ke * dan / sebelum evaluasi
            const expression = input.replace(/×/g, '*').replace(/÷/g, '/');
            const result = eval(expression);
            inputBox.value = result;
            input = result.toString();
        } catch (error) {
            inputBox.value = 'Error';
            input = '';
        }
    } else {
        // Tambahkan input ke variabel input
        input += buttonText;
        inputBox.value = input;
    }
}

// Tambahkan event listener untuk setiap tombol
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        handleButtonClick(buttonText);
    });
});

// Tambahkan event listener untuk input keyboard
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Handle angka (0-9)
    if (/[0-9]/.test(key)) {
        handleButtonClick(key);
    }
    // Handle operator (+, -, *, /)
    else if (['+', '-', '*', '/'].includes(key)) {
        // Jika tombol yang ditekan adalah '/', ganti dengan '÷'
        // Jika tombol yang ditekan adalah '*', ganti dengan '×'
        const buttonText = key === '/' ? '÷' : key === '*' ? '×' : key;
        handleButtonClick(buttonText);
    }
    // Handle titik desimal
    else if (key === '.') {
        handleButtonClick(key);
    }
    // Handle Enter (untuk =)
    else if (key === 'Enter') {
        handleButtonClick('=');
    }
    // Handle Backspace (untuk DEL)
    else if (key === 'Backspace') {
        handleButtonClick('DEL');
    }
    // Handle Escape (untuk AC)
    else if (key === 'Escape') {
        handleButtonClick('AC');
    }
});
