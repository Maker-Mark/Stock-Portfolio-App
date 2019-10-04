import FilterResults from "react-filter-search";
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Col from "react-bootstrap/Col";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: ""
    };
  }

  componentWillMount() {
    let keyArr = [
      "0EX3ARX88UZQUM6S",
      "AROSSVE5EUMIFC2R",
      "6H07TY259E6KEHOB",
      "C2WWKDFUHBF8U3Y5",
      "L6ANE8LWW6JC86IS",
      "H9T98BB8N5I98JP3",
      "VWV1SPC91RD4DF6N",
      "P6M5XDBD1ZABM0R3",
      "0EX3ARX88UZQUM6S",
      "AROSSVE5EUMIFC2R",
      "6H07TY259E6KEHOB",
      "C2WWKDFUHBF8U3Y5",
      "L6ANE8LWW6JC86IS",
      "H9T98BB8N5I98JP3",
      "VWV1SPC91RD4DF6N",
      "P6M5XDBD1ZABM0R3",
      "FSRE5MEMUBOYXNHN"
    ];
    axios
      .get(
        "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo"
      )
      .then(response => {
        console.log(response.data["bestMatches"]);
        this.setState({ data: response.data["bestMatches"] });
      });
  }
  handleChange = event => {
    let keyArr = [
      "0EX3ARX88UZQUM6S",
      "AROSSVE5EUMIFC2R",
      "6H07TY259E6KEHOB",
      "C2WWKDFUHBF8U3Y5",
      "L6ANE8LWW6JC86IS",
      "H9T98BB8N5I98JP3",
      "VWV1SPC91RD4DF6N",
      "P6M5XDBD1ZABM0R3",
      "0EX3ARX88UZQUM6S",
      "AROSSVE5EUMIFC2R",
      "6H07TY259E6KEHOB",
      "C2WWKDFUHBF8U3Y5",
      "L6ANE8LWW6JC86IS",
      "H9T98BB8N5I98JP3",
      "VWV1SPC91RD4DF6N",
      "P6M5XDBD1ZABM0R3",
      "FSRE5MEMUBOYXNHN"
    ];
    const { value } = event.target;
    // this.setState({ value });

    axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${
          keyArr[parseInt(Math.random() * 8)]
        }`
      )
      .then(response => {
        console.log(response.data["bestMatches"]);
        this.setState({ data: response.data["bestMatches"], value });
      });
  };
  render() {
    const { data, value } = this.state;

    if (this.state.data) {
      return (
        <div>
          <Form className="m-5">
            <h2> Ticker Symbol Search</h2>
            <hr />
            <h3> Results</h3>

            <input type="text" onChange={this.handleChange} />
            <FilterResults
              value={value}
              data={data}
              renderResults={results => (
                <div>
                  {results.map(el => (
                    <div>
                      <span>{el["1. symbol"]}</span>
                      <span>{el["marketOpen"]}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </Form>
        </div>
      );
    } else {
      return (
        <div>
          <Form className="m-5">
            <h2> Ticker Symbol Search </h2>
            <hr />
            <h3>Enter a Symbol</h3>
            <input type="text" value={value} onChange={this.handleChange} />
          </Form>
        </div>
      );
    }
  }
}

export default Search;
