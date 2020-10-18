/**
 * Task 1
 */
function averageAmountSpentPerShop(shops) {
  /*
    Loop through the shops' list, and map the array to get
    each shop name and an average of all transactions.
    See:
    - .map: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map
    - .reduce: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce
  */
  return shops.map(s => ({
    shop: s.name,
    amount: parseFloat(s.transactions.reduce((acc, cur) => {
      return acc + cur.amount
    }, 0) / s.transactions.length) 
  }))

  /* Note: This syntax:
    (s => ({
      a: 1,
      b: 2
    }))
    
    allows to return directly a value, here an object.
    
    This is exactly the same as : 
    (s => {
      return {
        a: 1,
        b: 2
      }
    })
  */
}

/**
 * Task 2
 */
function sortShopsByTransactionsSum(shops) {
  /*
    Start the same way as task 1, but return the transactions
    sum instead of average.
    Then, sort the array to match the request using a comparison function.
    See:
    - .sort: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/sort
  */
  return shops.map(s => ({
    shop: s.name,
    amount: parseFloat(s.transactions.reduce((acc, cur) => {
      return acc + cur.amount
    }, 0))
  }))
  .sort((a, b) => (a.amount < b.amount) ? 1 : -1)
}

/**
 * Task 3
 */
function bestBuyingClients(shops, clients) {
  return shops.map((s) => {
    /*
      STEP 1: For every shop, use a reducer to get its highest transaction,
      along with its clientID.
    */
    const highestShopTransaction = s.transactions.reduce((prev, cur) => {
      if(prev === null) return cur // Set the first value of the array as the comparison basis.
      if(prev.amount > cur.amount) return prev
      return cur
    }, null)

    /* 
      STEP 2: Use find on the clients array to find the right client
      using its clientId
      See:
      - .find: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/find
    */
    const highestShopTransactionClient = clients.find(c => c.id === highestShopTransaction.clientId)

    /* 
      STEP 3: Return the shop name and the biggest buyers' first and lastname
    */
    return {
      shop: s.name,
      biggestBuyer: `${highestShopTransactionClient.firstName} ${highestShopTransactionClient.lastName}` 
    }
  })
}

/**
 * Task 4
 */
function overallAmountEarned(shops) {
  /*
    Here, you have to nest 2 reducers.
  */

  // The first one will loop through the shops...
  return shops.reduce((acc, cur) => {
    // The second one will loop through each shop's transactions, like in Task 2
    return acc + cur.transactions.reduce((transAcc, transCur) => {
      return transAcc + transCur.amount
    }, 0)
  }, 0)

  // PROTIP: you can also reduce the output from task 2!
  // return sortShopsByTransactionsSum(shops).reduce((acc, cur) => {
  //   return acc + cur.amount
  // }, 0)
}