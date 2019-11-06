const niceLog = (o) => { console.warn(JSON.stringify(o, null, 2)) };
const BOARD_ROWS = 5;
const INITIAL_SPACE_STATE = {
  displayType: '',
  empty: false,
};

// :TODO: put this in a documented arg someone
// displayType: oneOf([ '', 'target', 'source', 'path' ])

// :TODO:
//
// # Open Questions
//
// ## Render in lifecycle
// - [ ] re-render on every state update, or only on certain lifecycle methods?
// - [ ] should each method have a pre/post hook?
// - [x] should renders be part of the lifecycle, or just subscribe to hooks?
//
// # LIFECYCLE
//
// 0. <Render>RENDER_TURN_BEGIN: re-render board
// 1. <Business>GET_MOVES: update state with valid moves for every peg
//    - add property `legalMoves` of peg ids that have valid moves
//    ```
//    legalMoves: [
//      {
//        source: 'r3s2',
//        path: 'r4s2',
//        target: 'r5s2',
//      }, {}, {}...
//    ]
//    ```
// 2. <Business>DECIDE_MOVE: run "player strategy" function to commit to a move
//    ```
//    // example of a 'random' player strategy fn
//    (legalMoves) => leagalMoves[Math.floor(Math.random() * arr.length)];
//    ```
// 3. <StateUpdate>BEFORE_RENDER_TURN: update board state from move to show preview
// 4. <Render>RENDER_TURN_PREVIEW: render board from state
// 5. <Prompt>CONFIRM_MOVE: prompt user to accept move
//    - <YES> -> GOTO 2
//    - <NO> -> GOTO 6
// 6. <StateUpdate>COMMIT_MOVE: update board state with move
//

const board = [...Array(BOARD_ROWS)].map((row, i) => [...Array(i + 1)]);

// :TODO:
// using default arguments is cheating - this is a pretend pure function
const getInitialState = (board, initialSpaceState=INITIAL_SPACE_STATE) => {
  const state = {
    moves: 0,
    spaces: {},
  };

  // :TODO:
  // flat state sure would be nice lol
  board.forEach((row, rowIndex) => {
    row.forEach((space, spaceIndex) => {
      const spaceId = `r${rowIndex + 1}s${spaceIndex + 1}`;
      state.spaces[spaceId] = {
        id: spaceId,
        ...initialSpaceState
      };
    });
  });

  // :TODO: would be nice to do a `getPaths` and `getTargets` thing here
  // OR add legal moves to state on each lifecycle
  return state;
};

const render = (board, state) => {

  const renderSpace = (rowIndex, spaceIndex) => {
    let result;
    const spaceId = [`r${rowIndex + 1}s${spaceIndex + 1}`];
    const { displayType, empty } = state.spaces[spaceId];

    const offset = Array(6 - rowIndex).fill(' ').join('');

    let spaceGlyph;
    switch(displayType) {
      case 'source':
        spaceGlyph = '⬆️';
        break;
      case 'target':
        spaceGlyph = '⬇️';
        break;
      case 'path':
        spaceGlyph = '🔥';
        break;
      default:
        spaceGlyph = empty ? '⚫' : '🔴';
    }

    if (spaceIndex === 0) {
      result = `${offset} ${spaceGlyph} `
    } else {
      result = `${spaceGlyph} `
    };

    return result;
  };

  const renderRow = (row, rowIndex) => row
    .map((space, spaceIndex) => renderSpace(rowIndex, spaceIndex))
    .join('');

  board.forEach((row, rowIndex) => {
    renderRow(row, rowIndex);
    console.log(renderRow(row, rowIndex));
  });
};

const mutableState = getInitialState(board);

render(board, mutableState);

// initial hole
mutableState.spaces['r3s2'].empty = true;

render(board, mutableState);

// move
mutableState.spaces['r5s4'].displayType = 'source';
mutableState.spaces['r4s3'].displayType = 'path';
mutableState.spaces['r3s2'].displayType = 'target';

render(board, mutableState);

// afterMove

mutableState.spaces['r4s3'].empty = true;
mutableState.spaces['r5s4'].empty = true;
mutableState.spaces['r5s4'].displayType = '';
mutableState.spaces['r4s3'].displayType = '';
mutableState.spaces['r3s2'].displayType = '';
mutableState.spaces['r3s2'].empty = false;

render(board, mutableState);
