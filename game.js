(() => {
    function generateNumbers() {
        let numbers = [];
        
        while(numbers.length != 16) {
            let firstNumber = Math.round(Math.random() * 7) + 1;
            if (numbers.includes(firstNumber)) continue;
            let secondNumber = firstNumber;
            numbers.push(firstNumber, secondNumber);
        }

        return numbers;
    }

    function mixNumbers(originalNumbers) {
        let mixedNumbers = originalNumbers.slice(0);

        for (let i = mixedNumbers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [mixedNumbers[i], mixedNumbers[j]] = [mixedNumbers[j], mixedNumbers[i]];
        }

        return mixedNumbers;
    }

    function createCard() {
        let container = document.getElementById('game');
        let numbers = generateNumbers();
        let mixedNumbers = mixNumbers(numbers);

        for (let i = 0; i < 16; ++i) {
            let card = document.createElement('div');
            card.classList.add('card', 'card-rotate');
            card.textContent = mixedNumbers[i];
            container.append(card);
        }

        let repeatBtn = document.createElement('button');
        repeatBtn.textContent = 'Сыграть еще раз';
        repeatBtn.classList.add('repeat-btn');
        container.append(repeatBtn);
    }

    function rotateCard() {
        let cards = document.querySelectorAll('.card');
        let countOpenCards = 0;
        let firstCard, secondCard;

        cards.forEach((card) => {
            card.addEventListener('click', () => {
                card.classList.toggle('card-rotate');
                countOpenCards += 1;
                if (countOpenCards === 1) {
                    firstCard = card;
                } else {
                    secondCard = card;
                };
                if (countOpenCards === 2) {
                    if (firstCard.textContent !== secondCard.textContent) {
                        setTimeout(() => {
                            firstCard.classList.add('card-rotate');
                            secondCard.classList.add('card-rotate');
                        }, 250);
                    }
                    countOpenCards = 0;
                };

                repeatGame();
                // let rotatedCards = document.querySelectorAll('.card-rotate');

                // if (rotatedCards.length === 0) {
                //     rotatedCards.forEach((card) => {
                //         repeatGame();
                //     })
                // }
            });
        })
    }

    function repeatGame() {
        let rotatedCards = document.querySelectorAll('.card-rotate');
        let repeatBtn = document.querySelector('.repeat-btn');

        if (rotatedCards.length === 0) {
            repeatBtn.classList.add('repeat-btn-active');
        }

        repeatBtn.addEventListener('click', () => {
            rotatedCards.forEach((card) => {
                card.classList.add('card-rotate');
            });
            repeatBtn.classList.remove('repeat-btn-active');
        })
    }

    document.addEventListener('DOMContentLoaded', () => {
        createCard();
        rotateCard();
    });
})();