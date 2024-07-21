const getNumber = async () => {
    try{
        const response = await
        fetch(
            'http://192.168.0.100:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('HTTP error! status: ${response.status}')
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
        const response = await fetch('http://192.168.0.100:5000/check', {
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
    let userNumber = document.getElementById('attempt-input').value;
    return userNumber
}

document.getElementById('submit').addEventListener('click', async () => {
    const numberStr = await getUserNumber();
    const number = parseInt(numberStr, 10)

    const data = attemptNumber(number);
    console.log(number)
    console.log(data.resolve(value))
    if (data) {
        let list = document.getElementById('attempts-list');
        let elementList = document.createElement('li')
        elementList.textContent = data
        list.insertBefore(elementList, list.firstChild)
    } else {
        document.getElementById('attempts-number').innerText = 'NN';
    }
});