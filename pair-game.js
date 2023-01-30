(() => {
    function generateNumbers() {
        let numbers = [];
        let inputFieldValue = document.querySelector('.settings__field_input');
        let count = inputFieldValue.value * inputFieldValue.value;

        while (numbers.length != count) {
            let firstNumber = Math.round(Math.random() * (count / 2 - 1)) + 1;
            if (numbers.includes(firstNumber)) continue;
            let secondNumber = firstNumber;
            numbers.push(firstNumber, secondNumber);
        };

        for (let i = numbers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        };

        return {
            numbers,
            count,
        };
    }

    function timerRun() {
        let timerSpan = document.querySelector('.timer__span');
        let timerValue = document.querySelector('.settings__timer_input').value;
        let timerInterval = null;

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timerSpan.textContent = `${timerValue} sec`;
            if (timerValue < 10) {
                timerSpan.classList.add('timer__span_color');
            }
            if (timerValue < 5) {
                timerSpan.classList.add('animate__animated', 'animate__heartBeat', 'animate__infinite', 'animate__fast');
            }
            if (timerValue === 0) {
                clearInterval(timerInterval);
                timerSpan.classList.remove('timer__span_color', 'animate__animated', 'animate__heartBeat', 'animate__infinite', 'animate__fast');

                let gameOver = document.createElement('div');
                let gameOverTitle = document.createElement('h2');
                let gameOverText = document.createElement('p');
                let gameOverBtn = document.createElement('button');

                gameOver.classList.add('game-over', 'animate__animated', 'animate__bounceIn');
                gameOverTitle.classList.add('game-over__title');
                gameOverText.classList.add('game-over__text');
                gameOverBtn.classList.add('game-over__btn');

                gameOverTitle.textContent = 'GAME OVER';
                gameOverText.innerHTML = 'time is over.<br>you lose.<br>you can start over.';
                gameOverBtn.textContent = 'start again >';

                gameOver.append(
                    gameOverTitle,
                    gameOverText,
                    gameOverBtn,
                );
                document.body.append(gameOver);

                gameOverBtn.addEventListener('click', () => {
                    gameOver.classList.remove('animate__bounceIn');
                    gameOver.classList.add('animate__bounceOut');

                    setTimeout(() => {
                        gameOver.classList.add('display-none');
                        let numbers = generateNumbers().numbers;
                        let count = generateNumbers().count;
                        let cards = document.querySelectorAll('.card');
                        for (let i = 0; i < count; ++i) {
                            cards[i].classList.remove('card-open');
                            cards[i].textContent = numbers[i];
                        }
                        countOpenCards = 0;
                        timerRun();
                        console.log('Next time:'); // решение
                        console.log(numbers[0], numbers[1], numbers[2], numbers[3]); // решение
                        console.log(numbers[4], numbers[5], numbers[6], numbers[7]); // решение
                        console.log(numbers[8], numbers[9], numbers[10], numbers[11]); // решение
                        console.log(numbers[12], numbers[13], numbers[14], numbers[15]); // решение
                    }, 250);
                })
            };
            window.timerValue = timerValue;
            --timerValue;
        }, 1000);

        window.timerInterval = timerInterval;
    }

    function createCards() {
        let cardsBlock = document.querySelector('.cards');
        let numbers = generateNumbers().numbers;
        let count = generateNumbers().count;

        if (+count === 4) {
            cardsBlock.classList.add('cards-4');
        } else if (+count === 36) {
            cardsBlock.classList.add('cards-36');
        } else if (+count === 64) {
            cardsBlock.classList.add('cards-64');
        } else if (+count === 100) {
            cardsBlock.classList.add('cards-100');
        };

        for (let i = 0; i < count; ++i) {
            let card = document.createElement('div');
            card.classList.add('card');

            if (+count === 4) {
                card.classList.add('card-4');
            } else if (+count === 36) {
                card.classList.add('card-36');
            } else if (+count === 64) {
                card.classList.add('card-64');
            } else if (+count === 100) {
                card.classList.add('card-100');
            };

            card.textContent = numbers[i];
            cardsBlock.append(card);
        };

        console.log('First time:'); // решение
        console.log(numbers[0], numbers[1], numbers[2], numbers[3]); // решение
        console.log(numbers[4], numbers[5], numbers[6], numbers[7]); // решение
        console.log(numbers[8], numbers[9], numbers[10], numbers[11]); // решение
        console.log(numbers[12], numbers[13], numbers[14], numbers[15]); // решение
    }

    function rotateCards() {
        let cards = document.querySelectorAll('.card');
        let count = generateNumbers().count;
        let openCards = null;
        window.countOpenCards = 0;
        let firstCard = '';
        let secondCard = '';
        let timerInitialValue = document.querySelector('.settings__timer_input').value;
        let bestTime = timerInitialValue;
        
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                if ((countOpenCards === 0) && (firstCard.textContent !== secondCard.textContent)) {
                    firstCard.classList.remove('card-open');
                    secondCard.classList.remove('card-open');
                };

                card.classList.toggle('card-open');
                ++countOpenCards;
                if (countOpenCards === 1) {
                    firstCard = card;
                } else {
                    secondCard = card;
                    countOpenCards = 0;
                };

                openCards = document.querySelectorAll('.card-open');
                if (openCards.length === count) {
                    let elapsedTime = timerInitialValue - timerValue;
                    clearInterval(timerInterval);

                    let resultBlock = document.createElement('div');
                    let resultTitle = document.createElement('h2');
                    let resultList = document.createElement('ul');
                    let resultItemTime = document.createElement('li');
                    let resultTimeLabel = document.createElement('span');
                    let resultItemBestTime = document.createElement('li');
                    let resultBestTimeLabel = document.createElement('span');
                    let resultBtnPlayAgain = document.createElement('button');
                    let resultClearBtn = document.createElement('button');

                    resultBlock.classList.add('result', 'animate__animated', 'animate__bounceIn');
                    resultTitle.classList.add('result__title');
                    resultList.classList.add('result__list');
                    resultItemTime.classList.add('result__item');
                    resultTimeLabel.classList.add('result__time_label');
                    resultItemBestTime.classList.add('result__item');
                    resultBestTimeLabel.classList.add('result__best-time_label');
                    resultBtnPlayAgain.classList.add('result__btn');
                    resultClearBtn.classList.add('result__clear-btn');

                    resultTitle.textContent = 'RESULT';
                    resultTimeLabel.textContent = `your time: ${elapsedTime} sec`;

                    bestTime = localStorage.getItem('bestTimeValue') || timerInitialValue;
                    if (elapsedTime < bestTime) {
                        localStorage.setItem('bestTimeValue', elapsedTime);
                        bestTime = elapsedTime;
                    }

                    resultBestTimeLabel.textContent = `your best time: ${bestTime} sec`;
                    resultClearBtn.textContent = 'clear best result';
                    resultBtnPlayAgain.textContent = 'play again >';

                    resultItemTime.append(resultTimeLabel);
                    resultItemBestTime.append(resultBestTimeLabel);
                    resultList.append(
                        resultItemTime,
                        resultItemBestTime,
                    );
                    resultBlock.append(
                        resultTitle,
                        resultList,
                        resultClearBtn,
                        resultBtnPlayAgain,
                    );
                    document.body.append(resultBlock);

                    resultClearBtn.addEventListener('click', () => {
                        localStorage.removeItem('bestTimeValue');
                        bestTime = elapsedTime;
                        resultBestTimeLabel.textContent = `your best time: ${bestTime} sec`;
                    });

                    resultBtnPlayAgain.addEventListener('click', () => {
                        resultBlock.classList.add('animate__animated', 'animate__bounceOut');
                        setTimeout(() => {
                            resultBlock.classList.add('display-none');
                            let numbers = generateNumbers().numbers;
                            for (let i = 0; i < count; ++i) {
                                cards[i].classList.remove('card-open');
                                cards[i].textContent = numbers[i];
                            }
                            timerRun();
                            console.log('Next time:'); // решение
                            console.log(numbers[0], numbers[1], numbers[2], numbers[3]); // решение
                            console.log(numbers[4], numbers[5], numbers[6], numbers[7]); // решение
                            console.log(numbers[8], numbers[9], numbers[10], numbers[11]); // решение
                            console.log(numbers[12], numbers[13], numbers[14], numbers[15]); // решение
                        }, 250);
                    })
                };
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('body-colored');

        let logo = document.createElement('h1');
        let startDescr = document.createElement('p');
        let startBtn = document.createElement('button');
        
        logo.classList.add('start-block__logo');
        setTimeout(() => {
           logo.classList.add('visible', 'typewriter-logo');
        }, 500);
        startDescr.classList.add('start-block__descr');
        setTimeout(() => {
            logo.classList.add('border-none');
            startDescr.classList.add('visible', 'typewriter-start-descr');
        }, 2800);
        startBtn.classList.add('start-block__btn');
        setTimeout(() => {
            startBtn.classList.add('visible', 'animate__animated', 'animate__bounceIn');
        }, 6100);
        logo.textContent = 'pair game';
        startDescr.textContent = 'new interesting game from the past';
        startBtn.textContent = 'start game';

        document.body.append(logo);
        document.body.append(startDescr);
        document.body.append(startBtn);

        let settingsBlock = document.createElement('div');
        let settingsTitle = document.createElement('h2');
        let settingsList = document.createElement('ul');
        let settingsItemField = document.createElement('li');
        let settingsFieldLabel = document.createElement('span');
        let settingsFieldInput = document.createElement('input');
        let settingsFieldText = document.createElement('span');
        let settingsItemTimer = document.createElement('li');
        let settingsTimerLabel = document.createElement('span');
        let settingsTimerInput = document.createElement('input');
        let settingsTimerText = document.createElement('span');
        let settingsBtn = document.createElement('button');

        settingsBlock.classList.add('settings', 'display-none');
        settingsTitle.classList.add('settings__title');
        settingsList.classList.add('settings__list');
        settingsFieldInput.classList.add('settings__input', 'settings__field_input');
        settingsTimerInput.classList.add('settings__input', 'settings__timer_input');
        settingsBtn.classList.add('settings__btn');

        settingsTitle.textContent = 'SETTING';
        settingsFieldLabel.textContent = 'field size (2/4/6/8/10): ';
        settingsFieldInput.type = 'number';
        settingsFieldInput.step = 2;
        settingsFieldInput.min = 2;
        settingsFieldInput.max = 10;
        settingsFieldInput.value = 4;
        settingsFieldText.textContent = ` x ${settingsFieldInput.value}`;
        settingsFieldInput.addEventListener('input', () => {
            if ((settingsFieldInput.value % 2) !== 0) {
                settingsFieldInput.value = 4;
            };
            if (settingsFieldInput.value > 10) {
                settingsFieldInput.value = 4;
            };
            if (settingsFieldInput.value < 2) {
                settingsFieldInput.value = 4;
            };
            settingsFieldText.textContent = ` x ${settingsFieldInput.value}`;
        });
        settingsTimerLabel.innerHTML = 'timer value: ';
        settingsTimerInput.value = 60;
        settingsTimerText.textContent = ' sec';
        settingsBtn.textContent = 'start >';

        settingsItemField.append(
            settingsFieldLabel,
            settingsFieldInput,
            settingsFieldText,
        );
        settingsItemTimer.append(
            settingsTimerLabel,
            settingsTimerInput,
            settingsTimerText,
        )
        settingsList.append(
            settingsItemField,
            settingsItemTimer,
        );
        settingsBlock.append(
            settingsTitle,
            settingsList,
            settingsBtn,
        );
        document.body.append(settingsBlock);

        startBtn.addEventListener('click', () => {
            logo.classList.remove('typewriter-logo');
            logo.classList.add('animate__animated', 'animate__bounceOut');
            startDescr.classList.remove('typewriter-start-descr');
            startDescr.classList.add('border-none', 'animate__animated', 'animate__bounceOut');
            startBtn.classList.add('animate__bounceOut');
            setTimeout(() => {
                logo.classList.add('display-none');
                startDescr.classList.add('display-none');
                startBtn.classList.add('display-none');
                settingsBlock.classList.remove('display-none');
            }, 500);
            settingsBlock.classList.add('animate__animated', 'animate__backInUp');
        });

        let cardsBlock = document.createElement('div');
        let timerBlock = document.createElement('div');
        let timer = document.createElement('span');
        

        cardsBlock.classList.add('cards', 'display-none');
        timerBlock.classList.add('timer', 'display-none');
        timer.classList.add('timer__span');

        timer.textContent = `${settingsTimerInput.value} sec`;

        timerBlock.append(timer);
        document.body.append(timerBlock);
        document.body.append(cardsBlock);

        settingsBtn.addEventListener('click', () => {
            settingsBlock.classList.add('animate__animated', 'animate__backOutDown');
            setTimeout(() => {
                settingsBlock.classList.add('display-none');
                timerBlock.classList.remove('display-none');
                cardsBlock.classList.remove('display-none');
                document.body.classList.add('body-white');
                setTimeout(() => {
                    timerBlock.classList.add('visible');
                }, 400);
            }, 500);
            cardsBlock.classList.add('animate__animated', 'animate__backInUp');
            
            timerRun();
            createCards();
            rotateCards();
        });
    });
})();