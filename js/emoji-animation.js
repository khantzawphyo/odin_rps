document.addEventListener('DOMContentLoaded', () => {
    const emojis = ['✊', '🖐️', '✌️'];
    const createEmoji = () => {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(emoji);

        emoji.addEventListener('animationend', () => {
            emoji.remove();
        });
    };

    setInterval(createEmoji, 500);
});