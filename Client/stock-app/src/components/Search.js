import FilterResults from "react-filter-search";
import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: ""
    };
  }

  handleChange = event => {
    //Array of API keys, to minimize api limit (you can make as many as you'd like)
    //All other API's, including Alpha Advantage cost money for more than 5 calls/API key/ Min
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
    //Destructure the data and value
    const { data, value } = this.state;
    if (this.state.data) {
      return (
        <div>
          <Form className="m-5">
            <h3> Ticker Symbol Search</h3>
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
                      Ticker Symbol:{" "}
                      <strong>
                        <span>{el["1. symbol"]}: </span>
                      </strong>{" "}
                      Name: <span>{el["2. name"]}</span>
                    </div>
                  ))}
                </div>
              )}
            />
            <Form.Text className="text-muted" style={{ fontSize: "14px" }}>
              No results? Try again in 60 seconds (API limit reached).
            </Form.Text>
          </Form>
        </div>
      );
    } else {
      return (
        <div>
          <Form className="m-5">
            <h3> Ticker Symbol Search </h3>
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
