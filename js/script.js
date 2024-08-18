getNumber()

async function getNumber() {
    try{
        const response = await
        fetch(
            'http://localhost:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(await response.json());
        return null;
    };
}

async function attemptNumber(number) {
    try {
        const response = await fetch('http://localhost:5000/check', {
            method: 'POST',
            body: JSON.stringify({ "number": number }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error(await response.json())
        return null;
    }
}

function getUserNumber(){
    const userNumber = document.getElementById('attempt-input').value;
    return Number(userNumber)
}

document.getElementById('submit').addEventListener('click', async () => {
    const number = getUserNumber()

    const data = await attemptNumber(number);
    if (data) {
        const list = document.getElementById('attempts-list');
        const elementList = document.createElement('li')
        elementList.textContent = data
        list.insertBefore(elementList, list.firstChild)
    } else {
        document.getElementById('attempts-number').innerText = 'NN';
    }
});