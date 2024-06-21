import Transaction from './Transaction.entity'
import Wallet from './Wallet.entity'
let mockedTransactionOne: Transaction, mockedTransactionTwo: Transaction
beforeEach(() => {
  mockedTransactionOne = new Transaction(
    '1',
    'test',
    'test',
    100,
    '',
    new Date(),
    new Date(),
  )
  mockedTransactionTwo = new Transaction(
    '2',
    'test',
    'test2',
    -60,
    '',
    new Date(),
    new Date(),
  )
})
test('Should create entity correclty', () => {
  expect(mockedTransactionOne).toBeTruthy()
})

test('Should create entity correclty', () => {
  expect(mockedTransactionOne).toHaveProperty('name')
  expect(mockedTransactionOne).toHaveProperty('price', 100)
})

test('Should create wallet and append transaction', () => {
  const wallet = new Wallet(
    'test',
    'test',
    'test',
    [mockedTransactionOne, mockedTransactionTwo],
    new Date(),
    new Date(),
  )

  expect(wallet.balance).toBe(40)
})
