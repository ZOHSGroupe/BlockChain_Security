// Import the smart contract artifacts
const AssuranceContract = artifacts.require('AssuranceContract');

contract('AssuranceContract', (accounts) => {
  let assuranceInstance;

  before(async () => {
    // Deploy the AssuranceContract before running the tests
    assuranceInstance = await AssuranceContract.new();
  });

  it('should set and get assurance details', async () => {
    // Test input values
    const dateDebut = 1634056800; // Replace with the desired timestamp
    const dateFin = 1665592800;   // Replace with the desired timestamp
    const zipFile = 'https://example.com/contracts/administratif.zip';
    const assuranceType = 'TypeA';
    const name = 'John Doe';
    const cin = '123456789';
    const marque = 'BrandX';
    const model = 'ModelY';

    // Set assurance details
    await assuranceInstance.setAssurance(dateDebut, dateFin, zipFile, assuranceType, name, cin, marque, model);

    // Get assurance details
    const result = await assuranceInstance.getAssurance();

    // Check if the returned values match the input values
    assert.strictEqual(result[1].toNumber(), dateDebut, 'Incorrect dateDebut');
    assert.strictEqual(result[2].toNumber(), dateFin, 'Incorrect dateFin');
    assert.strictEqual(result[3], zipFile, 'Incorrect zipFile');
    assert.strictEqual(result[4], assuranceType, 'Incorrect assuranceType');
    assert.strictEqual(result[5], name, 'Incorrect name');
    assert.strictEqual(result[6], cin, 'Incorrect cin');
    assert.strictEqual(result[7], marque, 'Incorrect marque');
    assert.strictEqual(result[8], model, 'Incorrect model');
  });
});
