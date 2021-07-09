import React from 'react';
import '../style.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {kelembapan: '', udara_rata2: '', tekanan: '', kecepatan: '', arahangin: '', result: []};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    let url = `http://localhost:5000/getdata?kelembapan=${this.state.kelembapan}&udara_rata2=${this.state.udara_rata2}&tekanan=${this.state.tekanan}&kecepatan=${this.state.kecepatan}&arahangin=${this.state.arahangin}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({ result: data });
            console.log(this.state.result);
        } );
  }

  render() {
    return (
    <div className="container">
        <div className="col-md-12">
            <h2 className="section-title">Prediksi Cuaca</h2>
            {
                this.state.result == '' ?
            <form className="contact-form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-12"><input type="text" placeholder="Kelembapan" value={this.state.kelembapan} onChange={(event) => this.setState({kelembapan: event.target.value})}  /></div>
                </div>
                <div className="row">
                    <div className="col-md-12"><input type="text" placeholder="Udara Rata-rata" value={this.state.udara_rata2} onChange={(event) => this.setState({udara_rata2: event.target.value})}  /></div>
                </div>
                <div className="row">
                    <div className="col-md-12"><input type="text" placeholder="Tekanan" value={this.state.tekanan} onChange={(event) => this.setState({tekanan: event.target.value})}  /></div>
                </div>
                <div className="row">
                    <div className="col-md-12"><input type="text" placeholder="Kecepatan" value={this.state.kecepatan} onChange={(event) => this.setState({kecepatan: event.target.value})}  /></div>
                </div>
                <div className="row">
                    <div className="col-md-12"><input type="text" placeholder="Arah Angin" value={this.state.arahangin} onChange={(event) => this.setState({arahangin: event.target.value})}  /></div>
                </div>

                <div className="text-right">
                    <button className="btn btn-primary btn-block">Submit</button>
                </div>
            </form>

            :

            <div>

            <h2>Result:</h2>

            <p>Tidak Hujan: {this.state.result[0][0]}</p>
            <p>Hujan: {this.state.result[0][1]}</p>
            <p><button class="btn btn-small btn-warning" onClick={()=>this.setState({result: []})}>Reset</button></p>
            </div>

            }
         </div>
     </div>
    );
  }
}

export default Form;