import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchain();
  }

  async loadBlockchain(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
  }

  async loadWeb3(){
    if(window.etherium){
      window.web3 = new Web3(window.etherium);
      await window.etherium.enable();
      console.log('aaaa');
    }else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
      console.log('bbbb');
    }else{
      window.alert("Etherium browser not deteted");
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
                
                <h1>Dapp University</h1>
               
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
