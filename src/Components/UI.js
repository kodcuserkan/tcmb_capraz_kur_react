import React, { Component } from 'react'
import "./style.css"
class UI extends Component {
    
    render() {
        return (
            <div >
                <form  className = "main" onSubmit={this.props.onSbmt}>
                    <div className="form-group1">
                        <label htmlFor="curr1">Lütfen 1. Kuru seçin &nbsp;</label>
                        <select className="form-control1" id="kur1slct">
                            <option>Amerikan Doları</option>
                            <option>Türk Lirası</option>
                            <option>Euro</option>
                            <option>Pound</option>
                            <option>Japon Yeni</option>
                        </select>  &nbsp;
                        <input type="number" className="form-control2" id="kur1entered" placeholder="0" />
                    </div>
                    <div className="form-group2">
                        <label htmlFor="curr2">Lütfen 2. Kuru seçin  &nbsp;</label>
                        <select className="form-control3" id="kur2slct">
                            <option>Türk Lirası</option>
                            <option>Amerikan Doları</option>
                            <option>Euro</option>
                            <option>Pound</option>
                            <option>Japon Yeni</option>
                        </select>  &nbsp;
                        {this.props.result === 0 || this.props.result === Infinity?<div className="falseResult"><label htmlFor="" >"Hatalı girdi ya da sisteme erişilemedi..."</label></div>:null}
                        {this.props.result?<div className="result"><label htmlFor="" >{this.props.result}</label></div>:null}

                    </div >
                    <div className="form-group3">
                    <button type="submit" className="btn btn-primary" id="btnGtr">Getir</button>  &nbsp;
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default UI;