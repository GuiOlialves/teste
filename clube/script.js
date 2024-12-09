const character = document.getElementById('character');
const sprites = {
    up: ['Sprites/costa1.png', 'Sprites/costa2.png', 'Sprites/costa3.png', 'Sprites/costa4.png'],
    down: ['Sprites/frente1.png', 'Sprites/frente2.png', 'Sprites/frente3.png', 'Sprites/frente4.png'],
    left: ['Sprites/esquerda1.png', 'Sprites/esquerda2.png', 'Sprites/esquerda3.png', 'Sprites/esquerda4.png'],
    right: ['Sprites/direita1.png', 'Sprites/direita2.png', 'Sprites/direita3.png', 'Sprites/direita4.png']
};

let positionX = window.innerWidth / 2;//anda
let positionY = window.innerHeight / 2;//anda
let currentFrame = 0; //fram inicial
let currentDirection = 'down';


//funcao de proximade, ela vai rodar o tempo todo para ver se o personagem esta perto
function checkProximity() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();//esqueci
        const popup = card.querySelector('.popup');//pega o pop up
        const link = card.getAttribute('data-link');//coloca o link

        // Calcula a distância entre o personagem e o centro do card, esta funcionando por algum motivo
        const distanceX = Math.abs((positionX + character.offsetWidth / 2) - (rect.left + rect.width / 2));
        const distanceY = Math.abs((positionY + character.offsetHeight / 2) - (rect.top + rect.height / 2));

        // Exibe o pop-up se o personagem estiver próximo
        if (distanceX < 200 && distanceY < 120) {
            popup.style.display = 'block';

           
                popup.onclick = () => {
                window.location.href = link; // Redireciona para o link do card
            };
            /*if(distanceX < 80 && distanceY < 100){
                window.location.href = link; // Redireciona para o link do card
           }*/
        } else {
            popup.style.display = 'none';
            popup.onclick = null; // Remove o evento se o pop-up não estiver visível
        }
    });
}



//muda frames
function updateSprite()  {
    character.style.backgroundImage = `url(${sprites[currentDirection][currentFrame]})`;
    currentFrame = (currentFrame + 1) % sprites[currentDirection].length;
}
//move
function moveCharacter(direction) {
    currentDirection = direction;
    updateSprite();

    switch (direction) {
        case 'up':
            positionY -= 5;
            break;
        case 'down':
            positionY += 5;
            break;
        case 'left':
            positionX -= 5;
            break;
        case 'right':
            positionX += 5;
            break;
    }

    // Atualiza a posição do personagem
    character.style.transform = `translate(${positionX}px, ${positionY}px)`;

     // Calcula o deslocamento da câmera
     let offsetX = window.innerWidth / 2 - positionX;
     const offsetY = window.innerHeight / 2 - positionY;
     // Limita o deslocamento para a esquerda (impede que o main vá além de 0 para esquerda ou antes do titulo)
     offsetX = Math.min(offsetX, 0);
    // Move o main para centralizar o personagem na camera
    document.querySelector('main').style.transform = `translate(${offsetX}px`;
    checkProximity();
}
//eventos
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            moveCharacter('up');
            break;
        case 'ArrowDown':
            moveCharacter('down');
            break;
        case 'ArrowLeft':
            moveCharacter('left');
            break;
        case 'ArrowRight':
            moveCharacter('right');
            break;
    }
});






// Chame checkProximity sempre que o personagem se mover
window.addEventListener('keydown', (e) => {
    const directions = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
    if (directions[e.key]) {
        moveCharacter(directions[e.key]);
    }
});
