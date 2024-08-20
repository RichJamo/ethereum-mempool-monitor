document.addEventListener('DOMContentLoaded', async () => {
  // Replace YOUR_INFURA_ENDPOINT with the actual Infura endpoint
  const infuraEndpoint = 'https://mainnet.infura.io/v3/<INSERT API KEY HERE>';

  try {
      // Connect to the Ethereum node using Infura
      const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));

      // Function to fetch and display transaction details
      const updateTransactionDetails = async () => {
          try {
              // Fetch pending transactions from the mempool
              const latestBlock = await web3.eth.getBlock("pending", true);
              const pendingTransactions = latestBlock.transactions || [];

              // Display transaction details on the web page
              const transactionDetailsContainer = document.getElementById('transaction-details');
              transactionDetailsContainer.innerHTML = `
                  <h2>Transaction Details</h2>
                  <ul>
                      ${pendingTransactions.map(transaction => `
                          <li>
                              <strong>From:</strong> ${transaction.from}<br>
                              <strong>To:</strong> ${transaction.to}<br>
                              <strong>Value:</strong> ${web3.utils.fromWei(transaction.value, 'ether')} ETH<br>
                              <strong>Transaction Index:</strong> ${transaction.transactionIndex}<br>
                              <strong>Type:</strong> ${transaction.type}
                          </li>
                      `).join('')}
                  </ul>
              `;
          } catch (error) {
              console.error('Error fetching transaction details:', error);
          }
      };

      // Fetch and display transaction details on page load
      updateTransactionDetails();

      // Set up periodic updates (every 30 seconds, for example)
      setInterval(updateTransactionDetails, 30000);
  } catch (error) {
      console.error('Error connecting to Infura:', error);
  }
});
