import React, { Component } from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import UI from "./Components/UI"

// const keyimiz = "CefAJj0tfSc"; eski apikey as65

const keyimiz = "6JvNroWJYS7"; // yeni api avan


class App extends Component {

  state = {
    rate: undefined,
    usd1: undefined,
    eur1: undefined,
    gbp1: undefined,
    jpy1: undefined,
    tatil: undefined
  }
  // https://evds2.tcmb.gov.tr/service/evds/series=TP.DK.USD.A&startDate=13-11-2019&endDate=15-11-2019&type=json&key=${API_KEY}

  getCurrencies = async () => {
    const api_call = await fetch(`https://evds2.tcmb.gov.tr/service/evds/series=TP.DK.USD.A-TP.DK.JPY.A-TP.DK.EUR.A-TP.DK.GBP.A-TP.DK.JPY.A&startDate=${this.get2DaysAgo()}&endDate=${this.getToday()}&type=json&key=${keyimiz}`);

    const response = await api_call.json(); 


    // const response = {
    //   items : 
    //     [{
    //       TP_DK_USD_A: 5,
    //       TP_DK_EUR_A: null,
    //       TP_DK_JPY_A: null,
    //       TP_DK_GBP_A: null
    //     },
    //     {
    //       TP_DK_USD_A: 10,
    //       TP_DK_EUR_A: 10,
    //       TP_DK_JPY_A: null,
    //       TP_DK_GBP_A: null
    //     },
    //     {
    //       TP_DK_USD_A: 15,
    //       TP_DK_EUR_A: 15,
    //       TP_DK_JPY_A: 15,
    //       TP_DK_GBP_A: null
    //     }
    //   ]
      
    // }
    console.log(response);

    let usd;
    if (response.items[0].TP_DK_USD_A !== null) {
      usd = response.items[0].TP_DK_USD_A;
    } else if (response.items[1].TP_DK_USD_A !== null) {
      usd = response.items[1].TP_DK_USD_A;
    } else {
      usd = response.items[2].TP_DK_USD_A;
    }

    let eur;
    if (response.items[0].TP_DK_EUR_A !== null) {
      eur = response.items[0].TP_DK_EUR_A;
    } else if (response.items[1].TP_DK_EUR_A !== null) {
      eur = response.items[1].TP_DK_EUR_A;
    } else {
      eur = response.items[2].TP_DK_EUR_A;
    }

    let gbp;
    if (response.items[0].TP_DK_GBP_A !== null) {
      gbp = response.items[0].TP_DK_GBP_A;
    } else if (response.items[1].TP_DK_GBP_A !== null) {
      gbp = response.items[1].TP_DK_GBP_A;
    } else {
      gbp = response.items[2].TP_DK_GBP_A;
    }

    let jpy;
    if (response.items[0].TP_DK_JPY_A !== null) {
      jpy = response.items[0].TP_DK_JPY_A;
    } else if (response.items[1].TP_DK_JPY_A !== null) {
      jpy = response.items[1].TP_DK_JPY_A;
    } else {
      jpy = response.items[2].TP_DK_JPY_A;
    }

    console.log(usd,eur,gbp,jpy);
    

    return (
      this.setState({
        usd1: usd,
        eur1: eur,
        gbp1: gbp,
        jpy1: jpy,
        tl: 1
      })
    )
  }

  get2DaysAgo = () => {
    let today = new Date();
    let dd = String(today.getDate() - 2).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today;
  }

  getToday = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today;
  }

  calculate = async (e) => {
    e.preventDefault();
    // let startDate_ = document.getElementById("kur1slct");
    // let endDate_ = document.getElementById("kur1slct");
    // let rate_ = document.getElementById("kur1slct");

    let r = document.getElementById("kur1slct");
    let firstCurr_ = r.options[r.selectedIndex].value;
    let kur1entered_ = Number(document.getElementById("kur1entered").value);
    let s = document.getElementById("kur2slct");
    let secondCurr_ = s.options[s.selectedIndex].value;
    // console.log(firstCurr_,kur1entered_,secondCurr_);
    await this.getCurrencies();
    console.log(this.state);

    let sonuc;

    switch (firstCurr_) {
      case "Türk Lirası":
        switch (secondCurr_) {
          case "Türk Lirası":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 1 * kur1entered_
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Amerikan Doları":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 1 / Number(this.state.usd1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Euro":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 1 / Number(this.state.eur1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Pound":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 1 / Number(this.state.gbp1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Japon Yeni":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 100 * 1 / Number(this.state.jpy1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }

          default:
            break;
        }
        break;
      case "Amerikan Doları":
        switch (secondCurr_) {
          case "Amerikan Doları":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 1 * kur1entered_
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Türk Lirası":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.usd1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Euro":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.usd1) / Number(this.state.eur1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Pound":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.usd1) / Number(this.state.gbp1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Japon Yeni":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 100 * Number(this.state.usd1) / Number(this.state.jpy1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }

          default:
            break;
        }
        break;
      case "Pound":
        switch (secondCurr_) {
          case "Pound":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 1 * kur1entered_
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Türk Lirası":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.gbp1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Euro":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.gbp1) / Number(this.state.eur1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Amerikan Doları":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.gbp1) / Number(this.state.usd1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Japon Yeni":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 100 * Number(this.state.gbp1) / Number(this.state.jpy1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }

          default:
            break;
        }

        break;
      case "Euro":
        switch (secondCurr_) {
          case "Euro":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 1 * kur1entered_
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Türk Lirası":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.eur1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Pound":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.eur1) / Number(this.state.gbp1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Amerikan Doları":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.eur1) / Number(this.state.usd1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Japon Yeni":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 100 * Number(this.state.eur1) / Number(this.state.jpy1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }

          default:
            break;
        }

        break;
      case "Japon Yeni":
        switch (secondCurr_) {
          case "Japon Yeni":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = 1 * kur1entered_
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Türk Lirası":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.jpy1) / 100 * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Euro":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.jpy1) / 100 / Number(this.state.eur1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Amerikan Doları":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.jpy1) / 100 / Number(this.state.usd1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }
          case "Pound":
            if (secondCurr_ !== null && firstCurr_ !== null) {
              sonuc = Number(this.state.jpy1) / 100 / Number(this.state.gbp1) * kur1entered_;
              break;
            } else {
              this.setState({ tatil: true })
              break;
            }

          default:
            break;
        }

        break;

      default:
        break;
    }

    this.setState({
      rate: sonuc
    })

    console.log(this.state);
  }

  render() {

    // console.log(this.getToday());

    // this.getCurrencies();
    return (
      <div>
        <h1 id="baslik">GÜNCEL DÖVİZ KURLARI</h1>
        <hr /><br />
        <div>
          <UI onSbmt={this.calculate} result={this.state.rate} />
        </div>

      </div>
    )
  }
}
export default App;