document.addEventListener('DOMContentLoaded', async () => {
  // Replace YOUR_INFURA_ENDPOINT with the actual Infura endpoint
  const infuraEndpoint = 'https://mainnet.infura.io/v3/1a34a37dbf4e44409187911e6573a844';

  // Connect to the Ethereum node using Infura
  const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));

  // Function to fetch and display mempool information
  const updateMempool = async () => {
      try {
          // Fetch pending transactions from the mempool
          const pendingTransactions = await web3.eth.pendingTransactions();

          // Display mempool information on the web page
          const mempoolContainer = document.getElementById('mempool-container');
          mempoolContainer.innerHTML = `
              <h2>Mempool Information</h2>
              <p>Pending Transactions: ${pendingTransactions.length}</p>
              <pre>${JSON.stringify(pendingTransactions, null, 2)}</pre>
          `;
      } catch (error) {
          console.error('Error fetching mempool information:', error);
      }
  };

  // Fetch and display mempool information on page load
  updateMempool();

  // Set up periodic updates (every 30 seconds, for example)
  setInterval(updateMempool, 30000);
});
