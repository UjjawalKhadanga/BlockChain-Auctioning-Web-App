import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Transfer from '../abis/Transfer.json';
import ItemData from '../abis/ItemData.json'
import ItemList from './ItemList';

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchain();
  }

  async loadBlockchain(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    const currBalance = await web3.eth.getBalance(accounts[0]);
    this.setState({balance: currBalance});
    
    const itemdata = new web3.eth.Contract(ItemData.abi, ItemData.networks['5777'].address);
    for(var i=0; i<4; i++){
      const item_name = await itemdata.methods.getItemName(i).call();
      const item_desc = await itemdata.methods.getItemDesc(i).call();
      const item_price = await itemdata.methods.getItemPrice(i).call();
      const item_increment = await itemdata.methods.getItemIncrement(i).call();
      this.state.itemList.push(
        {
          item_name: item_name, 
          item_desc: item_desc, 
          item_price: item_price, 
          item_increment: item_increment
        }
      );
    }
    
    console.log(this.state.itemList);
  }

  async loadWeb3(){
    if(window.etherium){
      window.web3 = new Web3(window.etherium);
      await window.etherium.enable();
    }else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    }else{
      window.alert("Etherium browser not deteted");
    }
  }

  constructor(props){
    super(props);
    this.state = {
      account: "",
      balance: 0,
      itemList: [],
      item_count: ""
    }
  }

  

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Home
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                
                <h1>{this.state.account}</h1>

                
               
              </div>
              
            </main>
            <div>
              <ItemList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
