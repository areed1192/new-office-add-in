import * as React from "react";
import { Button, ButtonType } from "office-ui-fabric-react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import Progress from "./Progress";

import http = require('http');
// import request = require('request');

/* global Button, console, Excel, Header, HeroList, HeroListItem, Progress */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: HeroListItem[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: []
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: "Ribbon",
          primaryText: "Achieve more with Office integration"
        },
        {
          icon: "Unlock",
          primaryText: "Unlock features and functionality"
        },
        {
          icon: "Design",
          primaryText: "Create and visualize like a pro"
        }
      ]
    });
  }

  callApi = async () => {
    fetch('http://localhost:5000/api/ciks', {
      mode: 'cors',
      credentials: 'same-origin',
      method: 'GET'
    }
    ).then(response => response.json()
    ).then(data => console.log(data))

  };


  // I assign this function on line 115.
  fetchCikNumbers = async () => {

    const hostname = '127.0.0.1';
    const port = 4000;

    const server = http.createServer((_req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World');

      // Make a new HTTP Request.
      var xhr = new XMLHttpRequest();

      // Define the Method and URL.
      xhr.open('GET', "https://www.sec.gov/files/company_tickers.json");

      // Maybe set the "Access-Control" header?
      // xhr.setRequestHeader('Access-Control-Allow-Origin','*');

      // Print the Text to the Console.
      xhr.onload = function (e) {
        console.log(this.responseText);
        console.log(e);
      }

      // Send the Request.
      xhr.send();

      // request.get('https://www.sec.gov/files/company_tickers.json', (_error, _response, body) => {
      //     let json = JSON.parse(body);
      //     console.log(json);
      // });

      // request.get(`https://www.usa.gov/rss/updates.xml`, {
      //     headers: {
      //         'Access-Control-Allow-Origin': '*'
      //     },
      //     method: "GET",
      //     mode: "cors",
      //     referrer: "origin"
      // })
      // ).then(response => response.text).then(data => {
      //     console.log(data)
      // }).catch(err => console.log(err))
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });

    // try {

    //   // Make a new HTTP Request.
    //   var xhr = new XMLHttpRequest();

    //   // Define the Method and URL.
    //   xhr.open('GET', `https://www.sec.gov/files/company_tickers.json`);

    //   // Maybe set the "Access-Control" header?
    //   // xhr.setRequestHeader('Access-Control-Allow-Origin','*');

    //   // Print the Text to the Console.
    //   xhr.onload = function (e) {
    //     console.log(this.responseText);
    //     console.log(e);
    //   }

    //   // Send the Request.
    //   xhr.send();

    // } catch (error) {
    //   console.error(error);
    // }

  }

  click = async () => {
    try {
      await Excel.run(async context => {
        /**
         * Insert your Excel code here
         */
        const range = context.workbook.getSelectedRange();

        // Read the range address
        range.load("address");

        // Update the fill color
        range.format.fill.color = "yellow";

        await context.sync();
        console.log(`The range address was ${range.address}.`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    return (
      <div className="ms-welcome">
        <Header logo="assets/logo-filled.png" title={this.props.title} message="Welcome" />
        <HeroList message="Discover what Office Add-ins can do for you today!" items={this.state.listItems}>
          <p className="ms-font-l">
            Modify the source files, then click <b>Run</b>.
          </p>
          <Button
            className="ms-welcome__action"
            buttonType={ButtonType.hero}
            iconProps={{ iconName: "ChevronRight" }}
            onClick={this.callApi}
          >
            Run
          </Button>
        </HeroList>
      </div>
    );
  }
}
