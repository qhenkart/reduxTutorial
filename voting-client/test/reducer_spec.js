import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of("Holes", "Transformers"),
          tally: Map({Holes: 1})
        })
      })
    }
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ["Holes", "Transformers"],
        tally: {Holes: 1}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ["Holes", "Transformers"],
          tally: {Holes: 1}
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ["Holes", "Transformers"],
        tally: {Holes: 1}
      }
    }));
  });

  it('hanldes VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Holes','Cars'],
        tally: {Holes: 1}
      }
    })
    const action ={type: 'VOTE', entry: 'Holes'};
    const nextState = reducer(state,action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Holes', 'Cars'],
        tally: {Holes: 1}
      },
      hasVoted: 'Holes'
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote:{
        pair: ['Holes', 'Cars'],
        tally: {Holes: 1}
      }
    });
    const action = {type:'VOTE', entry: 'Yolo'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Holes', 'Cars'],
        tally: {Holes: 1}
      }
    }))
  })

  it('removes hasVoted in SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Planes','Cars'],
        tally:{Planes: 1}
      },
      hasVoted: 'Planes'
    });
    const action = {
      type:'SET_STATE',
      states: {
        vote:{
          pair: ['Trains', 'Bikes']
        }
      }
    }
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trains', 'Bikes']
      }
    }))
  })

});