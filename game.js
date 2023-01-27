(() => {
    
    function generateNumbers() {
        let numbers = [];
        let columns = document.querySelector('.input-width');
        let rows = document.querySelector('.input-height');
        let count = columns.value * rows.value;
        
        while (numbers.length != count) {
            let firstNumber = Math.round(Math.random() * (count / 2 - 1)) + 1;
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
        let columns = document.querySelector('.input-width');
        let rows = document.querySelector('.input-height');
        let count = columns.value * rows.value;

        let timer = document.createElement('div');
        let timerInput = document.querySelector('.timer-input');
        let timerValue = timerInput.value;
        timer.classList.add('timer');
        timer.textContent = `${timerValue} sec`;
        document.body.prepend(timer);
        setTimeout(() => {
            timer.classList.add('active');
        }, 500);

        let interval = setInterval(() => {
            timer.textContent = `${timerValue} sec`;
            if (timerValue === 0) {
                clearInterval(interval);
                let finishGame = document.createElement('div');
                finishGame.classList.add('span-finish');
                finishGame.textContent = 'gameOver';
                container.append(finishGame);
                finishGame.classList.add('active');
                setTimeout(() => {
                    location.reload()
                }, 1000);
            }
            timerValue--;

        }, 1000);

        if (+columns.value === 2) {
            container.classList.add('container-columns-2');
        } else if (+columns.value === 6) {
            container.classList.add('container-columns-6');
        } else if (+columns.value === 8) {
            container.classList.add('container-columns-8');
        } else if (+columns.value === 10) {
            container.classList.add('container-columns-10');
        };

        if (+rows.value === 2) {
            container.classList.add('container-rows-2');
        } else if (+rows.value === 6) {
            container.classList.add('container-rows-6');
        } else if (+rows.value === 8) {
            container.classList.add('container-rows-8');
        } else if (+rows.value === 10) {
            container.classList.add('container-rows-10');
        };

        for (let i = 0; i < count; ++i) {
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
        let columns = document.querySelector('.input-width');
        let rows = document.querySelector('.input-height');
        let count = columns.value * rows.value;

        repeatBtn.classList.add('btn-active');
        
        repeatBtn.addEventListener('click', () => {
            let numbers = generateNumbers();
            let mixedNumbers = mixNumbers(numbers);
            
            console.log('Новая раскладка:')
            console.log(mixedNumbers[0], mixedNumbers[1], mixedNumbers[2], mixedNumbers[3]); // решение
            console.log(mixedNumbers[4], mixedNumbers[5], mixedNumbers[6], mixedNumbers[7]); // решение
            console.log(mixedNumbers[8], mixedNumbers[9], mixedNumbers[10], mixedNumbers[11]); // решение
            console.log(mixedNumbers[12], mixedNumbers[13], mixedNumbers[14], mixedNumbers[15]); // решение
            
            for (let i = 0; i < count; ++i) {
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
            settingFieldInputWidth.classList.add('field-input', 'input-width');
            settingFieldInputWidth.value = 4;
            let settingFieldX = document.createElement('span');
            settingFieldX.textContent = 'X';
            let settingFieldInputHeight = document.createElement('input');
            settingFieldInputHeight.classList.add('field-input', 'field-input-height', 'input-height');
            settingFieldInputHeight.value = 4;

            let settingTimerDesc = document.createElement('span');
            settingTimerDesc.textContent = 'timerSize:';

            let settingTimerInput = document.createElement('input');
            settingTimerInput.classList.add('field-input', 'timer-input');
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
                if (((settingFieldInputHeight.value % 2) !== 0) || settingFieldInputHeight.value < 2 || settingFieldInputHeight.value > 10) {
                    settingFieldInputHeight.value = 4;
                    console.log(settingFieldInputHeight.value);
                };
                if (((settingFieldInputWidth.value % 2) !== 0) || settingFieldInputWidth.value < 2 || settingFieldInputWidth.value > 10) {
                    settingFieldInputWidth.value = 4;
                    console.log(settingFieldInputWidth.value);
                }
                settingBlock.classList.remove('setting-active');
                document.body.classList.remove('body-color');
                createCard();
                rotateCard();
            });
        });
    });
})();