import React from "react";
import Square from "./Square"


class Board extends React.Component {
  constructor(props) {
    super(props) ;
    this.state = {
      squares:  Array(9).fill(null),
      xIsNext:this.startingPlayer(),
      scoreX :0,
      scoreO :0      
    }
    
  }
  
  startingPlayer () {
    const coin = Math.floor( (Math.random() * 2))
    if(coin === 0 ) { return true} else {return false}
  }

  resetGame () {
    this.setState ({
      squares:  Array(9).fill(null),
      xIsNext:this.startingPlayer(),
    })
  }

  resetScore () {

  }
  



  handleClick(i) {
    const squares = this.state.squares.slice();
    if(this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares:squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
   
    
render() {
  
  const winner = this.calculateWinner(this.state.squares);
  let status;
  
  if(winner) {
    status = "Winner: " + winner;
     
  } else {
    status = "Next player: " + (this.state.xIsNext ? "X" : "O");
  }


  const renderSquare = (i) => {
    return <Square value={this.state.squares[i]} onClick={()=> this.handleClick(i)} />;
  }

    
       
return (
      
      <div className="board">
        <div className="status">
          {status}
          <br/>
         
          </div>
        <button className="newGame" onClick={() => this.resetGame()}> New Game </button>

        <div className="game">
      <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
      </div>
      <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
    </div>
    <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
      </div>
      </div>
  </div>
)

}
}
export default Board;