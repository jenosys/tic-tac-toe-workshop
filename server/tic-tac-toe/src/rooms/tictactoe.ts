import { Room, Client, Delayed } from 'colyseus';
import * as discovery from '../discovery';

const TURN_TIMEOUT = 10;

interface TicTacToeClient extends Client {
  [id: string]: any;
}

export class TicTacToe extends Room {
  maxClients = 2;
  randomMoveTimeout?: Delayed;

  onInit () {

    this.setState({
      currentTurn: null,
      players: {},
      board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      winner: null,
      draw: null
    });
  }

  onJoin (client: TicTacToeClient) {
    client.playerIndex = Object.keys(this.state.players).length;
    this.state.players[ client.sessionId ] = { id: client.sessionId, idx: client.playerIndex, username: '' };

    if (this.clients.length === 2) {
      this.state.currentTurn = client.sessionId;
      this.randomMoveTimeout = this.clock.setTimeout(this.doRandomMove.bind(this, client), TURN_TIMEOUT * 1000);

      // lock this room for new users
      this.lock();

      discovery.updateState('Busy');
    }

    console.log('onJoin. player: ' + JSON.stringify(this.state.players[client.sessionId]));
  }

  onMessage (client: TicTacToeClient, data: any) {
    if (this.state.winner || this.state.draw) {
      return false;
    }

    if (data.username) {
      this.state.players[client.sessionId].username = data.username;
      console.log('onMessage: update client: ' + JSON.stringify(this.state.players[client.sessionId]));

    } else if (client.sessionId === this.state.currentTurn) {
      if (this.state.board[ data.x ][ data.y ] === 0) {
        let move = (client.playerIndex === 0) ? 'x' : 'o';
        this.state.board[ data.x ][ data.y ] = move;

        if (this.checkWin(data.x, data.y, move)) {
          this.state.winner = client.sessionId;

        } else if (this.checkBoardComplete()) {
          this.state.draw = true;

        } else {
          // switch turn
          const playerIds = Object.keys(this.state.players);
          const otherPlayerIndex = (client.playerIndex === 0) ? 1 : 0;

          this.state.currentTurn = playerIds[otherPlayerIndex];

          if (this.randomMoveTimeout) {
            this.randomMoveTimeout.clear();
          }
          this.randomMoveTimeout = this.clock.setTimeout(this.doRandomMove.bind(this, this.clients[ otherPlayerIndex ]), TURN_TIMEOUT * 1000);
        }

      }
    }
  }

  checkBoardComplete () {
    return this._flatten(this.state.board).
      filter(item => item === 0).length === 0;
  }

  doRandomMove (client: TicTacToeClient) {
    for (let x = 0; x < this.state.board.length; x++) {
      for (let y = 0; y < this.state.board[x].length; y++) {
        if (this.state.board[x][y] === 0) {
          this.onMessage (client, { x: x, y: y });
          return;
        }
      }
    }
  }

  checkWin (x: number, y: number, move: string) {
    let won = false;
    let board = this.state.board;
    let boardSize = this.state.board.length;

    // horizontal
    for (let i = 0; i < boardSize; i++) {
      if (board[x][i] !== move) { break; }
      if (i === boardSize - 1) {
        won = true;
      }
    }

    // vertical
    for (let i = 0; i < boardSize; i++) {
      if (board[i][y] !== move) { break; }
      if (i === boardSize - 1) {
        won = true;
      }
    }

    // cross forward
    if (x === y) {
      for (let i = 0; i < boardSize; i++) {
        if (board[i][i] !== move) { break; }
        if (i === boardSize - 1) {
          won = true;
        }
      }
    }

    // cross backward
    for ( let i = 0; i < boardSize; i++) {
      if (board[i][(boardSize - 1) - i] !== move) { break; }
      if (i === boardSize - 1) {
        won = true;
      }
    }

    return won;
  }

  onLeave (client: TicTacToeClient) {
    let player = this.state.players[ client.sessionId ];
    delete this.state.players[ client.sessionId ];

    if (this.randomMoveTimeout) { this.randomMoveTimeout.clear(); }

    console.log('onLeave. player: ' + JSON.stringify(player));

    let remainingPlayerIds = Object.keys(this.state.players);
    if (remainingPlayerIds.length > 0) {
      this.state.winner = remainingPlayerIds[0];

      // gracefull shutdown      
      this.shutdown();
    }
  }

  async doDatabaseOperation() {
    // TODO
    // save records on database
  }

  // tslint:disable-next-line: no-empty
  onDispose () {}

  async shutdown() {
    let winnerId = this.state.winner;
    
    console.log('winner: ' + winnerId);

    await this.doDatabaseOperation();

    process.exit(0);
  }

  _flatten(arr: any, previous?: any): number[] {
    let flattened = previous || [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Array) {
        this._flatten(arr[i], flattened);

      } else {
        flattened.push(arr[i]);
      }
    }

    return flattened;
  }

}

