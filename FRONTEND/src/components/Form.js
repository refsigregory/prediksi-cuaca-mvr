import React from 'react';
import '../style.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {kelembapan: 0, udara_rata2: 0, tekanan: 0, kecepatan: 0, arahangin: 0};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
    <div className="container">
        <div className="col-md-12">
            <h2 className="section-title">Prediksi Cuaca</h2>
            <form className="contact-form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-12"><input type="text" placeholder="Kelembapan" value={this.state.kelembapan} onChange={(event) => this.setState({kelembapan: event.target.value})}  /></div>
                </div>
                <div className="row">
                    <div className="col-md-12"><input type="text" placeholder="Udara Rata-rata" value={this.state.kelembapan} onChange={(event) => this.setState({udara_rata2: event.target.value})}  /></div>
                </div>
                <div className="row">
                    <div className="col-md-12"><input type="text" placeholder="Tekanan" value={this.state.kelembapan} onChange={(event) => this.setState({tekanan: event.target.value})}  /></div>
                </div>
                <div className="row">
                    <div className="col-md-12"><input type="text" placeholder="Kecepatan" value={this.state.kelembapan} onChange={(event) => this.setState({kecepatan: event.target.value})}  /></div>
                </div>
                <div className="row">
                    <div className="col-md-12"><input type="text" placeholder="Arah Angin" value={this.state.kelembapan} onChange={(event) => this.setState({arahangin: event.target.value})}  /></div>
                </div>

                <div className="text-right">
                    <button className="btn btn-primary btn-block">Submit</button>
                </div>
            </form>
         </div>
     </div>
    );
  }
}

export default Form;