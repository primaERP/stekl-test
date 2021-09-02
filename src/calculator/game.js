import React from "react";
//import { SafeAreaView, StyleSheet, TextInput } from "react-native";

//export default UselessTextInput;

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    // definuji promenne ve tride Game
    // history ma v sobe squares
    this.state = {
      dimenze: 20,
      history: [
        {
          squares: Array(20 * 20).fill("."),
        },
      ],
      xIsNext: true,
      h1: "",
      h2: "",
    };
    this.handleH1Change = this.handleH1Change.bind(this);
    this.handleH2Change = this.handleH2Change.bind(this);
  }

  // reakce na klávesu hráče
  handleClick(i) {
    const _history = this.state.history;
    // z historie si vyberu posledni squares
    const _current = _history[_history.length - 1];
    // udelam kopii do promenne _squares
    const _squares = _current.squares.slice();
    if (this.state.h1 === "") {
      alert("Koukej zadat jméno prvního hráče !!!");
      return;
    }
    if (this.state.h2 === "") {
      alert("Koukej zadat jméno druhého hráče !!!");
      return;
    }
    // hledam viteze
    if (calculateWinner(_squares) /*|| _squares[i]*/) {
      return;
    }
    // prepinace mezi X a O
    _squares[i] = this.state.xIsNext ? "X" : "O";
    // zapisu do promennych tridy

    //cocat je pridani pole do pole
    // aktualizuji promenne tridy
    this.setState({
      history: _history.concat([
        {
          squares: _squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
    });
  }
  handleH1Change(e) {
    this.setState({ h1: e.target.value });
    console.log("h1: " + this.state.h1);
  }
  handleH2Change(e) {
    this.setState({ h2: e.target.value });
    console.log("h2: " + this.state.h2);
  }
  render() {
    const _history = this.state.history;
    const _current = _history[_history.length - 1];
    const winner = calculateWinner(_current.squares);

    //generace tlacitek

    const moves = _history.map((_step, _move) => {
      const desc = _move ? (_move > 1 ? _move : _move) : "0";

      if (_move % 10 === 0 && _move > 0) {
        return (
          <span>
            <br></br>
            <button
              key={_move}
              className="historie br"
              onClick={() => vratSe(this, _move)}
            >
              {desc}
            </button>
          </span>
        );
      }
      return (
        <button
          key={_move}
          className="historie"
          onClick={() => vratSe(this, _move)}
        >
          {desc}
        </button>
      );
    });

    let status;
    if (winner) {
      status = "Vítěz: " + (winner === "X" ? this.state.h1 : this.state.h2);
    } else {
      status =
        "Další hráč: " + (this.state.xIsNext ? this.state.h1 : this.state.h2);
    }

    return (
      <div className="game">
        <h1>Piškvorky</h1>
        <label class="custom-field two">
          <input
            type="text"
            name="h1"
            placeholder=" "
            value={this.state.h1}
            onChange={this.handleH1Change}
          />
          <span class="placeholder">První hráč</span>
        </label>
        <label class="custom-field two">
          <input
            type="text"
            name="h2"
            placeholder=" "
            value={this.state.h2}
            onChange={this.handleH2Change}
          />
          <span class="placeholder">Druhý hráč</span>
        </label>
        <div className="game-board">
          <Board
            squares={_current.squares}
            // zakladni klik
            _onClickGame={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="vitez">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function vratSe(on, i) {
  alert("   pozice   " + i);
  let _history = on.state.history;
  _history.splice(i + 1, _history.length - i);
  on.setState({
    history: _history,
  });
}

function Square(props) {
  let className = "square";
  if (props.hodnota === "X") {
    className = className + " X";
  } else if (props.hodnota === "O") {
    className = className + " O";
  }
  return (
    // click poslan do ctverce
    // vypisuje na tlacitko hodnotu
    <button className={className} onClick={props.__onClickBoard}>
      {props.hodnota}
    </button>
  );
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    // definuji promenne ve tride Game
    // history ma v sobe squares
    let rx = 20;
    this.state = { tableSize: [rx, rx] };
  }

  renderSquare(i) {
    return (
      <Square
        // do hodnoty zapisuje obsah squares
        hodnota={this.props.squares[i]}
        style="color:red" //{this.props.squares[i] === "X" ? "color:red" : "color:blue"}
        // poslan do boardu
        __onClickBoard={() => this.props._onClickGame(i)}
      />
    );
  }
  render() {
    return (
      <div>
        {[...Array(this.state.tableSize[0])].map((tr, trIdx) => (
          <div key={trIdx}>
            {[...Array(this.state.tableSize[1])].map((a, tdIdx, arr) =>
              this.renderSquare(arr.length * trIdx + tdIdx)
            )}
          </div>
        ))}
      </div>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  let radek = "";
  let sloupec = "";
  var r_vysledek_X;
  var r_vysledek_O;

  var s_vysledek_X;
  var s_vysledek_O;

  var d_vysledek_X;
  var d_vysledek_O;

  var n = 0;
  var k = 0;

  var rx = 20;

  var tableSize = Array(rx, rx);

  var xxx = [...Array(tableSize[0])]
    .fill("aaa")
    .map((tr, trIdx) => console.log("aaa  " + trIdx + " tr " + tr));

  for (let j = 0; j < rx; j++) {
    for (let i = 0; i < rx; i++) {
      n = i + 1 + j * rx - 1;
      k = j + 1 + i * rx - 1;

      radek = radek + (squares[n] === null ? "_" : squares[n]);
      sloupec = sloupec + (squares[k] === null ? "_" : squares[k]);

      r_vysledek_X = radek.search("XXXXX");
      r_vysledek_O = radek.search("OOOOO");

      s_vysledek_X = sloupec.search("XXXXX");
      s_vysledek_O = sloupec.search("OOOOO");

      if (r_vysledek_X >= 0) {
        return "X";
      }
      if (r_vysledek_O >= 0) {
        return "O";
      }
      if (s_vysledek_X >= 0) {
        return "X";
      }
      if (s_vysledek_O >= 0) {
        return "O";
      }
      let x = (n + 1) % rx;
      if (x === 0) {
        radek = "";
        sloupec = "";
      }
    }
  }
  //diagonála pravá  do spodního rohu
  radek = "";
  var index = 0;

  for (let svisle = 5; svisle <= rx; svisle++) {
    for (let vodorovne = 0; vodorovne <= svisle - 1; vodorovne++) {
      index = rx * (svisle - 1) - rx * vodorovne + vodorovne;
      radek = radek + (squares[index] === null ? "_" : squares[index]);
      d_vysledek_X = radek.search("XXXXX");
      d_vysledek_O = radek.search("OOOOO");
      if (d_vysledek_X >= 0) {
        return "X";
      }
      if (d_vysledek_O >= 0) {
        return "O";
      }
    }
  }

  //diagonála pravá za spodním rohem
  radek = "";

  for (let vodorovne = 0; vodorovne <= rx - 5; vodorovne++) {
    radek = "";
    for (let svisle = 0; svisle <= rx - 1; svisle++) {
      index = rx * (rx - 1) + vodorovne + svisle - svisle * rx + 1;
      radek = radek + (squares[index] === null ? "_" : squares[index]);
      d_vysledek_X = radek.search("XXXXX");
      d_vysledek_O = radek.search("OOOOO");
      if (d_vysledek_X >= 0) {
        return "X";
      }
      if (d_vysledek_O >= 0) {
        return "O";
      }
    }
  }

  //diagonála levá  do spodního rohu
  radek = "";

  rx = 20;
  for (let svisle = rx - 5; svisle <= rx; svisle++) {
    for (let vodorovne = 0; vodorovne <= svisle - 1; vodorovne++) {
      index = svisle + rx * vodorovne + vodorovne;
      radek = radek + (squares[index] === null ? "_" : squares[index]);
      d_vysledek_X = radek.search("XXXXX");
      d_vysledek_O = radek.search("OOOOO");
      if (d_vysledek_X >= 0) {
        return "X";
      }
      if (d_vysledek_O >= 0) {
        return "O";
      }
    }
  }

  //diagonála levá za spodním rohem
  radek = "";
  var index = 0;

  for (let vodorovne = 0; vodorovne <= rx - 5; vodorovne++) {
    radek = "";

    for (let svisle = 0; svisle <= rx - 1; svisle++) {
      index = vodorovne + svisle + rx * svisle; //rx * (rx - 1) + vodorovne + svisle - svisle * rx + 1;

      radek = radek + (squares[index] === null ? "_" : squares[index]);
      d_vysledek_X = radek.search("XXXXX");
      d_vysledek_O = radek.search("OOOOO");
      if (d_vysledek_X >= 0) {
        return "X";
      }
      if (d_vysledek_O >= 0) {
        return "O";
      }
    }
  }

  return null;
}
/*
        <span className="l1 nazev">
          První hráč:{" "}
          <input
            className="hrac1 vstup"
            type="text"
            name="h1"
            value=""
            
            value={this.state.h1}
            onChange={this.handleH1Change}
                      />
        </span>

        <span className="l2 nazev">
          Druhý hráč:{" "}
          <input
            className="hrac2 vstup"
            type="text"
            name="h2"
            value=""
            value={this.state.h2}
            onChange={this.handleH2Change}
          />
        </span>


*/
