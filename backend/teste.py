
def teste(number):
    if not isinstance(number, int):
        return 'Precisa ser um número inteiro.'
    
    return number

print(teste(10))