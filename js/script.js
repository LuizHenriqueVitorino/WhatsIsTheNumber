const getNumber = async () => {
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
        console.error("Erro ao buscar número:", error);
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
        console.error("Erro ao tentar número:", error);
        return null;
    }
}

function getUserNumber(){
    const userNumber = document.getElementById('attempt-input').value;
    return Number(userNumber)
}

document.getElementById('submit').addEventListener('click', () => {
    const number = getUserNumber()

    const data = attemptNumber(number);
    if (data) {
        let list = document.getElementById('attempts-list');
        let elementList = document.createElement('li')
        elementList.textContent = data
        list.insertBefore(elementList, list.firstChild)
    } else {
        document.getElementById('attempts-number').innerText = 'NN';
    }
});