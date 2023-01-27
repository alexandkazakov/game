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

            setTimeout(() => {
                card.classList.add('card-visible');
            }, 500);
        }

        let repeatBtn = document.createElement('button');
        repeatBtn.textContent = 'Сыграть еще раз';
        repeatBtn.classList.add('repeat-btn');
        container.append(repeatBtn);

        console.log('Первая раскладка:');
        console.log(mixedNumbers[0], mixedNumbers[1], mixedNumbers[2], mixedNumbers[3]); // решение
        console.log(mixedNumbers[4], mixedNumbers[5], mixedNumbers[6], mixedNumbers[7]); // решение
        console.log(mixedNumbers[8], mixedNumbers[9], mixedNumbers[10], mixedNumbers[11]); // решение
        console.log(mixedNumbers[12], mixedNumbers[13], mixedNumbers[14], mixedNumbers[15]); // решение
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

                let rotatedCards = document.querySelectorAll('.card-rotate');
                if (rotatedCards.length === 0) {
                    repeatGame();
                }
            });
        })
    }

    function repeatGame() {
        let visibleCards = document.querySelectorAll('.card');
        let repeatBtn = document.querySelector('.repeat-btn');

        repeatBtn.classList.add('btn-active');
        
        repeatBtn.addEventListener('click', () => {
            let numbers = generateNumbers();
            let mixedNumbers = mixNumbers(numbers);
            
            console.log('Новая раскладка:')
            console.log(mixedNumbers[0], mixedNumbers[1], mixedNumbers[2], mixedNumbers[3]); // решение
            console.log(mixedNumbers[4], mixedNumbers[5], mixedNumbers[6], mixedNumbers[7]); // решение
            console.log(mixedNumbers[8], mixedNumbers[9], mixedNumbers[10], mixedNumbers[11]); // решение
            console.log(mixedNumbers[12], mixedNumbers[13], mixedNumbers[14], mixedNumbers[15]); // решение
            
            for (let i = 0; i < 16; ++i) {
                visibleCards[i].classList.add('card-rotate');
                visibleCards[i].textContent = mixedNumbers[i];
            }

            repeatBtn.classList.remove('btn-active');
        })
    }

    document.addEventListener('DOMContentLoaded', () => {
        let container = document.getElementById('game');
        setTimeout(() => {
            document.body.classList.add('body-color');
        }, 500);

        let startBtn = document.createElement('button');
        startBtn.textContent = 'startGame';
        startBtn.classList.add('start-btn');
        container.append(startBtn);

        setTimeout(() => {
            startBtn.classList.add('btn-active');
        }, 1200);

        startBtn.addEventListener('click', () => {
            setTimeout(() => {
                settingBlock.classList.add('setting-active');
            }, 500);

            startBtn.classList.add('start-btn-click');

            let settingBlock = document.createElement('div');
            settingBlock.classList.add('setting');

            let settingTitle = document.createElement('h2');
            settingTitle.classList.add('setting-title');
            settingTitle.textContent = 'SETTING';

            let settingFieldDesc = document.createElement('span');
            settingFieldDesc.textContent = 'fieldSize:';

            let settingFieldInputWidth = document.createElement('input');
            settingFieldInputWidth.classList.add('field-input');
            settingFieldInputWidth.value = 4;
            let settingFieldX = document.createElement('span');
            settingFieldX.textContent = 'X';
            let settingFieldInputHeight = document.createElement('input');
            settingFieldInputHeight.classList.add('field-input', 'field-input-height');
            settingFieldInputHeight.value = 4;

            let settingTimerDesc = document.createElement('span');
            settingTimerDesc.textContent = 'timerSize:';

            let settingTimerInput = document.createElement('input');
            settingTimerInput.classList.add('field-input');
            settingTimerInput.value = 60;
            let settingTimerSec = document.createElement('span');
            settingTimerSec.textContent = 'sec';

            let settingBtn = document.createElement('button');
            settingBtn.classList.add('setting-btn');
            settingBtn.textContent = 'start >';
            

            settingBlock.append(settingTitle);
            settingBlock.append(settingFieldDesc);
            settingBlock.append(settingFieldInputWidth);
            settingBlock.append(settingFieldX);
            settingBlock.append(settingFieldInputHeight);

            settingBlock.append(settingTimerDesc);
            settingBlock.append(settingTimerInput);
            settingBlock.append(settingTimerSec);

            settingBlock.append(settingBtn);
            
            container.append(settingBlock);

            settingBtn.addEventListener('click', () => {
                settingBlock.classList.remove('setting-active');
                document.body.classList.remove('body-color');
                createCard();
                rotateCard();
            });
        });

        // createCard();
        // rotateCard();
    });
})();