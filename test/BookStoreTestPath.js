const BookStore=artifacts.require("./BookStore.sol")

contract('BookStore',function(accounts){
    var bookStoreInstance;
    var account1=web3.eth.getAccounts().then(
        function(params){
            account1=params[0];
        }
    ); 
    var fullname="Ziad Ben Saada";
    var description="Just for testing!";
    var price='0';
    it("empty values",function(){
        return BookStore.deployed().then(
            function(instance){
                return instance.getBook();
            }
        ).then(function(params){
            assert.equal(params[0],0x0,"empty sender");
            assert.equal(params[1],"","empty full name");
            assert.equal(params[2],"","empty description");
            assert.equal(params[3].toNumber(),"","empty price");
        })
    });
    it("sell book on store",function(){
        return BookStore.deployed().then(
            function(instance){
                bookStoreInstance=instance;
                return bookStoreInstance.sellBook(fullname,description,web3.utils.toWei(price,"ether"),{from:account1});
            }
        ).then(function(){
            return bookStoreInstance.getBook();
        }).then(function(params){
            assert.equal(params[0],account1,"sender "+account1);
            assert.equal(params[1],fullname,"full name "+fullname);
            assert.equal(params[2],description,"description "+description);
            assert.equal(params[3],web3.utils.toWei(price,"ether"),"price"+web3.utils.toWei(price,"ether"));
        })
    });
})